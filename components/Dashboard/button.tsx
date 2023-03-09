import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

const variant = cva(
  [
    'flex',
    'gap-x-1',
    'items-center',
    'justify-center',
    'flex-shrink-0',
    'font-medium',
    'transition-all',
    'duration-100',
    'ease-in-out',
  ],
  {
    variants: {
      appearance: {
        primary: [
          'bg-white',
          'text-foreground',
          'border-[1.5px] border-black/15%',
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
        link: ['bg-transparent', 'text-dashboard-gray-2'],
      },
      size: {
        sm: ['text-sm', 'px-3', 'py-1'],
        base: ['text-base', 'px-6', 'py-2'],
      },
    },
    defaultVariants: {
      appearance: 'primary',
      size: 'base',
    },
  },
)

type Props = VariantProps<typeof variant> & { className?: string }

const button = ({ className = '', ...rest }: Props) =>
  variant({ className, ...rest })

export default button
