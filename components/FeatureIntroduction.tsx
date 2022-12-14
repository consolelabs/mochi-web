import Image from 'next/image'
import React from 'react'
import cln from 'classnames'

type Props = {
  image: any
  title: React.ReactNode
  subtitle: React.ReactNode
  flip?: boolean
  className?: string
}

export const FeatureIntroduction = (props: Props) => {
  return (
    <div
      className={cln(
        'flex flex-col items-center justify-between gap-3 mt-20 md:mt-0',
        props.className,
        {
          'md:flex-row-reverse': props.flip,
          'md:flex-row': !props.flip,
        },
      )}
    >
      <div className="flex-1">
        <Image alt="" src={props.image} />
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
