import React from "react";
import { IAttribute } from "~types/nft";
import cc from "classnames";

function NFTAttribute({ data }: { data: IAttribute }) {
  return (
    <div className="relative rounded-2xl overflow-hidden px-3.5 py-3.5 bg-gray-200">
      <h4 className="text-sm font-thin tracking-wide text-gray-500">
        {data.trait_type}
      </h4>
      <p className="font-medium tracking-wide truncate text-gray-800 my-0.5">
        {data.value} <span className="text-gray-500">({data.frequency})</span>
      </p>
      <p className="text-sm font-thin tracking-wide text-gray-500">
        {data.rarity}
      </p>
    </div>
  );
}

export default React.memo(NFTAttribute);
