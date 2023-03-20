import { heading } from '~components/Dashboard/Heading'
import { SEO } from '~app/layout/seo'
import QRCodeButton from '~components/Pay/QRCodeButton'
import CopyLinkButton from '~components/Pay/CopyLinkButton'
import ShareButton from '~components/Pay/ShareButton'
import WithdrawButton from '~components/Pay/WithdrawButton'
import Layout from '~components/Dashboard/Layout'
import Card from '~components/Pay/Card'
import Footer from '~components/Pay/Footer'
import { GetServerSideProps } from 'next'
import { API } from '~constants/api'
import { utils } from 'ethers'
import clsx from 'clsx'
import { button } from '~components/Dashboard/Button'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { isSSR } from '@dwarvesf/react-utils'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pay_code } = ctx.query

  if (!pay_code) {
    return {
      props: {},
    }
  }

  const { data: payRequest } = await API.getPayRequestInfo(pay_code as string)

  return {
    props: {
      payRequest,
    },
  }
}

type Props = {
  payRequest?: {
    amount: string
    status: 'submitted' | 'claimed' | 'expired'
    token: {
      decimal: number
      symbol: string
    }
  }
}

export default function PayCode({ payRequest }: Props) {
  if (!payRequest) {
    return (
      <Layout footer={<Footer />}>
        <SEO title="Pay Link" tailTitle />
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
    <Layout footer={<Footer />}>
      <SEO title="Pay Link" tailTitle />
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
              <ShareButton />
            </div>

            <Card
              balance={utils.formatUnits(
                payRequest.amount,
                payRequest.token.decimal,
              )}
              coin={payRequest.token.symbol}
            />
            <WithdrawButton />
          </>
        )}
      </div>
    </Layout>
  )
}
