import { button } from './Button'
import { heading } from './Heading'
import { Icon } from '@iconify/react'
import { Input } from './Input'
import { AUTH_DISCORD_URL } from '~envs'
import { useAppWalletContext } from '~context/wallet-context'

export default function Login() {
  const { showConnectModal } = useAppWalletContext()

  return (
    <div className="flex flex-1 justify-center items-center w-full">
      <div className="flex flex-col items-center">
        <h2 className={heading({ className: 'mb-6', size: 'lg' })}>Log in</h2>
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
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
            onClick={() => showConnectModal()}
            className={button({})}
          >
            <Icon icon="mingcute:ethereum-fill" className="text-foreground" />
            <div>Ethereum</div>
          </button>
          <button
            type="button"
            onClick={() => showConnectModal()}
            className={button({})}
          >
            <Icon icon="mingcute:solana-sol-line" className="text-foreground" />
            <div>Solana</div>
          </button>
        </div>
        <div className="flex relative justify-center items-center mt-5 mb-3 w-full">
          <div className="absolute w-full rounded-full h-[2px] bg-dashboard-gray-3" />
          <span className="relative px-3 text-sm bg-dashboard-gray-1 text-dashboard-gray-2">
            Or sign in with an email
          </span>
        </div>
        <span className="self-start text-xs font-semibold uppercase text-dashboard-gray-2">
          your email
        </span>
        <Input className="mt-2" />
        <button
          className={button({
            appearance: 'mochi',
            className: 'self-stretch mt-5',
          })}
        >
          Login
        </button>
      </div>
    </div>
  )
}
