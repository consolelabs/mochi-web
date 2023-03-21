import { Connector, useConnect } from 'wagmi'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletName, WalletReadyState } from '@solana/wallet-adapter-base'
import { useAppWalletContext } from 'context/wallet-context'
import { WalletInstance } from './Wallet'
import { getRecentWalletIds, addRecentWalletId } from './recentWalletIds'
import { walletDownloadUrls } from './solana/walletAdapters'
import { useEffect, useState } from 'react'

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
  const {
    select,
    connecting,
    wallets,
    wallet: selectedWallet,
    connect,
    autoConnect,
  } = useWallet()
  const [errorMsg, setErrorMsg] = useState()
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
      // @ts-ignore
      if (wallet.adapter.standard) {
        return [
          {
            adapter: wallet.adapter,
            groupName: 'Solana',
            index,
            name: wallet.adapter.name,
            id: wallet.adapter.name,
            shortName: wallet.adapter.name,
            isSolana: true,
            iconUrl: wallet.adapter.icon,
            iconBackground: '#FFF',
            installed: [
              WalletReadyState.Installed,
              WalletReadyState.Loadable,
            ].includes(wallet.adapter.readyState),
            downloadUrls: walletDownloadUrls[wallet.adapter.name],
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
    try {
      const result = await connectAsync({ connector })
      if (result) {
        addRecentWalletId(walletId)
      }

      return result
    } catch (e: any) {
      setErrorMsg(e.message || 'Something went wrong')

      // so that the outer handler function can catch it and set the flag
      throw e
    }
  }

  useEffect(() => {
    select(null)
    // because solana wallet hook is stupid
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!autoConnect && selectedWallet) {
      connect().catch((e) => {
        setErrorMsg(e.message || 'Something went wrong')
      })
    }
  }, [autoConnect, connect, selectedWallet])

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
          if (selectedWallet?.adapter.name !== wallet.name) {
            select(wallet.adapter?.name as WalletName)
          }
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
    errorMsg,
    wallets: walletConnectors,
    groupedWallets: groupBy(
      walletConnectors.filter(
        (wallet) => wallet.ready || wallet.downloadUrls?.browserExtension,
      ),
      (wallet) => wallet.groupName,
    ),
  }
}
