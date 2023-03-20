import { ForwardedRef, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import Field from '~components/Dashboard/Form/Field'
import { Select } from '~components/Dashboard/Select'

type Props = {
  defaultValues?: Record<string, any>
  onSubmit: (values: Record<string, any>) => void
}

export const ParticipateForm = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const { defaultValues, onSubmit } = props
    const { control, handleSubmit } = useForm({
      defaultValues,
    })

    const internalOnSubmit = (values: Record<string, any>) => {
      onSubmit(values)
    }

    return (
      <form
        ref={ref}
        className="mt-16 mb-64 w-full sm:w-[320px] mx-auto text-sm flex flex-col space-y-6"
        onSubmit={handleSubmit(internalOnSubmit)}
      >
        <Field
          name="participate"
          label="Participate"
          control={control}
          rules={{
            required: 'Required',
          }}
          description={
            <div className="text-xs my-2 text-dashboard-gray-2">
              Please set the eligibility to participate in the quest
            </div>
          }
        >
          <Select options={[{ label: 'All User', value: 'all' }]} />
        </Field>
      </form>
    )
  },
)
