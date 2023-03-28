import { Icon } from '@iconify/react'
import { utils } from 'ethers'
import { shallow } from 'zustand/shallow'
import CutoutAvatar from '~components/CutoutAvatar/CutoutAvatar'
import { usePayRequest } from '~store/pay-request'

type Props = {
  isDone: boolean
}

export default function Card({ isDone }: Props) {
  const { symbol, decimal, amount, status, chainIcon, tokenIcon } =
    usePayRequest(
      (s) => ({
        chainIcon: s.payRequest.token.chain.icon,
        tokenIcon: s.payRequest.token.icon,
        status: s.payRequest.status,
        amount: s.payRequest.amount,
        decimal: s.payRequest.token.decimal,
        symbol: s.payRequest.token.symbol,
      }),
      shallow,
    )

  return (
    <div className="max-w-[336px] mx-auto aspect-auto w-full h-full relative shadow-lg hover:shadow-xl transition-shadow overflow-hidden pay-card pay-card-front flex flex-col p-8 pb-6 border-solid border-2 border-black/15% rounded-2xl text-white">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Total Balance</div>
        <Icon icon="mdi:contactless-payment" width={24} height={24} />
      </div>
      <div className="flex gap-x-1.5 items-center">
        <div className="relative flex-shrink-0 w-9 h-9 rounded-full">
          <CutoutAvatar
            cutoutSrc={chainIcon || '/assets/coin.png'}
            src={tokenIcon}
            size="xs"
          />
        </div>
        <div className="flex items-baseline pr-2 w-full">
          <span className="flex-shrink-0 max-w-full font-semibold text-white bg-red text-[32px] truncate">
            {status === 'claimed' && isDone
              ? 0
              : utils.formatUnits(amount, decimal)}
          </span>
          <span className="ml-1 text-sm font-bold text-white whitespace-nowrap">
            {symbol}
          </span>
        </div>
      </div>
      <div className="mt-10 text-xs font-normal text-right sm:mt-14">
        Powered by Mochi
      </div>
    </div>
  )
}
