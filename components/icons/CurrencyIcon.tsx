import { IconEth } from './components/IconEth'
import { IconFtm } from './components/IconFtm'

export type CurrencyType = 'ETH' | 'FTM'

export interface CurrencyIconProps extends React.HTMLAttributes<SVGElement> {
  type: CurrencyType
}

const getCurrencyIcon = (type: CurrencyType) => {
  switch (type.toUpperCase()) {
    case 'ETH':
      return IconEth
    case 'FTM':
      return IconFtm
    default:
      return null
  }
}

export const CurrencyIcon = (props: CurrencyIconProps) => {
  const { type, ...rest } = props

  const Component = getCurrencyIcon(type)

  return Component ? <Component {...rest} /> : null
}
