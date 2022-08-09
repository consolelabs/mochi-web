import React from "react";
import { IAttribute } from "~types/nft";
import cc from "classnames";

function NFTAttribute({ data, emoji }: { data: IAttribute; emoji: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden px-3.5 py-3.5 bg-gray-200">
      <div className="flex items-center justify-between text-sm">
        <h4 className="font-thin tracking-wide text-gray-500 capitalize">
          {data.trait_type}
        </h4>
        <p aria-label={emoji}>{emoji}&nbsp;</p>
      </div>
      <p className="font-medium tracking-wide truncate text-gray-800 my-0.5">
        {data.value}
      </p>
      <p className="text-xs font-thin tracking-wide text-gray-500">
        {data.count} have this trait
      </p>
    </div>
  );
}

export default React.memo(NFTAttribute);
