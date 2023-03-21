import { Icon } from '@iconify/react'
import Image from 'next/image'
import { useGesture } from '@use-gesture/react'
import { useSpring, animated, to } from '@react-spring/web'
import { useRef } from 'react'

const calcX = (y: number) => -(y - window.innerHeight / 2.5) / 10
const calcY = (x: number) => (x - window.innerWidth / 2) / 10

type Props = {
  balance: string
  coin: string
}

export default function Card({ balance, coin }: Props) {
  const domTarget = useRef(null)
  const [{ rotateX, rotateY, rotateZ, zoom, scale }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1,
    zoom: 0,
    config: { mass: 5, tension: 350, friction: 40 },
  }))

  useGesture(
    {
      onMove: ({ xy: [px, py] }) =>
        api({
          rotateX: calcX(py),
          rotateY: calcY(px),
          scale: 1.05,
        }),
      onHover: ({ hovering }) =>
        !hovering && api({ rotateX: 0, rotateY: 0, scale: 1 }),
    },
    { target: domTarget },
  )

  return (
    <animated.div
      style={{
        transform: 'perspective(600px)',
        scale: to([scale, zoom], (s, z) => s + z),
        rotateX,
        rotateY,
        rotateZ,
      }}
      className="relative shadow-lg hover:shadow-xl transition-shadow overflow-hidden pay-card flex flex-col min-h-[200px] p-8 pb-6 border-solid border-2 border-black/15% rounded-2xl text-white"
      ref={domTarget}
    >
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
    </animated.div>
  )
}
