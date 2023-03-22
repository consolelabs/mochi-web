import React, { useId } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const style = cva([], {
  variants: {
    size: {
      xs: ['w-9', 'h-9'],
      sm: ['w-14', 'h-14'],
      base: ['w-20', 'h-20'],
      lg: ['w-28', 'h-28'],
      xl: ['w-36', 'h-36'],
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

const cutoutMaskRadius = cva([], {
  variants: {
    size: {
      xs: '26%',
      sm: '25%',
      base: '24%',
      lg: '23%',
      xl: '22.5%',
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

type Props = VariantProps<typeof style> & {
  src: string
  cutoutSrc: string
}

export default function CutoutAvatar({ size, src, cutoutSrc }: Props) {
  const id = useId()

  return (
    <div className={style({ size })}>
      <svg role="none" width="100%" height="100%" viewBox="0 0 100 100">
        <mask id={`circle-mask-${id}`}>
          <circle fill="white" cx="50%" cy="50%" r="50%"></circle>
          <circle
            fill="black"
            cx="80%"
            cy="80%"
            r={cutoutMaskRadius({ size })}
          ></circle>
        </mask>
        <image
          height="100%"
          width="100%"
          xlinkHref={src}
          mask={`url(#circle-mask-${id})`}
        ></image>
        <image
          height="40%"
          width="40%"
          x="60%"
          y="60%"
          xlinkHref={cutoutSrc}
        ></image>
      </svg>
    </div>
  )
}
