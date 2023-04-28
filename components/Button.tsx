import React from 'react'
import { cva } from 'class-variance-authority'

type Appearance = 'primary' | 'secondary' | 'tertiary' | 'discord' | 'telegram'

type Props = {
  appearance?: Appearance
  children: React.ReactNode
  href?: string
} & React.ButtonHTMLAttributes<HTMLElement>

const button = cva(
  [
    'flex gap-x-2 items-center rounded-lg px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base font-semibold',
  ],
  {
    variants: {
      appearance: {
        primary: ['text-white', 'bg-mochi'],
        secondary: ['text-mochi', 'bg-white'],
        tertiary: ['text-mochi bg-mochi bg-opacity-[15%]'],
        discord: ['text-white', 'bg-discord'],
        telegram: ['text-white', 'bg-telegram'],
      },
    },
    defaultVariants: {
      appearance: 'primary',
    },
  },
)

export const Button = ({
  appearance,
  children,
  className,
  href,
  ...props
}: Props) => {
  if (href) {
    return (
      <a
        {...props}
        href={href}
        target="_blank"
        rel="noreferrer"
        className={button({
          className,
          appearance,
        })}
      >
        {children}
      </a>
    )
  }
  return (
    <button
      {...props}
      className={button({
        className,
        appearance,
      })}
    >
      {children}
    </button>
  )
}
