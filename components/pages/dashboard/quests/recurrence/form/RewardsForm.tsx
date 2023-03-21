import { Icon } from '@iconify/react'
import { ForwardedRef, forwardRef } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { button } from '~components/Dashboard/Button'
import Field from '~components/Dashboard/Form/Field'
import { heading } from '~components/Dashboard/Heading'
import { Input } from '~components/Dashboard/Input'
import { RadioGroup } from '~components/Dashboard/Radio'
import { Select } from '~components/Dashboard/Select'
import { Switch } from '~components/Dashboard/Switch'

const rewardOptions = [
  { label: 'XP', value: 'xp' },
  { label: 'Coin', value: 'coin' },
]

type Props = {
  defaultValues?: Record<string, any>
  onSubmit: (values: Record<string, any>) => void
}

export const RewardsForm = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLFormElement>) => {
    const { defaultValues, onSubmit } = props
    const { control, watch, handleSubmit } = useForm({
      defaultValues,
    })
    const {
      fields: rewardFields,
      append,
      remove,
    } = useFieldArray({
      control,
      name: 'rewards',
      rules: {
        required: 'Required',
      },
    })
    const rewards = watch('rewards')

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
          name="type"
          control={control}
          rules={{
            required: 'Required',
          }}
        >
          <RadioGroup
            options={[
              { label: 'Same amount', value: '1' },
              { label: 'Separate amount', value: '2' },
            ]}
          />
        </Field>
        <Field
          name="num_of_rewards"
          label="Number of rewards"
          control={control}
          rules={{
            required: 'Required',
            validate: (value) => (value && value > 0) || 'Required',
          }}
        >
          <Input placeholder="0" type="number" allowClear={false} />
        </Field>
        <div className="flex flex-col items-start gap-y-2">
          <div className={heading({ size: 'xs' })}>Rewards</div>
          {rewardFields.map((field, index) => {
            return (
              <div className="flex w-full items-center gap-2" key={field.id}>
                <Controller
                  control={control}
                  name={`rewards.${index}.type`}
                  render={({ field }) => {
                    return (
                      <div className="flex-1">
                        <Select
                          {...field}
                          placeholder="Select"
                          options={rewardOptions.filter((option) => {
                            return !rewards.some(
                              (r: any) =>
                                r.type === option.value &&
                                option.value !== field.value,
                            )
                          })}
                          renderOption={(option) => (
                            <div className="flex items-center gap-2">
                              <img
                                src={`/assets/dashboard/${option.value}.png`}
                                alt=""
                                className="w-4 h-4"
                              />
                              <div>{option.label}</div>
                            </div>
                          )}
                        />
                      </div>
                    )
                  }}
                />
                <Controller
                  control={control}
                  name={`rewards.${index}.value`}
                  rules={{
                    required: true,
                    validate: (value) => (value && value > 0) || 'Required',
                  }}
                  render={({ field, fieldState }) => {
                    return (
                      <div className="flex-1">
                        <Input
                          {...field}
                          {...(fieldState.error
                            ? { appearance: 'invalid' }
                            : {})}
                          type="number"
                          className="min-w-0"
                        />
                      </div>
                    )
                  }}
                />
                {rewardFields.length > 1 && (
                  <button
                    type="button"
                    className={button({ appearance: 'text', size: 'icon' })}
                    onClick={() => remove(index)}
                  >
                    <Icon className="w-4 h-4" icon="mingcute:delete-fill" />
                  </button>
                )}
              </div>
            )
          })}
          {rewardFields.length < rewardOptions.length && (
            <button
              type="button"
              onClick={() => append({ type: '', value: 0 })}
              className={button({ appearance: 'tertiary', size: 'sm' })}
            >
              <Icon className="w-4 h-4" icon="heroicons:plus-20-solid" />
              <div>Add more</div>
            </button>
          )}
        </div>
        <Field
          name="rewards_tokens_nfts"
          control={control}
          valueProps="checked"
        >
          <Switch label="Rewards - tokens & nfts" />
        </Field>
      </form>
    )
  },
)
