import React, { memo } from 'react'
import {
  IAttributeIcon,
  INFTCollection,
  INFTTicker,
  INFTToken,
} from '~types/nft'
import NFTAttribute from './NFTAttribute'
import cc from 'classnames'
import { truncate } from '@dwarvesf/react-utils'
import { LinkIcon, CheckCircleIcon } from '@heroicons/react/24/solid'
import { CHAIN_NAMES, EXPLORERS } from '~constants/chain'
import { getTraitEmoji } from '~constants/emoji'
import { useFetch } from '~hooks/useFetch'
import { API } from '~constants/api'
import { AssetStat } from './NFTStats'

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
        <div className="flex-none paper rounded-full h-9 w-9 bg-gray-300 animate-pulse" />
        <div className="flex flex-col justify-between h-full">
          <span className="text-xs block leading-tight tracking-wide truncate text-gray-400">
            {title}
          </span>
          <p className="h-3 mt-1 w-32 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-stretch space-x-2">
      <div className="flex-none h-9 w-9">
        <div className="paper">
          <img src="/logo.png" alt="mochi logo" className="rounded-full" />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <span className="text-xs block leading-tight tracking-wide truncate text-gray-400">
          {title}
        </span>
        <span className="text-sm font-semibold truncate tracking-wide text-gray-800">
          {truncate(address, 12, true)}
        </span>
      </div>
    </div>
  )
})

export default function NFTTokenPage({
  token: data,
  collection,
  ticker,
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
      className={cc(
        'w-full flex-col lg:flex-row flex mx-auto space-y-5 lg:space-y-0 lg:space-x-12',
      )}
    >
      <div className="flex-shrink-0 lg:w-96 flex flex-col space-y-3">
        <img
          src={
            data.image?.replace(/^(ipfs:\/\/)/, 'https://ipfs.io/ipfs/') ||
            '/teams/dango.png'
          }
          alt={data.name}
          className="rounded-2xl"
        />

        <div className="border border-gray-200 rounded-2xl p-3 space-y-2">
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

          <div className="h-4 flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
          </div>

          <div className="flex items-center justify-between capitalize mb-1">
            <p className="text-sm tracking-wide text-gray-500">Collection</p>
            <p className="font-semibold text-sm tracking-wide text-gray-800">
              {collection.name}
            </p>
          </div>
          <div className="text-sm text-slate-600">
            <div className="flex items-center justify-between capitalize mb-1">
              <p className="text-sm tracking-wide text-gray-500">Address</p>
              <a
                href={getChainExplorerLink(
                  collection.chain_id,
                  data.collection_address,
                )}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-sm tracking-wide text-mochi-500 flex items-center justify-end"
              >
                {truncate(data.collection_address, 12, true)}
                <LinkIcon className="h-4 w-4 ml-2" />
              </a>
            </div>
            <div className="flex items-center justify-between capitalize mb-1">
              <p className="text-sm tracking-wide text-gray-500">Token ID</p>
              <p className="font-semibold text-sm tracking-wide text-gray-800">
                {data.token_id}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize mb-1">
              <p className="text-sm tracking-wide text-gray-500">Rarity</p>
              <p
                className={`rounded-lg text-nft-${data.rarity.rarity?.toLowerCase()} font-medium`}
              >
                {data.rarity.rarity}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize mb-1">
              <p className="text-sm tracking-wide text-gray-500">
                Token Standard
              </p>
              <p className="font-semibold text-sm tracking-wide text-gray-800">
                {collection.erc_format}
              </p>
            </div>
            <div className="flex items-center justify-between capitalize mb-1">
              <p className="text-sm tracking-wide text-gray-500">Chain</p>
              <p className="font-semibold text-sm tracking-wide text-gray-800">
                {CHAIN_NAMES[collection.chain_id]}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex-col space-y-3">
        <div className="text-mochi-700">
          <div className="flex items-center justify-between">
            <h1 title={data.name} className="text-4xl font-bold">
              {data.name}
            </h1>
          </div>
          <div className="flex items-center justify-start text-sm mt-4 space-x-4">
            <p className="flex items-center text-gray-500">
              Collection{' '}
              <CheckCircleIcon className="h-6 w-6 text-green-600 ml-1" />
            </p>
            <p
              className={`rounded-lg bg-nft-${data.rarity.rarity?.toLowerCase()} text-white px-2 py-1 font-medium`}
            >
              #{data.rarity.rank}
            </p>
          </div>
          <p className="text-sm mt-3 text-slate-600 bg-gray-200 p-3 rounded-2xl">
            {data.description}
          </p>
          <div className="flex items-center space-x-12 mt-3">
            <AddressDisplay
              title="Owner"
              address={metadata?.owner?.owner_address}
            />
            <AddressDisplay title="Creator" address={metadata?.creator} />
          </div>
          <div className="mt-4">
            <AssetStat
              data={metadata}
              chainTokenSymbol={collection.chain.symbol}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
