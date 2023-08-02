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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query

  if (!id) {
    return {
      props: {},
    }
  }

  const transfer = await API.MOCHI_PAY.get(`/transfer/${id}`)
    .notFound(() => null)
    .json((r) => r.data)

  let receiver = {}
  if (transfer) {
    receiver = await API.MOCHI_PROFILE.get(
      `/profiles/${transfer?.other_profile_id}`,
    )
      .notFound(() => null)
      .internalError(() => null)
      .json((r) => r)
  }

  return {
    props: {
      transfer,
      receiver,
    },
  }
}

export default function Transfer({ transfer }: { transfer: any }) {
  const link = isSSR() ? '' : window.location.href
  return (
    <Layout
      skipAuth
      childSEO={
        <SEO
          title={'Payment Detail'}
          tailTitle
          image={`${HOME_URL}/api/transfer-og?id=${transfer.external_id}`}
          description={`${transfer.profile_id} paid ${
            transfer.other_profile_id
          } ${utils.formatUnits(transfer.amount, transfer.decimal)} ${
            transfer.token.symbol
          }`}
          url={`${HOME_URL}/transfer/${transfer.external_id}}`}
        />
      }
    >
      <div className="font-sans mx-auto max-w-sm px-4">
        <div className="px-8 py-10 border-2 border-mochi-gray rounded-2xl bg-white shadow-2xl overflow-hidden text-center">
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
          <div className="font-semibold text-base text-center mb-5">
            Payment Successful
          </div>
          <div className="flex items-baseline justify-center mb-6">
            <div className="text-4xl">
              {utils.formatUnits(transfer.amount, transfer.decimal)}
            </div>
            <div className="text-xl ml-1">{transfer.token.symbol}</div>
          </div>
          <ul className="bg-mochi-gray space-y-2 font-semibold text-sm p-4 rounded-lg overflow-hidden">
            <li className="flex justify-between">
              <span className="text-gray-600">From</span>
              <span className="font-semibold text-gray-500">
                {transfer.profile_id}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">To</span>
              <span className="font-semibold text-gray-500">
                {transfer.other_profile_id}
              </span>
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
                {transfer.tx_id}
              </span>
            </li>
            <li>
              <hr className="border-gray-600" />
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Payment Type</span>
              <span className="font-semibold text-gray-500">
                {transfer.type}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600">Currency</span>
              <span className="font-semibold text-gray-500">
                {utils.formatUnits(transfer.amount, transfer.decimal)}
                {` `}
                {transfer.token.symbol}
              </span>
            </li>
          </ul>
          <div className="flex justify-between space-x-4 mt-5">
            <CopyLink link={link} />
            <ShareButton link={link} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
