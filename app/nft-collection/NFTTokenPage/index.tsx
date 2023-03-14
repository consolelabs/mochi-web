import React, { memo } from 'react'
import {
  IAttributeIcon,
  INFTCollection,
  INFTTicker,
  INFTToken,
} from '~types/nft'
import NFTAttribute from './NFTAttribute'
import { truncate } from '@dwarvesf/react-utils'
import { CHAIN_NAMES, EXPLORERS } from '~constants/chain'
import { getTraitEmoji } from '~constants/emoji'
import { useFetch } from '~hooks/useFetch'
import { API } from '~constants/api'
import clsx from 'clsx'
import { Icon } from '@iconify/react'

function getChainExplorerLink(chainID: number, address: string) {
  const host = EXPLORERS[chainID]
  if (!host) {
    return '#'
  }
  return `${host}/token/${address}`
}

const AddressDisplay = memo(function AddressDisplay({
  title,
  address,
  loading,
}: {
  title: string
  address?: string
  loading?: boolean
}) {
  if (loading || !address) {
    return (
      <div className="flex items-stretch space-x-2">
        <div className="flex-none w-9 h-9 bg-gray-300 rounded-full animate-pulse paper" />
        <div className="flex flex-col justify-between h-full">
          <span className="block text-xs tracking-wide leading-tight text-gray-400 truncate">
            {title}
          </span>
          <p className="mt-1 w-32 h-3 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-stretch space-x-2">
      <div className="flex-none w-9 h-9">
        <div className="paper">
          <img src="/logo.png" alt="mochi logo" className="rounded-full" />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <span className="block text-xs tracking-wide leading-tight text-gray-400 truncate">
          {title}
        </span>
        <span className="text-sm font-semibold tracking-wide text-gray-800 truncate">
          {truncate(address, 12, true)}
        </span>
      </div>
    </div>
  )
})

export default function NFTTokenPage({
  token: data,
  collection,
  attrIcons,
}: {
  token: INFTToken
  collection: INFTCollection
  ticker: INFTTicker
  attrIcons: Record<string, IAttributeIcon>
}) {
  const { data: metadata } = useFetch(
    ['/nft/:address/:id/metadata', data.collection_address, data.token_id],
    (_, address, id) => {
      if (!address || !id) {
        return null
      }
      return API.getAssetMetadata(address as string, id as number)
    },
  )

  return (
    <div
      className={clsx(
        'w-full flex-col lg:flex-row flex mx-auto space-y-5 lg:space-y-0 lg:space-x-12',
      )}
    >
      <div className="flex flex-col flex-shrink-0 space-y-3 lg:w-96">
        <img
          src={
            data.image?.replace(/^(ipfs:\/\/)/, 'https://ipfs.io/ipfs/') ||
            '/teams/dango.png'
          }
          alt={data.name}
          className="rounded-2xl"
        />

        <div className="p-3 space-y-2 rounded-2xl border border-gray-200">
          {data?.attributes?.length && (
            <div className="grid grid-cols-2 gap-3">
              {data.attributes.map((att) => (
                <NFTAttribute
                  key={att.trait_type}
                  data={att}
                  emoji={getTraitEmoji(attrIcons, att.trait_type.toLowerCase())}
                />
              ))}
            </div>
          )}

          <div className="flex relative justify-center items-center h-4">
            <div className="flex absolute inset-0 items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-1 capitalize">
            <p className="text-sm tracking-wide text-gray-500">Collection</p>
            <p className="text-sm font-semibold tracking-wide text-gray-800">
              {collection.name}
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <div className="flex justify-between items-center mb-1 capitalize">
              <p className="text-sm tracking-wide text-gray-500">Address</p>
              <a
                href={getChainExplorerLink(
                  collection.chain_id,
                  data.collection_address,
                )}
                target="_blank"
                rel="noreferrer"
                className="flex justify-end items-center text-sm font-semibold tracking-wide text-mochi-500"
              >
                {truncate(data.collection_address, 12, true)}
                <Icon icon="heroicons:link-20-solid" className="ml-2 w-4 h-4" />
              </a>
            </div>
            <div className="flex justify-between items-center mb-1 capitalize">
              <p className="text-sm tracking-wide text-gray-500">Token ID</p>
              <p className="text-sm font-semibold tracking-wide text-gray-800">
                {data.token_id}
              </p>
            </div>
            <div className="flex justify-between items-center mb-1 capitalize">
              <p className="text-sm tracking-wide text-gray-500">Rarity</p>
              <p
                className={`rounded-lg text-nft-${data.rarity.rarity?.toLowerCase()} font-medium`}
              >
                {data.rarity.rarity}
              </p>
            </div>
            <div className="flex justify-between items-center mb-1 capitalize">
              <p className="text-sm tracking-wide text-gray-500">
                Token Standard
              </p>
              <p className="text-sm font-semibold tracking-wide text-gray-800">
                {collection.erc_format}
              </p>
            </div>
            <div className="flex justify-between items-center mb-1 capitalize">
              <p className="text-sm tracking-wide text-gray-500">Chain</p>
              <p className="text-sm font-semibold tracking-wide text-gray-800">
                {CHAIN_NAMES[collection.chain_id]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-col flex-1 space-y-3">
        <div className="text-mochi-700">
          <div className="flex justify-between items-center">
            <h1 title={data.name} className="text-4xl font-bold">
              {data.name}
            </h1>
          </div>
          <div className="flex justify-start items-center mt-4 space-x-4 text-sm">
            <p className="flex items-center text-gray-500">
              Collection{' '}
              <Icon
                icon="heroicons:check-circle-solid"
                className="ml-1 w-6 h-6 text-green-600"
              />
            </p>
            <p
              className={`rounded-lg bg-nft-${data.rarity.rarity?.toLowerCase()} text-white px-2 py-1 font-medium`}
            >
              #{data.rarity.rank}
            </p>
          </div>
          <p className="p-3 mt-3 text-sm bg-gray-200 rounded-2xl text-slate-600">
            {data.description}
          </p>
          <div className="flex items-center mt-3 space-x-12">
            <AddressDisplay
              title="Owner"
              address={metadata?.owner?.owner_address}
            />
            <AddressDisplay title="Creator" address={metadata?.creator} />
          </div>
        </div>
      </div>
    </div>
  )
}
