import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const variant = cva(
  [
    'flex gap-x-1 items-center justify-center flex-shrink-0 font-medium transition-all duration-100 ease-in-out',
  ],
  {
    variants: {
      appearance: {
        primary: [
          'bg-[#FFFFFF]',
          'text-foreground',
          'border-[1.5px] border-black/15%',
          'shadow-md',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        secondary: [
          'bg-foreground',
          'text-white',
          'shadow-md',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        mochi: [
          'bg-mochi',
          'text-white',
          'border-[1.5px] border-mochi',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        text: ['bg-transparent', 'text-foreground'],
      },
      size: {
        sm: ['text-sm', 'px-3', 'py-1'],
        base: ['text-base', 'px-6', 'py-2'],
        icon: ['w-8', 'h-8', 'rounded-full'],
      },
    },
    defaultVariants: {
      appearance: 'primary',
      size: 'base',
    },
  },
)

type Props = VariantProps<typeof variant> & { className?: string }

export const button = ({ className = '', ...rest }: Props) =>
  variant({ className, ...rest })
