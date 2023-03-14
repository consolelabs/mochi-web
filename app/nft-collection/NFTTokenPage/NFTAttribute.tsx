import React from 'react'
import { IAttribute } from '~types/nft'

function NFTAttribute({ data, emoji }: { data: IAttribute; emoji: string }) {
  return (
    <div className="overflow-hidden relative py-3.5 px-3.5 bg-gray-200 rounded-2xl">
      <div className="flex justify-between items-center text-sm">
        <h4 className="font-thin tracking-wide text-gray-500 capitalize">
          {data.trait_type}
        </h4>
        <p aria-label={emoji}>{emoji}&nbsp;</p>
      </div>
      <p
        className="my-0.5 font-medium tracking-wide text-gray-800 truncate"
        aria-label={data.value}
        title={data.value}
      >
        {data.value}
      </p>
      <p className="text-xs font-thin tracking-wide text-gray-500">
        {data.count} have this trait
      </p>
    </div>
  )
}

export default React.memo(NFTAttribute)
