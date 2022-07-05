import React from "react";
import { INFTCollection, INFTTicker, INFTToken } from "~types/nft";
import NFTAttribute from "./NFTAttribute";
import cc from "classnames";
import { truncate } from "@dwarvesf/react-utils";
import { useClipboard } from "@dwarvesf/react-hooks";
import { ClipboardCopyIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import { EXPLORERS } from "~constants/chain";

function getChainExplorerLink(chainID: number, address: string) {
  const host = EXPLORERS[chainID];
  if (!host) {
    return "#";
  }
  return `${host}/token/${address}`;
}

export default function NFTTokenPage({
  token: data,
  collection,
  ticker,
}: {
  token: INFTToken;
  collection: INFTCollection;
  ticker: INFTTicker;
}) {
  const { hasCopied, onCopy } = useClipboard(data.collection_address);

  return (
    <div
      className={cc(
        "block md:flex items-stretch justify-center shadow-lg rounded-lg overflow-hidden w-full",
        `border-l-[8px] border-nft-${
          data.rarity.rarity?.toLowerCase() || "common"
        }`
      )}
    >
      <div className="w-full md:w-1/4 bg-mochi-gray p-6">
        <h1 className="text-center font-bold text-2xl mb-6 text-mochi-500">
          {data.name}
        </h1>
        <img
          src={
            data.image?.replace(/^(ipfs:\/\/)/, "https://ipfs.io/ipfs/") ||
            "/teams/dango.png"
          }
          alt={data.name}
          className="rounded-lg mb-6"
        />
        <div className="text-sm text-slate-600">
          {data.rarity.rarity && (
            <div className="flex items-center justify-between capitalize mb-1">
              <span className="font-normal">Tier</span>
              <span
                className={`font-semibold text-nft-${
                  data.rarity.rarity?.toLowerCase() || "common"
                }`}
              >
                {data.rarity.rarity}
              </span>
            </div>
          )}
          {!!data.rarity.rank && (
            <div className="flex items-center justify-between capitalize mb-1">
              <p className="font-normal">Rank</p>
              <p className="font-semibold">
                <span className="text-sm">{data.rarity.rank}/</span>
                <span className="text-xs font-light text-slate-500">
                  {data.rarity.total}
                </span>
              </p>
            </div>
          )}
          {!!Number(data.rarity.score) && (
            <div className="flex items-center justify-between capitalize mb-1">
              <span className="font-normal">Score</span>
              <span className="font-semibold">
                {Number(data.rarity.score).toFixed(3)}
              </span>
            </div>
          )}
          {!!ticker?.floor_price && (
            <div
              className="flex items-center justify-between capitalize mb-1"
              title={`${ticker.floor_price} ${ticker.chain}`}
            >
              <span className="font-normal">Floor price</span>
              <span className="font-semibold">
                {ticker.floor_price} {ticker.chain}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full md:w-3/4 bg-white p-6">
        <div className="text-mochi-500">
          <div className="flex items-center justify-between">
            <h1 title={collection.name} className="text-2xl font-bold">
              {collection.name}
            </h1>
            <div className="flex items-center justify-end">
              <a
                href={getChainExplorerLink(
                  collection.chain_id,
                  data.collection_address
                )}
                target="_blank"
                rel="noreferrer"
                className="text-mochi-500 text-base"
              >
                {truncate(data.collection_address, 12, true)}
              </a>
              <button className="border-none ml-2" onClick={onCopy}>
                {hasCopied ? (
                  <ClipboardCheckIcon className="h-5 w-5" />
                ) : (
                  <ClipboardCopyIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <p className="text-sm mt-1 text-slate-600">{data.description}</p>
        </div>

        {data?.attributes?.length && (
          <div className="mt-4">
            <h1
              title="attributes"
              className="font-bold text-2xl text-mochi-500"
            >
              Attributes
            </h1>
            <div className="flex items-stretch flex-wrap -mx-2">
              {data.attributes.map((att) => (
                <div
                  key={att.trait_type}
                  className="mt-4 px-2 w-1/2 md:w-1/3 h-full"
                >
                  <NFTAttribute data={att} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
