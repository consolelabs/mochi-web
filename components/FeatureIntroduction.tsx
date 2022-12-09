import Image from 'next/image'
import React from 'react'
import cln from 'classnames'
import { useMedia } from '@dwarvesf/react-hooks'

type Props = {
  image: string
  title: React.ReactNode
  subtitle: React.ReactNode
  // bottom up
  height?: {
    default: number
    md: number
  }
  flip?: boolean
}

export const FeatureIntroduction = (props: Props) => {
  const height = useMedia(
    ['(min-width: 768px)', '(min-width: 0px)'],
    [props.height?.md ?? 300, props.height?.default ?? 300],
    400,
  )

  return (
    <div
      className={cln('flex flex-col items-center justify-between mt-20 gap-3', {
        'md:flex-row-reverse': props.flip,
        'md:flex-row': !props.flip,
      })}
    >
      <div style={{ height }} className="md:flex-1 relative w-full md:w-auto">
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
