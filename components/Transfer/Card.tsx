import { utils } from 'ethers'
import { utils as mochiUtils } from '@consolelabs/mochi-formatter'

export type Props = {
  from: string
  to: string
  tokenIcon: string
  amount: string
  decimal: number
  symbol: string
  date: string
  isOG?: boolean
}

// we must style this component via `style` prop since we're also using
// for the vercel's OG image generation, and they are still experiencing with tailwind class support
// so it's better to stick with native css
export function CardUI({
  amount,
  decimal,
  symbol,
  from,
  to,
  date,
  tokenIcon,
  isOG = false,
}: Props) {
  return (
    <div
      style={{
        ...(!isOG ? { transform: 'translateZ(0px)' } : {}),
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        margin: '0 auto',
        borderRadius: 16,
        padding: '20px',
        height: 200,
        width: '100%',
        background: 'linear-gradient(135deg, #e9dbda, #eec3fd, #8fc6e4)',
        filter: 'drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.2))',
      }}
      className="w-[270px] sm:w-[340px]"
    >
      <div
        style={{
          margin: '0 auto',
          color: '#111827',
          fontWeight: 600,
          fontSize: 12,
          marginBottom: 8,
        }}
      >
        Payment Successful
      </div>
      <div
        style={{
          margin: '0 auto',
          color: '#111827',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'baseline',
        }}
      >
        <img
          style={{
            width: '30px',
            height: '30px',
            marginRight: 8,
          }}
          src={tokenIcon}
          alt={`${symbol} token icon`}
        />
        <span>
          {mochiUtils.formatTokenDigit(utils.formatUnits(amount ?? 0, decimal))}
        </span>
        <span
          style={{
            fontWeight: 600,
            fontSize: 12,
            lineHeight: '16px',
            marginLeft: 1,
          }}
        >
          {symbol}
        </span>
      </div>
      <div
        style={{
          width: '80%',
          margin: '12px auto 0 auto',
          padding: '8px',
          background: 'rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          borderRadius: 8,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            fontSize: 8,
            marginBottom: 8,
          }}
        >
          <div>From</div>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {from}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            fontSize: 8,
            marginBottom: 8,
          }}
        >
          <div>To</div>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {to}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            fontSize: 8,
            marginBottom: 8,
          }}
        >
          <div>Date</div>
          <div
            style={{
              fontWeight: 600,
            }}
          >
            {date}
          </div>
        </div>
      </div>
    </div>
  )
}
