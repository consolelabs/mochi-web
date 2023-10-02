import { button } from './Button'
import { heading } from './Heading'
import { Icon } from '@iconify/react'
import { Input } from './Input'
import { AUTH_DISCORD_URL } from '~envs'
import { useAppWalletContext } from '~context/wallet-context'
import { useLoginAfterConnect } from '~hooks/useLoginAfterConnect'
import { Button } from '~components/Button'

const Divider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative justify-center items-center w-full">
      <div className="absolute w-full rounded-full h-[2px] bg-dashboard-gray-3" />
      <span className="relative px-3 text-sm bg-dashboard-gray-1 text-dashboard-gray-2">
        {children}
      </span>
    </div>
  )
}

export default function Login() {
  const { showConnectModal } = useAppWalletContext()
  const loginAfterConnect = useLoginAfterConnect()

  return (
    <div className="flex flex-1 justify-center items-center w-full">
      <div className="flex flex-col items-center">
        <h2 className={heading({ className: 'mb-6', size: 'lg' })}>Log in</h2>
        <div className="flex flex-col gap-y-5">
          <Divider>Sign in with an extension wallet</Divider>
          <button className="py-2 px-5 text-white bg-black rounded-lg">
            Connect Wallet
          </button>
          <Divider>Or connect with verified social links</Divider>
          <div className="grid grid-cols-2 grid-rows-2 gap-3 mt-5">
            <a
              href={`${AUTH_DISCORD_URL}?url_location=${window.location.href}`}
              className={button({})}
            >
              <Icon icon="mingcute:discord-fill" className="text-foreground" />
              <div>Discord</div>
            </a>
            <button className={button({})}>
              <Icon icon="mingcute:google-fill" className="text-foreground" />
              <div>Google</div>
            </button>
            <button
              type="button"
              onClick={() => showConnectModal(loginAfterConnect)}
              className={button({})}
            >
              <Icon icon="mingcute:ethereum-fill" className="text-foreground" />
              <div>Ethereum</div>
            </button>
            <button
              type="button"
              onClick={() => showConnectModal(loginAfterConnect)}
              className={button({})}
            >
              <Icon
                icon="mingcute:solana-sol-line"
                className="text-foreground"
              />
              <div>Solana</div>
            </button>
            <button className={button({ className: 'col-span-2' })}>
              Another email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
