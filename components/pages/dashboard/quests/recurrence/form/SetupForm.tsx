import { ForwardedRef, forwardRef } from 'react'
import { useForm } from 'react-hook-form'
import Field from '~components/Dashboard/Form/Field'
import { Input } from '~components/Dashboard/Input'
import { Select } from '~components/Dashboard/Select'

type Props = {
  defaultValues?: Record<string, any>
  onSubmit: (values: Record<string, any>) => void
}

export const SetupForm = forwardRef(
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
          name="title"
          label="Title"
          control={control}
          rules={{
            required: 'Required',
          }}
        >
          <Input placeholder="Say gm/gn" />
        </Field>
        <Field
          name="actions"
          label="Actions"
          control={control}
          rules={{
            required: 'Required',
          }}
          description={
            <div className="text-xs my-2 text-dashboard-gray-2">
              Command patterns are used to suggest the quest
            </div>
          }
        >
          <Select
            options={[
              { label: '$tip', value: '$tip' },
              { label: '$help', value: '$help' },
            ]}
            multiple
            searchable
          />
        </Field>
        <Field
          name="times"
          label="Number of times"
          control={control}
          rules={{
            required: 'Required',
            validate: (value) => (value && value > 0) || 'Required',
          }}
        >
          <Input
            placeholder="0"
            suffix="times"
            type="number"
            suffixProps={{ appearance: 'bgless' }}
            allowClear={false}
          />
        </Field>
        <Field
          name="repeat"
          label="Repeat"
          control={control}
          rules={{
            required: 'Required',
          }}
        >
          <Select
            options={[
              { label: 'One Time', value: '1' },
              { label: 'Every Day', value: 'd' },
              { label: 'Every Week', value: 'w' },
              { label: 'Every Month', value: 'm' },
            ]}
          />
        </Field>
      </form>
    )
  },
)
