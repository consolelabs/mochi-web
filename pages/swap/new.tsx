import { isSSR, truncate } from '@dwarvesf/react-utils'
import { ConnectKitButton } from 'connectkit'
import { constants, utils } from 'ethers'
import { useState } from 'react'
import {
  useAccount,
  useContractWrite,
  useDisconnect,
  useEnsAddress,
  useEnsName,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { PAGES } from '~constants'
import { getAvatar } from '~utils/avatar'
import { address as escrowAddress, abi } from 'contract/escrow'
import { SpinnerIcon } from '~components/icons/Spinner'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useClipboard } from '@dwarvesf/react-hooks'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import Stepper from '~components/Stepper'

export const InputBlock = (props: any) => {
  return (
    <div className="p-1 bg-gray-200 rounded inline-block w-full">
      <input
        {...props}
        className="outline-none border-b border-gray-500 bg-transparent w-full"
      />
    </div>
  )
}

export const Address = (props: any) => {
  const { onCopy, hasCopied } = useClipboard(props.copyValue, 600)

  return (
    <button
      type="button"
      onClick={onCopy}
      className="overflow-hidden relative w-[100px] py-1 px-2 whitespace-pre-wrap rounded bg-gray-200 text-gray-800 font-medium text-xs text-center"
    >
      {props.eth
        ? props.children
        : truncate(props.children ?? '', 8, true, '.')}
      {props.you ? (
        <>
          <br />
          (you)
        </>
      ) : (
        ''
      )}
      <div
        className={classNames(
          'bg-gray-800/70 absolute top-0 left-0 w-full h-full flex items-center justify-center',
          {
            hidden: !hasCopied,
            block: hasCopied,
          },
        )}
      >
        <CheckBadgeIcon className="w-5 h-5 text-white" />
      </div>
    </button>
  )
}

