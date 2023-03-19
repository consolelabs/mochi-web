import { Chain } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

type SerializedOptions = string
const sharedConnectors = new Map<SerializedOptions, WalletConnectConnector>()

type WalletConnectConnectorOptions = ConstructorParameters<
  typeof WalletConnectConnector
>[0]

function createConnector(options: WalletConnectConnectorOptions) {
  const connector = new WalletConnectConnector(options)
  sharedConnectors.set(JSON.stringify(options), connector)
  return connector
}

export function getWalletConnectConnector({
  chains,
  showQrModal = false,
}: {
  chains: Chain[]
  showQrModal?: boolean
}) {
  const options: WalletConnectConnectorOptions = {
    chains,
    options: {
      projectId: 'e9f8a905b4d5c924cec1a740623be776',
      showQrModal,
    },
  }

  const serializedOptions = JSON.stringify(options)
  const sharedConnector = sharedConnectors.get(serializedOptions)

  return sharedConnector ?? createConnector(options)
}
