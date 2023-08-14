import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { CardUI, Props } from '~components/Transfer/Card'
import { API } from '~constants/api'
import { format } from 'date-fns'
import { fmt } from '~utils/formatter'
import { Platform } from '@consolelabs/mochi-formatter'

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

  let tokenSrc = 'http://localhost:3001/assets/money.png'

  const data: Props = {
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
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          fontFamily: '"Inter"',
          display: 'flex',
          width: 340,
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