const Button = ({ loading, disabled, children, ...props }: any) => {
  return (
    <button
      {...props}
      className={classNames(
        'flex self-end gap-x-1 items-center rounded-md px-2 py-1 text-white text-xs font-medium mt-1',
        {
          'hover:bg-mochi-600': !loading && !disabled,
          'bg-mochi-400': disabled,
          'bg-mochi-700': !disabled,
        },
      )}
    >
      {loading ? (
        <>
          <SpinnerIcon className="w-3 h-3" />
          <span>{children}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  if (!id) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  const offer = await API.getTradeOffer(id as string)
  if (!offer) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      offer,
    },
  }
}

export type Item = {
  id: string
  token_address: string
  token_ids: Array<string>
  trade_offer_id: string
}

export type Offer = {
  id: string
  owner_address: string
  have_items: Array<Item>
  want_items: Array<Item>
}

type Props = {
  offer: Offer
}

export default function CreateTradeOffer({ offer }: Props) {
  const { replace } = useRouter()
  const { chain } = useNetwork()
  const [offerer] = useState(constants.AddressZero)
  const { disconnect } = useDisconnect()
  const { isConnected, address } = useAccount()

  const { config } = usePrepareContractWrite({
    addressOrName: escrowAddress,
    contractInterface: abi,
    functionName: 'createTradeOffer',
    args: [],
  })

  const { isLoading, writeAsync } = useContractWrite(config)
  const [pendingTx, setPendingTx] = useState(false)
  const [txHash, setTxHash] = useState<string>()

  const createTradeOffer = async () => {
    if (
      isLoading ||
      pendingTx ||
      offerer === constants.AddressZero ||
      !isConnected
    )
      return
    try {
      const prepareTx = await writeAsync?.()
      if (prepareTx) {
        setTxHash(prepareTx.hash)
        setPendingTx(true)
        await prepareTx.wait()
        replace(`/trade/${offer.id}`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const { data: fromEns } = useEnsName({
    address,
    chainId: 1,
    enabled: !Boolean(offer),
  })
  const isFromValidEns = !!fromEns

  const { data: toEns } = useEnsAddress({
    name: offerer,
    chainId: 1,
    enabled: !Boolean(offer),
  })
  const isToValidEns = !!toEns

  const { data: toEnsDisplay } = useEnsName({
    address: offerer,
    chainId: 1,
    enabled: !Boolean(offer),
  })

  const disabled =
    (!isConnected && offerer === constants.AddressZero) ||
    !utils.isAddress(offerer) ||
    offerer === address

  return (
    <Layout>
      <SEO title={PAGES.TRADE_DETAIL.title} tailTitle />
      <div className="w-5/12 min-w-[500px] max-w-[920px] mx-auto flex flex-col items-center text-sm text-gray-800 mt-20">
        <Stepper
          steps={[
            { text: 'Create Offer' },
            { text: 'Negotiate' },
            { text: 'Finish' },
          ]}
          activeIndex={0}
        />
        <img src="/assets/handshake.png" alt="" className="w-16" />
        <div className="flex justify-between self-stretch gap-x-5">
          <div className="flex flex-col items-center w-[100px]">
            {isConnected && address && !isSSR() ? (
              <img
                className="mb-3"
                src={getAvatar(address, { size: 80 })}
                alt=""
              />
            ) : (
              <div className="w-[80px] h-[80px] rounded-full bg-gray-200 mb-3" />
            )}
            {isConnected && address && !isSSR() ? (
              <>
                <Address eth={isFromValidEns} copyValue={address} you>
                  {isFromValidEns ? fromEns : address}
                </Address>
                <button
                  onClick={() => disconnect()}
                  className="rounded-md px-2 py-1 text-red-400 hover:text-red-500 hover:underline text-xs font-medium mt-1"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <ConnectKitButton />
            )}
          </div>
          <div className="flex flex-col mt-2 gap-y-1">
            <div className="flex flex-wrap items-center gap-x-1 py-1 px-2 font-medium text-gray-600 rounded-md border-2 border-mochi-300 w-full self-start">
              <span className="basis-full">Create a trade offer with</span>
              <InputBlock readOnly={Boolean(offer)} value={offerer} />
            </div>
            <div className="flex flex-wrap items-center gap-x-1 py-1 px-2 font-medium text-gray-600 rounded-md border-2 border-mochi-300 w-full self-start">
              <span className="basis-full">I have</span>
              <div className="flex flex-col">
                {offer.have_items.map((i) => {
                  return (
                    <div key={`A-${i.token_address}`} className="flex flex-col">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={`${chain?.blockExplorers?.default.url}/address/${i.token_address}`}
                        className="text-blue-500 underline"
                      >
                        {truncate(i.token_address, 10, true, '.')}
                      </a>
                      <div className="flex flex-col">
                        {i.token_ids.map((ti) => {
                          return (
                            <p
                              className="ml-3"
                              key={`${i.token_address}-${ti}`}
                            >
                              Token ID {ti}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-1 py-1 px-2 font-medium text-gray-600 rounded-md border-2 border-mochi-300 w-full self-start">
              <span className="basis-full">I want</span>
              <div className="flex flex-col">
                {offer.want_items.map((i) => {
                  return (
                    <div key={`A-${i.token_address}`} className="flex flex-col">
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={`${chain?.blockExplorers?.default.url}/address/${i.token_address}`}
                        className="text-blue-500 underline"
                      >
                        {truncate(i.token_address, 10, true, '.')}
                      </a>
                      <div className="flex flex-col">
                        {i.token_ids.map((ti) => {
                          return (
                            <p
                              className="ml-3"
                              key={`${i.token_address}-${ti}`}
                            >
                              Token ID {ti}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <Button
              loading={isLoading || pendingTx}
              disabled={disabled}
              onClick={createTradeOffer}
            >
              {!isConnected
                ? 'Connect first'
                : disabled
                ? 'Enter a different address'
                : isLoading
                ? 'Waiting confirmation'
                : pendingTx
                ? 'Creating trade offer'
                : 'Create'}
            </Button>
            {txHash ? (
              <a
                href={`${chain?.blockExplorers?.default.url}/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="ml-auto underline text-blue-500"
              >
                tx hash
              </a>
            ) : null}
          </div>
          <div className="flex flex-col items-center">
            <img
              className={classNames('mb-3', {
                'opacity-50':
                  offerer === constants.AddressZero ||
                  !utils.isAddress(offerer),
              })}
              src={getAvatar(
                utils.isAddress(offerer) ? offerer : constants.AddressZero,
                { size: 80 },
              )}
              alt=""
            />
            <Address copyValue={offerer} eth={Boolean(toEnsDisplay)}>
              {toEnsDisplay
                ? toEnsDisplay
                : utils.isAddress(offerer) || isToValidEns
                ? offerer
                : constants.AddressZero}
            </Address>
          </div>
        </div>
      </div>
    </Layout>
  )
}
