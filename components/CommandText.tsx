import React from 'react'

export const CommandText = (props: { children: React.ReactNode }) => {
  return (
    <span className="text-[#E36864] bg-mochi bg-opacity-[15%] px-2 py-0.5 rounded text-sm">
      {props.children}
    </span>
  )
}
