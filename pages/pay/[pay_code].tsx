import { heading } from '~components/Dashboard/Heading'
import { SEO } from '~app/layout/seo'
import QRCodeButton from '~components/Pay/QRCodeButton'
import CopyLinkButton from '~components/Pay/CopyLinkButton'
import ShareButton from '~components/Pay/ShareButton'
import WithdrawButton from '~components/Pay/WithdrawButton'
import Layout from '~components/Dashboard/Layout'
import Footer from '~components/Pay/Footer'
import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import { utils } from 'ethers'
import clsx from 'clsx'
import { button } from '~components/Dashboard/Button'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { isSSR, truncate } from '@dwarvesf/react-utils'
import { HOME_URL } from '~envs'
import { useDisclosure } from '@dwarvesf/react-hooks'
import useSWR from 'swr'
import Card from '~components/Pay/Card'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pay_code } = ctx.query

  if (!pay_code) {
    return {
      props: {},
    }
  }

  const payRequest = await API.MOCHI_PAY.get(`/pay-requests/${pay_code}`)
    .notFound(() => null)
    .json((r) => r.data)

  return {
    props: {
      payRequest,
    },
  }
}

export type PayRequest = {
  code: string
  claim_tx: string
  amount: string
  status: 'submitted' | 'claimed' | 'expired' | 'failed'
  note?: string
  token: {
    icon: string
    chain: {
      symbol: string
      icon: string
      explorer: string
    }
    decimal: number
    symbol: string
  }
}

type Props = {
  payRequest?: PayRequest
}

export default function PayCode({ payRequest: initialPayRequest }: Props) {
  const { data: payRequest = initialPayRequest, mutate } = useSWR<PayRequest>(
    `/pay-requests/${initialPayRequest?.code}`,
    (url) => API.MOCHI_PAY.get(url).json((r) => r.data),
  )

  const { isOpen: isDone, onOpen: setDone } = useDisclosure({
    defaultIsOpen: payRequest?.status !== 'submitted',
  })

  if (!payRequest) {
    return (
      <Layout
        skipAuth
        childSEO={
          <SEO
            title="Pay Link"
            tailTitle
            image={`${HOME_URL}/api/pay-og`}
            description="We couldn't find the Pay Link you were looking for."
            url={`${HOME_URL}/pay`}
          />
        }
        footer={<Footer />}
      >
        <div
          className={clsx(
            'flex flex-col p-8 pt-4 mx-auto text-center bg-white rounded-2xl md:mb-64 max-w-[450px]',
          )}
        >
          <h1 className={heading({ size: 'base' })}>Pay Link</h1>
          <Icon icon="tabler:error-404" className="my-6 mx-auto w-20 h-20" />
          <span className="text-lg font-semibold text-foreground">
            This Pay Link couldn&apos;t be found
          </span>
          <span className="mt-2 text-sm font-medium text-foreground-secondary">
            You can recheck the code or generate a new one
          </span>
          <button
            className={button({
              appearance: 'secondary',
              className: 'mt-8',
            })}
          >
            <div>Back to Home page</div>
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout
      skipAuth
      childSEO={
        <SEO
          title="Pay Link"
          tailTitle
          image={`${HOME_URL}/api/pay-og?code=${payRequest.code}`}
          description={`Visit this Pay Link to withdraw ${utils.formatUnits(
            payRequest.amount,
            payRequest.token.decimal,
          )} ${payRequest.token.symbol} to your wallet!`}
          url={`${HOME_URL}/pay/${payRequest.code}`}
        />
      }
      footer={<Footer />}
    >
      <div
        className={clsx(
          'flex flex-col p-8 pt-4 mx-auto text-center bg-white rounded-2xl md:mb-64',
          {
            'gap-y-6 max-w-[400px]': payRequest.status !== 'expired',
            'max-w-[450px]': payRequest.status === 'expired',
          },
        )}
      >
        <h1 className={heading({ size: 'base' })}>Pay Link</h1>
        {payRequest.status === 'expired' ? (
          <>
            <div className="relative my-6 h-10">
              <Image
                fill
                src="/assets/watch-red.png"
                alt="icon for expired pay link"
                className="object-contain"
              />
            </div>
            <span className="text-lg font-semibold text-foreground">
              This link has expired
            </span>
            <span className="mt-2 text-sm font-medium text-foreground-secondary">
              This Pay Link expires after 3 days and can only be used once.
              Please ask your friend for a new link!
            </span>
            <button
              className={button({
                appearance: 'secondary',
                className: 'mt-8',
              })}
            >
              <div>Back to Home page</div>
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <QRCodeButton uri={isSSR() ? '' : window.location.href} />
              <CopyLinkButton link={isSSR() ? '' : window.location.href} />
              <ShareButton link={isSSR() ? '' : window.location.href} />
            </div>

            <Card isDone={isDone} payRequest={payRequest} />
            {payRequest.note ? (
              <span>
                <span className="font-medium">Message: </span>&ldquo;
                {truncate(payRequest.note, 100, false)}
                &rdquo;
              </span>
            ) : null}
            {payRequest.status === 'claimed' && isDone ? (
              <span>This Pay Link has been claimed</span>
            ) : null}
            <WithdrawButton
              isDone={isDone}
              setDone={setDone}
              refresh={mutate}
              payRequest={payRequest}
            />
          </>
        )}
      </div>
    </Layout>
  )
}
