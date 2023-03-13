import { Connector, useConnect } from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName } from '@solana/wallet-adapter-base'
import { useAppWalletContext } from 'context/wallet-context'
import { WalletInstance } from './Wallet'
import { getRecentWalletIds, addRecentWalletId } from './recentWalletIds'
import { phantom } from './solana/walletAdapters'
import { omitUndefinedValues } from '~utils/omitUndefinedValues'

export interface WalletConnector extends WalletInstance {
  ready?: boolean
  connect: ReturnType<typeof useConnect>['connectAsync'] | VoidFunction
  onConnecting: (fn: () => void) => void
  connecting?: boolean | ((fn: () => void) => void)
  showWalletConnectModal?: () => void
  recent: boolean
}

function flatten<Item>(array: Item[][]) {
  const flattenedItems: Item[] = []

  for (const items of array) {
    flattenedItems.push(...items)
  }

  return flattenedItems
}

function groupBy<Item>(
  items: Item[],
  getKey: (item: Item) => string,
): Record<string, Item[]> {
  const groupedItems: Record<string, Item[]> = {}

  items.forEach((item) => {
    const key = getKey(item)

    if (!key) {
      return
    }

    if (!groupedItems[key]) {
      groupedItems[key] = []
    }

    groupedItems[key].push(item)
  })

  return groupedItems
}

function indexBy<Item>(
  items: Item[],
  getKey: (item: Item) => string,
): Record<string, Item> {
  const indexedItems: Record<string, Item> = {}

  items.forEach((item) => {
    const key = getKey(item)

    if (!key) {
      return
    }

    indexedItems[key] = item
  })

  return indexedItems
}

function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null
}

const MAX_RECENT_WALLETS = 3

export const useWalletConnectors = () => {
  const { initialChainId } = useAppWalletContext()
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect({
    chainId: initialChainId,
  })
  const { select, connecting, wallets } = useWallet()
  const defaultConnectors = defaultConnectors_untyped as Connector[]

  const evmWalletInstances = flatten(
    defaultConnectors.map(
      /* eslint-disable no-underscore-dangle */
      // @ts-expect-error
      (connector) => (connector._wallets as WalletInstance[]) ?? [],
    ),
  ).sort((a, b) => a.index - b.index)

  const solanaWalletInstances = flatten(
    wallets.map((wallet, index) => {
      const {
        name: phantomName,
        createConnector,
        ...phantomMetadata
      } = phantom()
      if (wallet.adapter.name === phantomName) {
        const { adapter, ...connectionMethods } = omitUndefinedValues(
          createConnector(),
        )
        return [
          {
            adapter,
            groupName: 'Solana',
            index,
            name: phantomName,
            ...phantomMetadata,
            ...connectionMethods,
          },
        ] as WalletInstance[]
      }
      /* eslint-disable no-underscore-dangle */
      // @ts-expect-error
      return (wallet.adapter._wallets as WalletInstance[]) ?? []
    }),
  ).sort((a, b) => a.index - b.index)

  const walletInstances = [...solanaWalletInstances, ...evmWalletInstances]

  const walletInstanceById = indexBy(
    walletInstances,
    (walletInstance) => walletInstance.id,
  )

  const recentWallets: WalletInstance[] = getRecentWalletIds()
    .map((walletId) => walletInstanceById[walletId])
    .filter(isNotNullish)
    .slice(0, MAX_RECENT_WALLETS)

  const groupedWallets: WalletInstance[] = [
    ...recentWallets,
    ...walletInstances.filter(
      (walletInstance) => !recentWallets.includes(walletInstance),
    ),
  ]

  const walletConnectors: WalletConnector[] = []

  async function evmConnectWallet(walletId: string, connector: Connector) {
    const result = await connectAsync({ connector })
    if (result) {
      addRecentWalletId(walletId)
    }

    return result
  }

  groupedWallets.forEach((wallet: WalletInstance) => {
    if (!wallet) {
      return
    }
    const recent = recentWallets.includes(wallet)
    const { isSolana } = wallet

    const ready = isSolana
      ? wallet.installed ?? true
      : (wallet.installed ?? true) && wallet?.connector?.ready

    walletConnectors.push({
      ...wallet,
      connect: async () => {
        if (wallet.isSolana) {
          select(wallet.adapter?.name as WalletName)
          addRecentWalletId(wallet.adapter?.name as string)
        } else {
          return evmConnectWallet(wallet.id, wallet.connector!)
        }
      },
      groupName: recent ? 'Recent' : wallet.groupName,
      onConnecting: (fn: () => void) => {
        if (!wallet.isSolana && wallet.connector) {
          wallet.connector.on('message', ({ type }) => {
            type === 'connecting' && fn()
          })
        }
      },
      connecting: wallet.isSolana ? connecting : false,
      ready,
      recent,
      showWalletConnectModal:
        !wallet.isSolana && wallet.walletConnectModalConnector
          ? async () => {
              try {
                await evmConnectWallet(
                  wallet.id,
                  wallet.walletConnectModalConnector!,
                )
              } catch (err) {
                // @ts-expect-error
                const isUserRejection = err.name === 'UserRejectedRequestError'

                if (!isUserRejection) {
                  throw err
                }
              }
            }
          : undefined,
    })
  })

  return {
    wallets: walletConnectors,
    groupedWallets: groupBy(
      walletConnectors.filter(
        (wallet) => wallet.ready || wallet.downloadUrls?.browserExtension,
      ),
      (wallet) => wallet.groupName,
    ),
  }
}
