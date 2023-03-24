import { ImageResponse } from '@vercel/og'
import { utils } from 'ethers'
import { NextRequest } from 'next/server'
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
  if (payRequest.token.icon.includes('.webp')) {
    // try to use png as webp is not supported
    const tmpSrc = payRequest.token.icon.replace('.webp', '.png')
    try {
      await fetch(tmpSrc)
      tokenSrc = tmpSrc
    } catch {}
  }

  return new ImageResponse(
    (
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          position: 'relative',
          background:
            'radial-gradient(circle at 250px 150px, #6f4353, #42373c)',
          display: 'flex',
          flexDirection: 'column',
          height: h,
          width: w,
          padding: '32px 32px 24px 32px',
          border: '2px solid rgba(0, 0, 0, 0.15)',
          borderRadius: 16,
          color: 'white',
          fontFamily: '"Inter"',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontWeight: 600,
            }}
          >
            Total Balance
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M16.79 23c-.42-.17-.72-.55-.79-1c-.05-.26 0-.44.4-1.16c1.5-2.7 2.27-5.75 2.23-8.84c.04-3-.69-5.93-2.13-8.56c-.21-.44-.4-.86-.56-1.31c.06-.38.25-.73.56-.94c.45-.24 1-.19 1.41.09c.28.36.52.72.72 1.14A21.4 21.4 0 0 1 20.8 9c.23 1.81.26 3.65.09 5.47c-.31 2.34-1 4.6-2.06 6.71c-.64 1.28-1 1.82-1.38 1.82h-.66m-4.36-2.21c-.57-.16-.93-.74-.81-1.32c0-.12.31-.67.59-1.23c1.18-2.27 1.69-4.83 1.46-7.38c-.14-1.83-.67-3.61-1.54-5.22c-.63-1.26-.67-1.46-.3-2c.44-.49 1.17-.56 1.71-.14c.72 1.06 1.29 2.22 1.71 3.44c1.28 3.79 1.08 7.92-.56 11.56c-.84 1.89-1.43 2.5-2.26 2.24v.05m-4.5-2.23a1.31 1.31 0 0 1-.73-.86c0-.2 0-.46.45-1.26a8.986 8.986 0 0 0 0-8.68C7 6.5 7 6.24 7.53 5.76c.19-.22.47-.33.77-.29c.64 0 1 .31 1.54 1.44A10.51 10.51 0 0 1 11.12 12c.04 1.81-.4 3.61-1.27 5.2c-.54 1.05-.81 1.3-1.35 1.39c-.19.02-.39 0-.57-.09v.06m-4.21-2.13c-.33-.16-.59-.43-.72-.78c-.1-.35 0-.65.4-1.29c.5-.68.74-1.52.69-2.36c.07-.85-.16-1.69-.65-2.39A6.11 6.11 0 0 1 3 8.82c-.11-.63.31-1.23 1-1.35c.54-.1.92.13 1.42.89a6.619 6.619 0 0 1 0 7.27c-.51.77-1.09 1-1.69.8h-.01Z"
            ></path>
          </svg>
        </div>
        <div
          style={{
            display: 'flex',
            columnGap: 6,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: '100%',
              display: 'flex',
            }}
          >
            <img
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
              }}
              src={tokenSrc}
              alt=""
            />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
            }}
          >
            <span
              style={{
                color: 'white',
                fontWeight: 600,
                fontSize: 30,
                lineHeight: '30px',
              }}
            >
              {payRequest
                ? utils.formatUnits(payRequest.amount, payRequest.token.decimal)
                : 0}
            </span>
            <span
              style={{
                color: 'white',
                marginLeft: 4,
                fontWeight: 800,
                fontSize: 14,
                lineHeight: '20px',
              }}
            >
              {payRequest ? payRequest.token.symbol : ''}
            </span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '80%',
            left: 0,
            width: '150%',
            height: '100%',
            background:
              'radial-gradient(ellipse at 168px 80px, #c9afeb, transparent 75%)',
            filter: 'blur(30px)',
          }}
        />
        <div
          style={{
            marginTop: 'auto',
            marginLeft: 'auto',
            fontSize: 12,
            lineHeight: '16px',
            fontWeight: 400,
          }}
        >
          Powered by Mochi
        </div>
      </div>
    ),
    {
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
