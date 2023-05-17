import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { button } from '~components/Dashboard/Button'
import { PAGES } from '~constants'
import { useHasMounted } from '@dwarvesf/react-hooks'
import { GetServerSideProps } from 'next'
import { Icon } from '@iconify/react'
import Script from 'next/script'
import { HOME_URL } from '~envs'
import { useAuthStore, useProfileStore } from '~store'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.query

  if (!code)
    return {
      notFound: true,
    }

  return {
    props: {
      code,
    },
  }
}

export default function ConnectTelegram({ code }: { code: string }) {
  const isLoading = useAuthStore((s) => s.isLoadingSession)
  const profile = useProfileStore((s) => s.me)
  const hasTelegramAccount =
    profile?.associated_accounts?.some(
      (aa) => aa.platform?.toLowerCase() === 'telegram',
    ) ?? false
  const mounted = useHasMounted()

  if (!mounted) return null

  return (
    <Layout>
      <Script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        data-telegram-login="dmmochibot"
        data-size="large"
        data-auth-url={`https://api.mochi-profile.console.so/api/v1/auth/telegram?code=${code}`}
        data-request-access="write"
      ></Script>
      <SEO title={PAGES.CONNECT_TELEGRAM.title} tailTitle />
      <div className="flex relative flex-col items-center">
        <div className="py-16 px-12 mx-auto max-w-7xl">
          <div className="py-24 md:py-48">
            {isLoading ? null : hasTelegramAccount ? (
              <div className="py-8 px-8 mx-auto md:px-16 md:max-w-2xl">
                <div className="text-2xl font-black text-center md:text-3xl">
                  <span className="uppercase text-mochi-gradient">
                    Your Telegram is linked! You can close this window
                  </span>{' '}
                  ✨
                </div>
              </div>
            ) : (
              <a
                className={button({
                  className: '!shadow-none font-semibold',
                  appearance: 'secondary',
                })}
                href={`https://oauth.telegram.org/auth?bot_id=6298380973&origin=${encodeURI(
                  HOME_URL,
                )}&embed=1&request_access=write&return_to=${encodeURI(
                  `${HOME_URL}/connect-telegram?code=${code}`,
                )}`}
              >
                <Icon icon="ic:baseline-telegram" />
                <div>Connect Telegram</div>
              </a>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
