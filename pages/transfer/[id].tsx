import { GetServerSideProps } from 'next'
import clsx from 'clsx'
import { API } from '~constants/api'
import { util3 } from '~utils/image'
import Image from 'next/image'
import { utils } from 'ethers'
import { format } from 'date-fns'
import { isSSR } from '@dwarvesf/react-utils'
import CopyLink from '~components/Pay/CopyLinkButton'
import Layout from '~components/Dashboard/Layout'
import { HOME_URL } from '~envs'
import { SEO } from '~app/layout/seo'
import ShareButton from '~components/Pay/ShareButton'
import { heading } from '~components/Dashboard/Heading'
import { fmt } from '~utils/formatter'
import { Platform, utils as mochiUtils } from '@consolelabs/mochi-formatter'

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

  return {
    props: {
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
}: {
  transfer: any
  sender: string
  receiver: string
}) {
  const link = isSSR() ? '' : window.location.href
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
      <div className="px-4 mx-auto max-w-sm font-sans">
        <div className="overflow-hidden py-10 px-8 text-center bg-white rounded-2xl border-2 shadow-2xl border-mochi-gray">
          <h1 className={clsx(heading({ size: 'base' }), 'mb-5')}>
            Payment Detail
          </h1>
          <Image
            src={util3.src}
            width={80}
            height={80}
            className="mx-auto mb-5"
            alt="Payment success"
          />
          <div className="mb-5 text-base font-semibold text-center">
            Payment Successful
          </div>
          <div className="flex justify-center items-baseline mb-6">
            <div className="text-4xl">
              {mochiUtils.formatTokenDigit(
                utils.formatUnits(transfer.amount, transfer.decimal),
              )}
            </div>
            <div className="ml-1 text-xl">{transfer.token.symbol}</div>
          </div>
          <ul className="overflow-hidden p-4 space-y-2 text-sm font-semibold rounded-lg bg-mochi-gray">
            <li className="flex justify-between">
              <span className="text-gray-600">From</span>
              <span className="font-semibold text-gray-500">{sender}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">To</span>
              <span className="font-semibold text-gray-500">{receiver}</span>
            </li>
            {transfer.message && (
              <li className="flex justify-between">
                <span className="text-gray-600">Description</span>
                <span className="font-semibold text-gray-500">
                  {transfer.message}
                </span>
              </li>
            )}
            <li className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-500">
                {format(new Date(transfer.created_at), 'yyyy-MM-dd hh:mm:ss')}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Tx ID</span>
              <span className="font-semibold text-gray-500">
                {transfer.external_id}
              </span>
            </li>
            <li>
              <hr className="border-gray-600" />
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Payment Type</span>
              <span className="font-semibold text-gray-500">
                {transfer.action === 'transfer' ? 'tip' : transfer.action}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Currency</span>
              <span className="font-semibold text-gray-500">
                {mochiUtils.formatTokenDigit(
                  utils.formatUnits(transfer.amount, transfer.decimal),
                )}
                {` `}
                {transfer.token.symbol}
              </span>
            </li>
          </ul>
          <div className="flex justify-between mt-5 space-x-4">
            <CopyLink link={link} />
            <ShareButton link={link} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
