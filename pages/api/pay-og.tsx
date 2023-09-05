import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { CardUI, Props } from '~components/Pay/Card'
import { API } from '~constants/api'

export const config = {
  runtime: 'edge',
}

const regularFont = fetch(
  new URL('../../assets/Inter-Regular.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const boldFont = fetch(
  new URL('../../assets/Inter-Bold.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const extraboldFont = fetch(
  new URL('../../assets/Inter-ExtraBold.ttf', import.meta.url),
).then((res) => res.arrayBuffer())

const w = 340
const h = 200

const scale = 2

const og = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const code = searchParams.get('code')
  let payRequest = null

  if (code) {
    payRequest = await API.MOCHI_PAY.get(`/pay-requests/${code}`)
      .notFound(() => null)
      .json((r) => r.data)
  }

  const regular = await regularFont
  const bold = await boldFont
  const extrabold = await extraboldFont

  let tokenSrc = 'https://mochi.gg/assets/coin.png'
  let tmpSrc = payRequest?.token.icon
  if (tmpSrc?.includes('.webp')) {
    // try to use png as webp is not supported
    tmpSrc = tmpSrc.replace('.webp', '.png')
  }
  try {
    await fetch(tmpSrc)
    tokenSrc = tmpSrc
  } catch {}

  const data: Props = {
    isDone: payRequest?.status !== 'submitted',
    tokenIcon: tokenSrc,
    status: payRequest?.status,
    native: true,
    symbol: payRequest?.token.symbol,
    decimal: payRequest?.token.decimal,
    amount: payRequest?.amount,
  }
  return new ImageResponse(
    (
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: '"Inter"',
          display: 'flex',
          width: w,
        }}
      >
        <CardUI {...data} isOG />
      </div>
    ),
    {
      debug: false,
      width: w * scale,
      height: h * scale,
      fonts: [
        {
          name: 'Inter',
          data: regular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: bold,
          weight: 600,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: extrabold,
          weight: 800,
          style: 'normal',
        },
      ],
    },
  )
}

export default og
