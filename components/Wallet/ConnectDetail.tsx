import { useMemo } from 'react'
import { WalletConnector } from 'context/wallets/useWalletConnectors'
import { QRCode } from './QRCode'
import { heading } from '~components/Dashboard/Heading'
import { button } from '~components/Dashboard/Button'

export type ConnectDetailProps = {
  connectionError: boolean
  qrCodeUri?: string
  reconnect: (wallet: WalletConnector) => void
  wallet: WalletConnector
}

export const ConnectDetail = ({
  wallet,
  qrCodeUri,
  connectionError,
  reconnect,
}: ConnectDetailProps) => {
  const { downloadUrls, iconUrl, qrCode, ready } = wallet

  const qrCodeView = useMemo(() => {
    const { name, iconBackground, iconUrl, qrCode } = wallet

    if (!qrCodeUri || !qrCode) return null

    return (
      <div className="flex flex-col items-center h-full">
        <h1 className={heading({ size: 'xs' })}>Scan with {name}</h1>
        <div className="flex flex-1 justify-center items-center my-3">
          <QRCode
            logoBackground={iconBackground}
            logoUrl={iconUrl}
            uri={qrCodeUri}
          />
        </div>
        <button className={button({ size: 'sm' })}>Copy to clipboard</button>
      </div>
    )
  }, [wallet, qrCodeUri])

  const connectingView = useMemo(() => {
    return (
      <div className="relative h-full">
        <div className="flex justify-center items-center w-full h-full">
          <div className="mx-auto w-full max-w-xs text-center">
            <div className="flex justify-center items-center">
              <div className="w-20 h-20 rounded-full">
                <img
                  alt="Logo"
                  className="object-cover w-full"
                  src="/favicon.ico"
                />
              </div>
              <hr className="flex-1 border-t-2 border-dashed border-[#33B4DD]" />
              <div
                style={{
                  boxShadow: '0px 0px 16.5517px rgba(0, 0, 0, 0.18)',
                }}
                className="overflow-hidden p-4 w-20 h-20 rounded-full"
              >
                <img
                  alt={wallet.name}
                  className="object-cover w-full"
                  src={iconUrl}
                />
              </div>
            </div>
            <h1 className={heading({ className: 'mt-8', size: 'xs' })}>
              Opening {wallet.name}
            </h1>
            {connectionError ? (
              <span className="text-sm font-semibold text-red-400">
                Error connecting, please retry!
              </span>
            ) : (
              <span className="mt-px text-xs font-semibold text-foreground">
                Please wait for connection...
              </span>
            )}
          </div>
        </div>
        <div className="flex absolute inset-x-0 bottom-1 justify-between items-center">
          <span className="text-xs font-medium text-foreground">
            If the connection failed, please try again.
          </span>
          <button
            className={button({ size: 'sm' })}
            onClick={() => reconnect(wallet)}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }, [wallet, iconUrl, connectionError, reconnect])

  const downloadExtendsionView = useMemo(() => {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="mb-6 w-20 h-20 rounded-full">
          <img
            alt={wallet.name}
            className="object-cover w-full"
            src={wallet.iconUrl}
          />
        </div>
        <span className="mb-2 max-w-xs text-sm font-semibold text-center text-foreground">{`The ${wallet.name} extension is not installed in your browser`}</span>
        <a
          className={button({
            className: 'uppercase',
            size: 'sm',
          })}
          href={downloadUrls?.browserExtension}
          target="_blank"
          rel="noreferrer"
        >
          Install
        </a>
      </div>
    )
  }, [wallet, downloadUrls])

  const contentView = useMemo(() => {
    if (qrCode && qrCodeUri) {
      return qrCodeView
    }
    if (ready) {
      return connectingView
    }

    if (downloadUrls?.browserExtension) {
      return downloadExtendsionView
    }
  }, [
    qrCodeView,
    connectingView,
    downloadExtendsionView,
    qrCode,
    qrCodeUri,
    ready,
    downloadUrls,
  ])

  return <div className="w-full h-full">{contentView}</div>
}