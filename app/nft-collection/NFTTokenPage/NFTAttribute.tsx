import React from "react";
import { IAttribute } from "~types/nft";
import cc from "classnames";

function NFTAttribute({ data }: { data: IAttribute }) {
  return (
    <div
      className={cc(
        "relative bg-mochi-gray p-2 border-l-4 rounded-md text-sm text-slate-800 h-full",
        `border-nft-${data.rarity.toLowerCase()}`
      )}
    >
      <h4 className="font-semibold">{data.trait_type}</h4>
      <p className="font-light mt-0.5">
        {data.value} <span className="text-gray-500">({data.frequency})</span>
      </p>
      <p
        className={`capitalize text-xs font-medium text-nft-${data.rarity.toLowerCase()} mt-2`}
      >
        {data.rarity}
      </p>
    </div>
  );
}

export default React.memo(NFTAttribute);
