import React from 'react'
import clsx from 'clsx'

type Props = {
  image: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  flip?: boolean
  className?: string
}

export const FeatureIntroduction = (props: Props) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-between gap-3 mt-20 md:mt-0 gap-x-10',
        props.className,
        {
          'md:flex-row-reverse': props.flip,
          'md:flex-row': !props.flip,
        },
      )}
    >
      {props.image}
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
