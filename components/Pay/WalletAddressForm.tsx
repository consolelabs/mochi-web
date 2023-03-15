import { useForm } from 'react-hook-form'
import { button } from '~components/Dashboard/Button'
import { Input } from '~components/Dashboard/Input'

type FormValue = {
  walletAddress: string
}

export default function WalletAddressForm({
  onCancel,
  onAfterSubmit,
}: {
  onCancel: () => void
  onAfterSubmit: (values: any) => void
}) {
  const { register, handleSubmit } = useForm<FormValue>()

  const onSubmit = async (values: FormValue) => {
    console.log('walletAddress: ', values.walletAddress)

    onAfterSubmit(values.walletAddress)
    onCancel()
  }

  return (
    <div className="p-4 md:p-8 flex flex-col min-w-[380px] bg-[#FFFFFF] rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font-semibold">Recipient&#39;s public key</div>
        <Input
          className="mt-2 mb-6"
          placeholder="Enter wallet address"
          {...register('walletAddress', {
            required: 'required',
          })}
        />
        <div className="flex justify-end gap-x-2">
          <button
            className={button({
              appearance: 'gray',
            })}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={button({
              appearance: 'secondary',
            })}
            type="submit"
          >
            Claim
          </button>
        </div>
      </form>
    </div>
  )
}
