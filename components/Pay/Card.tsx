import { Icon } from '@iconify/react'
import { useGesture } from '@use-gesture/react'
import { useSpring, animated, to, config } from '@react-spring/web'
import { useEffect, useRef } from 'react'
import { utils } from 'ethers'
import { PayRequest } from '~pages/pay/[pay_code]'
import CutoutAvatar from '~components/CutoutAvatar/CutoutAvatar'

const calcX = (y: number) => -(y - window.innerHeight / 4) / 20
const calcY = (x: number) => (x - window.innerWidth / 2) / 20

type Props = {
  payRequest: PayRequest
  isDone: boolean
}

export default function Card({ payRequest, isDone }: Props) {
  const domTarget = useRef(null)
  const [{ height, opacity, rotateX, rotateY, rotateZ, zoom, scale }, api] =
    useSpring(() => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      opacity: 0,
      height: 0,
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

  useEffect(() => {
    api.start({
      from: {
        rotateY: 360,
        opacity: 0,
        height: 0,
      },
      to: [
        {
          delay: 350,
          height: 200,
        },
        {
          rotateY: 0,
          opacity: 1,
          config: config.slow,
        },
      ],
    })
  }, [api])

  return (
    <animated.div
      style={{
        height,
        width: 336,
      }}
      className="relative"
    >
      <animated.div
        style={{
          transform: 'perspective(600px)',
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
          opacity,
        }}
        className="absolute top-0 left-0 w-full h-full rounded-2xl pay-card"
      />
      <animated.div
        style={{
          transform: 'perspective(600px)',
          scale: to([scale, zoom], (s, z) => s + z),
          rotateX,
          rotateY,
          rotateZ,
          opacity,
        }}
        className="relative shadow-lg hover:shadow-xl transition-shadow overflow-hidden pay-card pay-card-front flex flex-col min-h-[200px] p-8 pb-6 border-solid border-2 border-black/15% rounded-2xl text-white"
        ref={domTarget}
      >
        <div className="flex justify-between items-center">
          <div className="font-semibold">Total Balance</div>
          <Icon icon="mdi:contactless-payment" width={24} height={24} />
        </div>
        <div className="flex gap-x-1.5 items-center">
          <div className="relative flex-shrink-0 w-9 h-9 rounded-full">
            <CutoutAvatar
              cutoutSrc={payRequest.token.chain.icon || '/assets/coin.png'}
              src={payRequest.token.icon}
              size="xs"
            />
          </div>
          <div className="flex items-baseline pr-2 w-full">
            <span className="flex-shrink-0 max-w-full font-semibold text-white bg-red text-[32px] truncate">
              {payRequest.status === 'claimed' && isDone
                ? 0
                : utils.formatUnits(
                    payRequest.amount,
                    payRequest.token.decimal,
                  )}
            </span>
            <span className="ml-1 text-sm font-bold text-white whitespace-nowrap">
              {payRequest.token.symbol}
            </span>
          </div>
        </div>
        <div className="mt-auto text-xs font-normal text-right">
          Powered by Mochi
        </div>
      </animated.div>
    </animated.div>
  )
}
