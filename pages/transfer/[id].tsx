import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import { utils } from 'ethers'
import { format } from 'date-fns'
import Layout from '~components/Dashboard/Layout'
import { HOME_URL } from '~envs'
import { SEO } from '~app/layout/seo'
import { fmt } from '~utils/formatter'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'
import { Icon } from '@iconify/react'
import CutoutAvatar from '~components/CutoutAvatar/CutoutAvatar'
import {
  discordLogo,
  successStampIcon,
  telegramLogo,
  xlogo,
} from '~utils/image'
import clsx from 'clsx'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query

  if (!id) {
    return {
      props: {},
    }
  }

  const transfer = await API.MOCHI_PAY.get(`/transfer/${id}`)
    .notFound(() => null)
    .json((r: any) => r.data)

  if (!transfer) {
    return {
      notFound: true,
    }
  }

  const type = transfer.type

  let [sender, receiver] = await fmt.account(
    Platform.Web,
    transfer.from_profile_id,
    transfer.other_profile_id,
  )

  if (type === 'in') {
    ;[sender, receiver] = [receiver, sender]
  }

  let platformIcon
  switch (sender?.platform) {
    case Platform.Discord: {
      platformIcon = discordLogo.src
      break
    }
    case Platform.Telegram: {
      platformIcon = telegramLogo.src
      break
    }
    case Platform.Twitter: {
      platformIcon = xlogo.src
      break
    }
  }

  platformIcon = xlogo.src
  return {
    props: {
      platformIcon,
      transfer,
      sender: sender?.plain ?? '',
      receiver: receiver?.plain ?? '',
    },
  }
}

export default function Transfer({
  transfer,
  sender,
  receiver,
  platformIcon,
}: {
  platformIcon?: string
  transfer: any
  sender: string
  receiver: string
}) {
  return (
    <Layout
      skipAuth
      childSEO={
        <SEO
          title={'Payment Detail'}
          tailTitle
          image={`${HOME_URL}/api/transfer-og?id=${transfer.external_id}`}
          description={`${sender} paid ${receiver} ${mochiUtils.formatTokenDigit(
            utils.formatUnits(transfer.amount, transfer.decimal),
          )} ${transfer.token.symbol}`}
          url={`${HOME_URL}/transfer/${transfer.external_id}}`}
        />
      }
    >
      <div className="px-4 mx-auto w-full max-w-md font-sans drop-shadow-md">
        <div className="flex overflow-hidden relative flex-col gap-y-12 py-3 px-6 pb-6 w-full text-center bg-white rounded-lg md:px-8 receipt">
          <div
            className="w-1/2 -translate-x-1/2"
            style={{
              display: 'flex',
              top: 10,
              left: '50%',
              position: 'absolute',
              height: 200,
              background:
                'linear-gradient(0deg, #f4c4c2 0%, #eec3fd 48.96%, #8fc6e4 100%)',
              filter: 'blur(60px)',
              opacity: 0.7,
            }}
          />
          <Icon
            icon="solar:gift-linear"
            className="relative mt-2 w-full h-32 text-gray-700 drop-shadow-2xl"
          />
          <div className="flex relative flex-col items-center">
            {!platformIcon ? (
              <img src={transfer.from_profile.avatar} alt="" />
            ) : (
              <CutoutAvatar
                size="sm"
                src={transfer.from_profile.avatar}
                cutoutSrc={platformIcon}
              />
            )}
            <div className="mt-2 text-sm">
              <span className="font-medium">{sender}</span>
              <br />
              <span className="text-xs font-light text-gray-500">
                made a payment
              </span>
            </div>
            <div className="flex justify-center items-center mt-8 font-medium">
              <div
                className={clsx('flex flex-col items-center', {
                  'flex-col': '',
                })}
              >
                <div className="text-5xl">
                  {/* 100,000,000 */}
                  {mochiUtils.formatTokenDigit(
                    utils.formatUnits(transfer.amount, transfer.decimal),
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <img
                    className="mr-2 w-6 h-6"
                    src={transfer.token.icon}
                    alt=""
                  />
                  <div className="text-4xl">{transfer.token.symbol}</div>
                </div>
              </div>
            </div>
            <span className="text-xl">
              &asymp; {mochiUtils.formatUsdDigit(transfer.usd_amount)}
            </span>
          </div>
          {transfer.message && (
            <span className="relative mt-3 font-normal text-justify">
              &ldquo;{transfer.message}&rdquo;
            </span>
          )}
          <div className="relative -mx-6 text-gray-400">
            <div className="flex relative flex-col gap-y-2 gap-x-4 py-4 font-mono xs:flex-row">
              <div className="absolute top-0 left-0 w-full h-full scale-x-125 receipt-dashed-box" />
              <ul className="relative px-2 space-y-2 text-xs fle-1">
                <li className="flex gap-x-3 justify-between">
                  <span className="font-normal text-current">From</span>
                  <span className="font-normal text-current">{sender}</span>
                </li>
                <li className="flex gap-x-3 justify-between">
                  <span className="font-normal text-current">To</span>
                  <span className="font-normal text-current">{receiver}</span>
                </li>

                <li className="flex gap-x-3 justify-between">
                  <span className="font-normal text-current">Amount</span>
                  <span className="font-normal text-current">
                    {mochiUtils.formatTokenDigit(
                      utils.formatUnits(transfer.amount, transfer.decimal),
                    )}
                    <span className="ml-1 font-normal text-current">
                      {transfer.token.symbol}
                    </span>
                  </span>
                </li>
              </ul>
              <ul className="relative flex-1 px-2 space-y-2 text-xs">
                <li className="flex justify-between">
                  <span className="font-normal text-current">Tx ID</span>
                  <span className="font-normal text-current">
                    {transfer.external_id}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-normal text-current">Date</span>
                  <span className="font-normal text-current">
                    {format(
                      new Date(transfer.created_at),
                      'dd/MM/yyyy hh:mmaa',
                    )}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="font-normal text-current">Status</span>
                  <span className="font-normal text-current">Success</span>
                </li>
                <img
                  src={successStampIcon.src}
                  className="absolute right-0 top-1/2 flex-shrink-0 h-full opacity-30 scale-[2]"
                  alt=""
                />
              </ul>
            </div>
            <div className="flex justify-between px-2 mt-5 text-xs font-light">
              <a className="text-current" href="#">
                Mochi &copy; 2023
              </a>
              <span className="text-current">
                {format(new Date(transfer.created_at), 'dd/MM/yyyy hh:mmaa')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
