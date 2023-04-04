import { useState } from 'react'
import {
  ChainMismatchError,
  erc20ABI,
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi'

export const useSendEVMToken = () => {
  const [config, setConfig] = useState<any>(null)

  const { config: nativeConfig, error: nativeError } =
    usePrepareSendTransaction(config ?? {})
  const { sendTransactionAsync } = useSendTransaction(nativeConfig)

  const { config: nonNativeConfig, error: nonNativeError } =
    usePrepareContractWrite<typeof erc20ABI, 'transfer', number>(config ?? {})
  const { writeAsync } = useContractWrite(nonNativeConfig)

  return {
    config,
    setConfig,
    sendNonNative: writeAsync,
    sendNative: sendTransactionAsync,
    wrongChain:
      nativeError instanceof ChainMismatchError ||
      nonNativeError instanceof ChainMismatchError,
  }
}
