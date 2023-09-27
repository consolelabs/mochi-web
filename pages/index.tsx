import { Icon } from '@iconify/react'
import { Layout } from '~app/layout'
import { SEO } from '~app/layout/seo'
import { INVITE_LINK, TELEGRAM_LINK } from '~envs'
import { home } from '~utils/image'
import { IntegratedChains } from '~components/IntegratedChains'
import Typed from 'typed.js'
import { useEffect, useRef } from 'react'

export default function Index() {
  const currency = useRef<HTMLSpanElement>(null)
  const platform = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const typedCur = new Typed(currency.current, {
      strings: ['Ethereum', 'Bitcoin', 'Solana', 'Dogecoin'],
      typeSpeed: 80,
      backDelay: 1800,
      loop: true,
      shuffle: true,
    })

    const typedPlat = new Typed(platform.current, {
      strings: ['Discord', 'Telegram', 'any text interface'],
      typeSpeed: 50,
      backDelay: 1800,
      loop: true,
    })

    return () => {
      typedCur.destroy()
      typedPlat.destroy()
    }
  }, [])

  return (
    <Layout>
      <SEO />
      <div className="flex justify-center p-10 my-auto w-full">
        <div className="flex flex-col gap-x-10 gap-y-10 justify-center max-w-5xl md:flex-row">
          <div className="flex flex-col flex-1 justify-center">
            <p className="text-4xl">
              Send <span ref={currency}></span>
              <br />
              to anyone on
              <br />
              <span ref={platform}></span>
            </p>
            <span className="mt-5 font-thin">
              Use MochiBot to send and receive any amount of crypto, directly on
              your favorite Discord servers or Telegram groups, without having a
              wallet or having to pay a single cent in fees!
            </span>

            <div className="flex gap-x-3 pt-3">
              <a
                href={INVITE_LINK}
                className="flex gap-x-2 items-center py-2 px-5 whitespace-nowrap rounded-md bg-discord"
              >
                <Icon
                  icon="carbon:logo-discord"
                  color="#fff"
                  className="w-full"
                />
                <span className="font-medium text-white">Add Discord</span>
              </a>
              <a
                href={TELEGRAM_LINK}
                className="flex gap-x-2 items-center py-2 px-5 whitespace-nowrap rounded-md bg-telegram"
              >
                <Icon icon="bi:telegram" color="#fff" className="w-full" />
                <span className="font-medium text-white">Add Telegram</span>
              </a>
            </div>
          </div>
          <div className="flex relative flex-1">
            <img src={home.src} alt="" />
          </div>
        </div>
      </div>
      <p className="mx-auto mb-3 text-2xl">Mochi supports these chains</p>
      <IntegratedChains />
    </Layout>
  )
}
