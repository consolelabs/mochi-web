import { useForm } from 'react-hook-form'
import { button } from '~components/Dashboard/Button'
import Field from '~components/Dashboard/Form/Field'
import { Input } from '~components/Dashboard/Input'

type FormValue = {
  walletAddress: string
}

export default function WalletAddressForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (values: FormValue) => Promise<void>
  onCancel: () => void
}) {
  const { handleSubmit, control } = useForm<FormValue>()

  return (
    <div className="flex flex-col p-4 bg-white rounded-2xl md:p-6 min-w-[300px] md:min-w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 mb-6">
          <Field
            name="walletAddress"
            rules={{ required: 'required' }}
            label="Recipient's public key"
            control={control}
          >
            <Input placeholder="Enter wallet address" />
          </Field>
        </div>
        <div className="flex gap-x-2 justify-end">
          <button
            type="button"
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
