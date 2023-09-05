import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { HOME_URL } from '~envs'

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

const w = 450
const h = 140

const scale = 2

const og = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const ogData = searchParams.get('data') ?? '{}'
  const data = JSON.parse(decodeURIComponent(ogData))

  const regular = await regularFont
  const bold = await boldFont
  const extrabold = await extraboldFont

  return new ImageResponse(
    (
      <div
        style={{ width: w, height: h }}
        tw="rounded-md flex flex-col items-center relative text-gray-500 bg-white"
      >
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            top: 0,
            height: '100%',
            width: '100%',
            background:
              'linear-gradient(0deg, #f4c4c2 0%, #eec3fd 48.96%, #8fc6e4 100%)',
            filter: 'blur(60px)',
            opacity: 0.3,
          }}
        />
        <img
          width={100}
          height={100}
          src={`${HOME_URL}/assets/success-stamp.png`}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
          }}
          alt=""
        />
        <div tw="flex relative py-4 font-mono">
          <ul tw="relative flex flex-col px-2">
            <li tw="flex justify-between">
              <span tw="font-normal text-current">From</span>
              <span tw="ml-4 font-normal text-current">{data.from}</span>
            </li>
            <li tw="flex justify-between">
              <span tw="font-normal text-current">To</span>
              <span tw="ml-4 font-normal text-current">{data.to}</span>
            </li>

            <li tw="flex justify-between">
              <span tw="font-normal text-current">Amount</span>
              <span tw="ml-4 font-normal text-current">
                {data.amount}
                <span tw="ml-1 font-normal text-current">{data.symbol}</span>
              </span>
            </li>
          </ul>
          <ul tw="relative flex flex-col px-2">
            <li tw="flex justify-between">
              <span tw="font-normal text-current">Tx ID</span>
              <span tw="ml-4 font-normal text-current">{data.external_id}</span>
            </li>
            <li tw="flex justify-between">
              <span tw="font-normal text-current">Date</span>
              <span tw="ml-4 font-normal text-current">{data.date}</span>
            </li>
            <li tw="flex justify-between">
              <span tw="font-normal text-current">Status</span>
              <span tw="ml-4 font-normal text-current">Success</span>
            </li>
          </ul>
        </div>
        <div tw="flex justify-center px-2 mt-5 font-light">
          <a tw="text-xs text-current" href="#">
            Mochi &copy; 2023
          </a>
        </div>
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
