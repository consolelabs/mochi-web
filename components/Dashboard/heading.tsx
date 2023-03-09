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
      base: ['text-3xl', 'font-semibold'],
    },
  },
  defaultVariants: {
    appearance: 'primary',
    size: 'base',
  },
})

type Props = VariantProps<typeof variant> & { className?: string }

const heading = ({ className = '', ...rest }: Props) =>
  variant({ className, ...rest })

export default heading
