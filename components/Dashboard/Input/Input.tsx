import { Icon } from '@iconify/react'
import { ForwardedRef, forwardRef, useState } from 'react'
import { affix, input } from './styles'

type Props = JSX.IntrinsicElements['input'] &
  Parameters<typeof input>[0] & {
    suffix?: string
    prefix?: string
    suffixProps?: Parameters<typeof affix>[0]
    prefixProps?: Parameters<typeof affix>[0]
    allowClear?: boolean
  }

export const Input = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      value,
      suffix,
      prefix,
      className,
      appearance,
      suffixProps,
      prefixProps,
      allowClear = true,
      onChange,
      ...rest
    } = props

    const [prefixWidth, setPrefixWidth] = useState(0)
    const [suffixWidth, setSuffixWidth] = useState(0)

    return (
      <div className="relative overflow-hidden">
        {prefix && (
          <span
            ref={(ref) => {
              if (ref) {
                setPrefixWidth(ref.clientWidth)
              }
            }}
            className={affix({ ...prefixProps, type: 'prefix' })}
          >
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={input({ className, appearance })}
          value={value}
          onChange={onChange}
          {...rest}
          style={{
            paddingLeft: prefixWidth + 12,
            paddingRight: suffixWidth + 12,
          }}
        />
        {suffix && (
          <span
            ref={(ref) => {
              if (ref) {
                setSuffixWidth(ref.clientWidth)
              }
            }}
            className={affix({ ...suffixProps, type: 'suffix' })}
          >
            {suffix}
          </span>
        )}
        {allowClear && value && (
          <button
            type="button"
            className="w-5 h-5 flex items-center justify-center bg-dashboard-gray-6 rounded-full absolute top-0 right-0 mt-2 mr-3"
            onClick={(e) => {
              e.preventDefault()
              onChange && onChange({ target: { value: '' } } as any)
            }}
          >
            <Icon className="w-4 h-4" icon="heroicons:x-mark" />
          </button>
        )}
      </div>
    )
  },
)
