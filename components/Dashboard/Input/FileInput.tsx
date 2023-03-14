import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { input } from './styles'

type Props = JSX.IntrinsicElements['input'] &
  Parameters<typeof input>[0] & { value?: File[] }

export const FileInput = (props: Props) => {
  const {
    name,
    appearance,
    value,
    placeholder = 'Upload a file',
    onChange,
    ...rest
  } = props

  return (
    <div
      className={input({
        appearance,
        className: 'relative flex gap-2 items-center bg-[#FFFFFF]',
      })}
    >
      <button
        type="button"
        className="bg-dashboard-gray-6 font-medium px-2 py-0.5 rounded-lg"
      >
        Upload
      </button>
      <div className={clsx('flex-1', { 'text-[#3886FC] pr-10': !!value })}>
        {value?.[0]?.name || placeholder}
      </div>
      <input
        {...rest}
        type="file"
        className="opacity-0 absolute top-0 left-0 w-full h-full"
        name={name}
        onChange={onChange}
      />
      {value && (
        <button
          type="button"
          className="w-5 h-5 flex items-center justify-center bg-dashboard-gray-6 rounded-full absolute top-0 right-0 mt-2.5 mr-3"
          onClick={(e) => {
            e.preventDefault()
            onChange && onChange({ target: { files: undefined } } as any)
          }}
        >
          <Icon className="w-4 h-4" icon="heroicons:x-mark" />
        </button>
      )}
    </div>
  )
}
