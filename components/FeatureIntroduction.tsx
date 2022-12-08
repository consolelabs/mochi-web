import Image from 'next/image'
import React from 'react'
import cln from 'classnames'

type Props = {
  image: string
  title: React.ReactNode
  subtitle: React.ReactNode
  height?: number
  flip?: boolean
}

export const FeatureIntroduction = (props: Props) => {
  return (
    <div
      className={cln('flex items-center justify-between mt-20', {
        'flex-row-reverse': props.flip,
      })}
    >
      <div
        style={{ height: props.height ?? 300 }}
        className="flex-1 relative block"
      >
        <Image layout="fill" objectFit="contain" alt="" src={props.image} />
      </div>
      <div className="flex-1">
        {typeof props.title === 'string' ? (
          <p className="text-2xl">{props.title}</p>
        ) : (
          props.title
        )}
        {typeof props.subtitle === 'string' ? (
          <span>{props.subtitle}</span>
        ) : (
          props.subtitle
        )}
      </div>
    </div>
  )
}
