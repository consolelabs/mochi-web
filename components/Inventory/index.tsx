import { CheckCircleIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { constants, utils } from 'ethers'
import { useState } from 'react'
import useSWR from 'swr'
import {
  erc721ABI,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import fetcher from './contract-fetcher'
import { address as escrowAddress, abi } from 'contract/escrow'

type Item = {
  id: number
  name: string
  rarity?: string
  description: string
  image: string
}

export type Inventory = Record<
  string,
  {
    collectionImage: string
    address: string
    name: string
    items: Array<Item>
  }
>

const escrow = {
  addressOrName: escrowAddress,
  contractInterface: abi,
}

export default function Inventory({
  address,
  onAdd,
  setColAddress,
  items,
  setItems,
  colAddress,
}: {
  address: string
  setColAddress: (c: string) => void
  items: Array<number>
  setItems: (i: Array<number>) => void
  onAdd?: () => Promise<any>
  colAddress?: string
}) {
  const { chain } = useNetwork()
  const { data = {} } = useSWR<Inventory>(
    [address, chain?.id ?? 1, 'inventory'],
    fetcher,
  )

  const [activeCol, setActiveCol] = useState(Object.keys(data)[0])
  const [activeItem, setActiveItem] = useState<Item | null>(null)

  const onColClicked = (cId: string, cAddress: string) => () => {
    setActiveCol(cId)
    setColAddress(cAddress)
    setActiveItem(null)
    setItems([])
  }

  const onItemClicked = (i: Item) => () => {
    setActiveItem(i)

    if (items.findIndex((item) => item === i.id) !== -1) {
      setItems(items.filter((item) => item !== i.id))
    } else {
      setItems([...items, i.id])
    }
  }

  const { data: _isApproved } = useContractRead({
    addressOrName: colAddress ?? '',
    contractInterface: erc721ABI,
    enabled: utils.isAddress(colAddress ?? ''),
    functionName: 'getApproved',
    args: [activeItem?.id],
    watch: true,
  })

  const isApproved =
    _isApproved && _isApproved.toString() !== constants.AddressZero

  const { config: approveConfig } = usePrepareContractWrite({
    addressOrName: colAddress ?? '',
    contractInterface: erc721ABI,
    enabled: utils.isAddress(colAddress ?? ''),
    functionName: 'approve',
    args: [escrow.addressOrName, activeItem?.id],
  })

  const { writeAsync: _approve } = useContractWrite(approveConfig)

  const approve = async () => {
    try {
      const tx = await _approve?.()
      await tx?.wait()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex flex-col items-end mt-16">
      <p className="rounded-md mr-1.5 bg-gray-200 px-2 py-1 pb-3 -mb-2 text-xs text-gray-600 font-medium">
        Inventory
      </p>
      <div className="shadow-xl border-t-2 border-white rounded-2xl bg-gray-200 p-2 h-[500px] flex">
        <div className="rounded-xl flex overflow-hidden">
          <div className="flex flex-col bg-gray-300 w-52 p-1.5 gap-y-1.5 overflow-auto">
            {Object.entries(data).map((e) => {
              return (
                <button
                  onClick={onColClicked(e[0], e[1].address)}
                  key={e[0]}
                  className={classNames(
                    'bg-gray-200 rounded-md text-gray-800 flex items-center p-2 text-left border-2',
                    {
                      'border-transparent': e[0] !== activeCol,
                      'border-mochi-500': e[0] === activeCol,
                    },
                  )}
                >
                  <div className="flex-shrink-0 w-10 h-10 pr-2 flex items-center justify-center">
                    <img
                      className="aspect-square rounded"
                      src={e[1].collectionImage}
                      alt=""
                    />
                  </div>
                  <span className="truncate flex-1">{e[1].name}</span>
                  <span className="flex-shrink-0 pl-2 ml-auto text-xs text-gray-600">
                    {e[1].items.length}
                  </span>
                </button>
              )
            })}
          </div>
          <div className="flex-1 flex pl-5">
            <div className="flex-1 overflow-auto">
              <button
                onClick={async () => {
                  onAdd?.()
                }}
                disabled={!onAdd || items.length === 0}
                className={classNames(
                  'shadow sticky top-0 rounded-b-md text-white px-2 py-1 font-medium z-10',
                  {
                    'bg-mochi-400': !onAdd || items.length === 0,
                    'bg-mochi-700 hover:bg-mochi-600':
                      onAdd && items.length > 0,
                  },
                )}
              >
                Add tokens
              </button>
              <div className="pt-2 w-96 py-2 gap-3 grid grid-cols-4 auto-rows-min">
                {(data[activeCol]?.items ?? []).map((i) => {
                  return (
                    <button
                      key={`${activeCol}-${i.id}`}
                      onClick={onItemClicked(i)}
                      className={classNames(
                        'relative flex flex-col gap-y-1 bg-gray-300 rounded p-2 text-xs border-2',
                        {
                          'border-transparent': activeItem?.id !== i.id,
                          'border-mochi-500': activeItem?.id === i.id,
                        },
                      )}
                    >
                      <img
                        src={i.image}
                        alt=""
                        className="w-full aspect-square rounded"
                      />
                      {i.name}
                      <div
                        className={classNames({
                          'flex items-center justify-center w-full h-full bg-mochi-900/50 absolute top-0 left-0':
                            items.findIndex((item) => item === i.id) !== -1,
                          hidden:
                            items.findIndex((item) => item === i.id) === -1,
                        })}
                      >
                        <CheckCircleIcon className="text-white w-12 h-12" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="w-72 pl-5 flex p-2">
              {activeItem ? (
                <div className="bg-gray-300 flex-1 rounded-md flex flex-col items-center p-4">
                  <img
                    src={activeItem.image}
                    className="w-full aspect-square rounded-md"
                    alt=""
                  />
                  <p className="text-gray-600 text-lg font-semibold text-left self-stretch mt-2">
                    {activeItem.name}
                  </p>
                  <p className="text-gray-600 text-left self-stretch">
                    {activeItem.description}
                  </p>
                  <button
                    onClick={async () => {
                      await approve()
                    }}
                    disabled={Boolean(isApproved)}
                    className={classNames(
                      'mt-auto rounded-md text-white px-2 py-1 font-medium z-10',
                      {
                        'bg-mochi-400': Boolean(isApproved),
                        'bg-mochi-700 hover:bg-mochi-600': !Boolean(isApproved),
                      },
                    )}
                  >
                    {isApproved ? 'Approved' : 'Approve'}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
