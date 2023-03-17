import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const variant = cva(
  [
    'flex gap-x-1 items-center justify-center flex-shrink-0 font-semibold transition-all duration-100 ease-in-out',
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
        tertiary: [
          'bg-dashboard-gray-6',
          'text-foreground',
          'border-[1.5px] border-black/15%',
          'rounded-lg',
          'active:translate-y-0.5',
        ],
        gray: ['bg-[#D1D2D4]', 'text-black', 'shadow-md', 'rounded-lg'],
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
