import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { API } from '~constants/api'
import { format } from 'date-fns'
import { fmt } from '~utils/formatter'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { HOME_URL } from '~envs'
import { utils } from 'ethers'

export const config = {
  runtime: 'edge',
  unstable_allowDynamic: [
    '/node_modules/js-sha256/src/sha256.js',
    '/node_modules/lodash.merge/index.js',
    '/node_modules/@babel/runtime/regenerator/index.js',
    '/node_modules/@consolelabs/mochi-formatter/dist/index.mjs',
  ],
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

const scale = 1

const og = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const id = searchParams.get('id')
  let transfer = null

  if (id) {
    transfer = await API.MOCHI_PAY.get(`/transfer/${id}`)
      .notFound(() => null)
      .json((r) => r.data)
  }

  const type = transfer?.type

  let [sender, receiver] = await fmt.account(
    Platform.Web,
    transfer?.from_profile_id,
    transfer?.other_profile_id,
  )

  if (type === 'in') {
    ;[sender, receiver] = [receiver, sender]
  }

  const regular = await regularFont
  const bold = await boldFont
  const extrabold = await extraboldFont

  let tokenSrc = `${HOME_URL}/assets/money.png`

  const data = {
    from: sender?.plain ?? '',
    tokenIcon: tokenSrc,
    to: receiver?.plain ?? '',
    symbol: transfer?.token.symbol,
    decimal: transfer?.token.decimal,
    amount: transfer?.amount,
    date: '',
  }

  if (transfer) {
    data.date = format(new Date(transfer?.created_at), 'yyyy-MM-dd hh:mm:ss')
  }

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
                {mochiUtils.formatTokenDigit(
                  utils.formatUnits(transfer.amount, transfer.decimal),
                )}
                <span tw="ml-1 font-normal text-current">
                  {transfer.token.symbol}
                </span>
              </span>
            </li>
          </ul>
          <ul tw="relative flex flex-col px-2">
            <li tw="flex justify-between">
              <span tw="font-normal text-current">Tx ID</span>
              <span tw="ml-4 font-normal text-current">
                {transfer.external_id}
              </span>
            </li>
            <li tw="flex justify-between">
              <span tw="font-normal text-current">Date</span>
              <span tw="ml-4 font-normal text-current">
                {format(new Date(transfer.created_at), 'dd/MM/yyyy hh:mmaa')}
              </span>
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
