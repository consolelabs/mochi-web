import React, { useEffect, useState } from 'react'
import { truncate } from '@dwarvesf/react-utils'
import { ReceiptRefundIcon } from '@heroicons/react/24/solid'
import { Contract, utils } from 'ethers'
import {
  useContract,
  useNetwork,
  useProvider,
  chain as defaultChain,
} from 'wagmi'
import { address as escrowAddress, abi } from 'contract/escrow'

type Props = {
  swapId: string
  blockNo?: number
}

type State = {
  link: string
  userA: {
    address: string
    gain: Record<string, Array<number>>
    loss: Record<string, Array<number>>
  }
  userB: {
    address: string
    gain: Record<string, Array<number>>
    loss: Record<string, Array<number>>
  }
}

// from,to,token
const TRANSFER_TOPIC_HASH = utils.id('Transfer(address,address,uint256)')
const iface = new utils.Interface([
  'event Transfer(address indexed from, address indexed to, uint256 indexed value)',
])

export const SwapReceipt = ({ swapId, blockNo }: Props) => {
  const [state, setState] = useState<State>({
    link: '',
    userA: {
      address: '',
      loss: {},
      gain: {},
    },
    userB: {
      address: '',
      loss: {},
      gain: {},
    },
  })

  const { chain = defaultChain.mainnet } = useNetwork()
  const provider = useProvider()
  const escrowContract = useContract<Contract>({
    addressOrName: escrowAddress,
    contractInterface: abi,
    signerOrProvider: provider,
  })

  useEffect(() => {
    if (escrowContract?.provider && blockNo) {
      escrowContract
        .queryFilter('TradeSuccess', blockNo, blockNo)
        .then(async (events) => {
          const [event] = events

          const receipt = await event.getTransactionReceipt()
          const newState: State = {
            link: `${chain.blockExplorers?.default.url}/tx/${receipt.transactionHash}`,
            userA: {
              address: '',
              loss: {},
              gain: {},
            },
            userB: {
              address: '',
              loss: {},
              gain: {},
            },
          }

          const transferEvents = receipt.logs
            .filter((l) => l.topics[0] === TRANSFER_TOPIC_HASH)
            .map((e) => {
              const args = iface.parseLog(e).args
              return {
                token_address: e.address,
                token_id: args.value.toNumber(),
                from: args.from,
                to: args.to,
              }
            })
            .filter((e) => e.from === escrowAddress)

          // randomly pick an address
          newState.userA.address = transferEvents[0].to

          for (let event of transferEvents) {
            if (newState.userA.address === event.to) {
              const gainListA = newState.userA.gain[event.token_address]
              if (!gainListA) {
                newState.userA.gain[event.token_address] = [event.token_id]
              } else {
                newState.userA.gain[event.token_address].push(event.token_id)
              }
            } else {
              newState.userB.address = event.to

              const lossListA = newState.userA.loss[event.token_address]
              if (!lossListA) {
                newState.userA.loss[event.token_address] = [event.token_id]
              } else {
                newState.userA.loss[event.token_address].push(event.token_id)
              }
            }
          }

          // inverse the gain/loss and assign to userB
          newState.userB.gain = newState.userA.loss
          newState.userB.loss = newState.userA.gain

          setState(newState)
        })
    }
  }, [blockNo, chain.blockExplorers?.default.url, escrowContract])

  if (!escrowContract || !blockNo || !state.link) {
    return null
  }

  return (
    <div className="overflow-hidden relative w-full flex flex-col items-center border border-gray-200 shadow-md rounded-md p-3 bg-white">
      <img
        src="/assets/handshake.png"
        alt=""
        className="absolute -right-1 -top-1 w-16 grayscale opacity-30 scale-[2]"
      />
      <div className="flex items-center gap-x-1 self-start">
        <ReceiptRefundIcon className="w-6 h-6 text-gray-500" />
        <p className="font-light text-gray-500 text-lg">Swap Receipt</p>
      </div>
      <p className="w-3/5 text-xs mt-1 self-start text-gray-400">{swapId}</p>
      <a
        href={state.link}
        rel="noreferrer"
        target="_blank"
        className="mt-1 text-blue-500 underline self-start"
      >
        Link
      </a>
      <div className="w-full mt-5 flex flex-col">
        <p className="text-gray-600 text-sm font-medium truncate w-full pb-0.5 border-b border-gray-200">
          {truncate(state.userA.address, 10, true, '.')}
        </p>
        <div className="flex mt-2 gap-x-2">
          <div className="text-sm flex gap-2 flex-1">
            <div className="h-full w-0.5 bg-emerald-600 rounded" />
            <div className="flex flex-col">
              <p className="text-emerald-600 font-medium">Gain</p>
              <div className="flex flex-col">
                {Object.entries(state.userA.gain).map((e) => {
                  return (
                    <div key={`A-gain-${e[0]}`} className="flex flex-col">
                      <p>{truncate(e[0], 10, true, '.')}</p>
                      <div className="ml-3 flex flex-col">
                        {e[1].map((t) => {
                          return <p key={`A-gain-${e[0]}-${t}`}>Token ID {t}</p>
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="text-sm flex gap-2 flex-1">
            <div className="h-full w-0.5 bg-red-400 rounded" />
            <div className="flex flex-col">
              <p className="text-red-400 font-medium">Loss</p>
              <div className="flex flex-col">
                {Object.entries(state.userA.loss).map((e) => {
                  return (
                    <div key={`A-loss-${e[0]}`} className="flex flex-col">
                      <p>{truncate(e[0], 10, true, '.')}</p>
                      <div className="ml-3 flex flex-col">
                        {e[1].map((t) => {
                          return <p key={`A-loss-${e[0]}-${t}`}>Token ID {t}</p>
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-4 mx-auto" />
      <div className="w-full flex flex-col">
        <p className="text-gray-600 text-sm font-medium truncate w-full pb-0.5 border-b border-gray-200">
          {truncate(state.userB.address, 10, true, '.')}
        </p>
        <div className="flex mt-2 gap-x-2">
          <div className="text-sm flex gap-2 flex-1">
            <div className="h-full w-0.5 bg-emerald-600 rounded" />
            <div className="flex flex-col">
              <p className="text-emerald-600 font-medium">Gain</p>
              <div className="flex flex-col">
                {Object.entries(state.userB.gain).map((e) => {
                  return (
                    <div key={`B-gain-${e[0]}`} className="flex flex-col">
                      <p>{truncate(e[0], 10, true, '.')}</p>
                      <div className="ml-3 flex flex-col">
                        {e[1].map((t) => {
                          return <p key={`B-gain-${e[0]}-${t}`}>Token ID {t}</p>
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="text-sm flex gap-2 flex-1">
            <div className="h-full w-0.5 bg-red-400 rounded" />
            <div className="flex flex-col">
              <p className="text-red-400 font-medium">Loss</p>
              <div className="flex flex-col">
                {Object.entries(state.userB.loss).map((e) => {
                  return (
                    <div key={`B-loss-${e[0]}`} className="flex flex-col">
                      <p>{truncate(e[0], 10, true, '.')}</p>
                      <div className="ml-3 flex flex-col">
                        {e[1].map((t) => {
                          return <p key={`B-loss-${e[0]}-${t}`}>Token ID {t}</p>
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="italic mt-6 text-gray-400 text-center text-[11px] leading-tight">
        Mochi Swap<span className="text-base">&trade;</span>
        <br />
        All Things Swapping
      </p>
    </div>
  )
}
