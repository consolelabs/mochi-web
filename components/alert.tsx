import { Icon } from '@iconify/react'
import { cva, VariantProps } from 'class-variance-authority'

const variant = cva(['flex gap-x-2 rounded-lg p-3'], {
  variants: {
    appearance: {
      info: ['bg-gray-100', 'text-foreground'],
      success: ['bg-green-50', 'text-green-700'],
      warn: ['bg-yellow-50', 'text-yellow-700'],
      error: ['bg-red-50', 'text-red-700'],
    },
  },
  defaultVariants: {
    appearance: 'info',
  },
})

type Props = VariantProps<typeof variant> & {
  children: React.ReactNode
  className?: string
  title: string
}

const icons = {
  info: 'heroicons:information-circle',
  warn: 'heroicons:exclamation-triangle',
  error: 'heroicons:x-circle',
}

export default function Alert({
  title,
  children,
  className,
  appearance = 'info',
}: Props) {
  return (
    <div className={variant({ className, appearance })}>
      <Icon
        icon={icons[appearance as keyof typeof icons] || icons.info}
        className="flex-shrink-0 w-5 h-5 text-current"
      />
      <div className="flex flex-col flex-1 text-current">
        <span className="text-sm font-medium text-current">{title}</span>
        {children}
      </div>
    </div>
  )
}