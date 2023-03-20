import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variant = cva(['display'], {
  variants: {
    appearance: {
      primary: ['text-foreground'],
    },
    size: {
      xs: ['text-base', 'font-medium'],
      sm: ['text-xl', 'font-semibold'],
      base: ['text-2xl', 'font-semibold'],
      lg: ['text-3xl', 'font-semibold'],
    },
  },
  defaultVariants: {
    appearance: 'primary',
    size: 'base',
  },
})

type Props = VariantProps<typeof variant> & { className?: string }

export const heading = ({ className = '', ...rest }: Props) =>
  variant({ className, ...rest })
