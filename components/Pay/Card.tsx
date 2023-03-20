import { Icon } from '@iconify/react'
import Image from 'next/image'

export default function Card({
  balance,
  coin,
}: {
  balance: string
  coin: string
}) {
  return (
    <div className="relative overflow-hidden pay-card flex flex-col min-h-[200px] p-8 pb-6 border-solid border-2 border-black/15% rounded-2xl text-white">
      <div className="flex justify-between items-center">
        <div className="font-semibold">Total Balance</div>
        <Icon icon="mdi:contactless-payment" width={24} height={24} />
      </div>
      <div className="flex gap-x-1.5 items-center">
        <div className="relative w-9 h-9 rounded-full">
          <Image fill={true} src="/assets/coin.png" alt="card logo" />
        </div>
        <div>
          <span className="text-[#FFFFFF] font-semibold text-[32px]">
            {balance}
          </span>
          <span className="text-[#FFFFFF] ml-1 font-bold text-sm">{coin}</span>
        </div>
      </div>
      <div className="mt-auto text-xs font-normal text-right">
        Powered by Mochi
      </div>
    </div>
  )
}
