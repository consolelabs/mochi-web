import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { button } from '~components/Dashboard/Button'
import Field from '~components/Dashboard/Form/Field'
import { FileInput, Input } from '~components/Dashboard/Input'
import { RadioGroup } from '~components/Dashboard/Radio'
import Image from 'next/image'
import { isAfter } from 'date-fns'

type FormValue = {
  adName: string
  startDate: string
  endDate: string
  image: any
  headline: string
  description: string
  landingUrl: string
  callToActionUrl: string
  discordPlacement: string
  telegramPlacement: string
  metaversePlacement: string
}

const renderCustomRadioGroup = ({
  options,
  optionClassName,
}: {
  options: Record<string, any>[]
  optionClassName: string
}) => {
  return (
    <RadioGroup
      options={options.map(({ label, value }) => ({
        label,
        value,
      }))}
      radioGroupClassName="flex flex-row justify-between"
      renderOption={(option, selectedValue) => {
        return (
          <div
            className={clsx(
              'flex flex-col w-fit p-[10px] gap-y-[10px] rounded-lg border-solid border-[3px] cursor-pointer',
              {
                'border-mochi': selectedValue && option.value === selectedValue,
                'border-transparent':
                  !selectedValue || option.value !== selectedValue,
              },
            )}
          >
            <div className={optionClassName}>
              {option.value && (
                <Image
                  fill
                  className="object-contain"
                  alt={option.value}
                  src={
                    options.find((item) => item.value === option.value)?.src ||
                    ''
                  }
                />
              )}
            </div>
            {!!option.label && <div className="text-sm">{option.label}</div>}
          </div>
        )
      }}
    />
  )
}

export function AdsForm() {
  const { back } = useRouter()
  const { handleSubmit, control, watch } = useForm<FormValue>()

  const startDate = watch('startDate')

  const onSubmit = (values: FormValue) => {
    console.log(values)
  }

  const discordOptions = [
    {
      src: '/assets/ads/discord-1546x423.png',
      label: '1546 x 423',
      value: '1',
    },
    {
      src: '/assets/ads/512x512.png',
      label: '512 x 512',
      value: '2',
    },
    {
      src: '/assets/ads/no-img.png',
      label: 'No image',
      value: '3',
    },
  ]

  const telegramOptions = [
    {
      src: '/assets/ads/tele-1546x423.png',
      label: '1546 x 423',
      value: '1',
    },
    {
      src: '/assets/ads/512x512.png',
      label: '512 x 512',
      value: '2',
    },
    {
      src: '/assets/ads/no-img.png',
      label: 'No image',
      value: '3',
    },
  ]

  const metaverseOptions = [
    {
      src: '/assets/ads/big-ad.png',
      label: '1546 x 423',
      value: '1',
    },
    {
      src: '/assets/ads/small-ad.png',
      label: '512 x 512',
      value: '2',
    },
    {
      src: '',
      label: '',
      value: '',
    },
  ]

  return (
    <form className="h-full w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex h-full">
        <div className="w-full h-full md:w-2/5 pt-4 pb-8 md:pt-8 md:pb-12">
          <div className="h-full flex flex-col gap-y-6 max-w-sm mx-auto">
            <h2>
              <div className="flex items-center gap-2">
                <button type="button" onClick={back}>
                  <Icon className="w-6 h-6" icon="heroicons:chevron-left" />
                </button>
                <div className="display text-[22px] font-bold">
                  Create new Ad
                </div>
              </div>
            </h2>

            <Field
              name="adName"
              rules={{ required: 'Required' }}
              label="Ad Name"
              control={control}
            >
              <Input
                placeholder="Enter the ads name"
                className="bg-dashboard-gray-5"
              />
            </Field>

            <div className="flex flex-col gap-3">
              <Field
                name="startDate"
                rules={{
                  required: 'Required',
                }}
                label="Start Date"
                control={control}
              >
                <Input type="date" className="bg-dashboard-gray-5" />
              </Field>
              <Field
                name="endDate"
                rules={{
                  required: 'Required',
                  validate: (value) =>
                    isAfter(new Date(value), new Date(startDate)) ||
                    'End date must be after start date',
                }}
                label="End"
                control={control}
              >
                <Input type="date" className="bg-dashboard-gray-5" />
              </Field>
            </div>

            <div className="flex flex-col gap-y-4">
              <Field name="image" label="Upload your image" control={control}>
                <FileInput
                  placeholder="Select a file"
                  className="bg-dashboard-gray-5"
                />
              </Field>
              <Field name="headline" label="Headline" control={control}>
                <Input className="bg-dashboard-gray-5" />
              </Field>
              <Field name="description" label="Description" control={control}>
                <Input className="bg-dashboard-gray-5" />
              </Field>
              <Field
                name="landingUrl"
                label="Landing page to run ad"
                control={control}
              >
                <Input
                  placeholder="Enter url"
                  className="bg-dashboard-gray-5"
                />
              </Field>
              <Field
                name="callToActionUrl"
                label="Call-to-action url"
                control={control}
              >
                <Input className="bg-dashboard-gray-5" />
              </Field>
            </div>

            <div className="mt-6 md:mt-auto">
              <div className="flex justify-between">
                <button
                  className={button({
                    appearance: 'text',
                    size: 'sm',
                    className: 'md:px-3.5 md:py-2',
                  })}
                  onClick={back}
                >
                  Back
                </button>
                <div className="flex flex-row gap-x-1 md:gap-x-2">
                  <button
                    className={button({
                      appearance: 'gray',
                      size: 'sm',
                      className: 'md:px-3.5 md:py-2',
                    })}
                    onClick={back}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={button({
                      appearance: 'secondary',
                      size: 'sm',
                      className: 'md:px-3.5 md:py-2',
                    })}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:w-3/5 bg-dashboard-gray-6 h-full pt-4 pb-10 px-5 flex-col md:gap-y-8">
          <div className="font-semibold text-foreground">Placements</div>
          {/* Discord section */}
          <div>
            <Field
              name="discordPlacement"
              control={control}
              label="In Discord"
              labelProps={{
                className: 'text-dashboard-gray-8 font-semibold text-sm mb-2',
              }}
            >
              {renderCustomRadioGroup({
                options: discordOptions,
                optionClassName: 'h-44 w-[212px] relative',
              })}
            </Field>
          </div>

          {/* Telegram section */}
          <div>
            <Field
              name="telegramPlacement"
              control={control}
              label="In Telegram"
              labelProps={{
                className: 'text-dashboard-gray-8 font-semibold text-sm mb-2',
              }}
            >
              {renderCustomRadioGroup({
                options: telegramOptions,
                optionClassName: 'h-[212px] w-[212px] relative',
              })}
            </Field>
          </div>

          {/* Metaverse section */}
          <div>
            <Field
              name="metaversePlacement"
              control={control}
              label="In Metaverse"
              labelProps={{
                className: 'text-dashboard-gray-8 font-semibold text-sm mb-2',
              }}
            >
              {renderCustomRadioGroup({
                options: metaverseOptions,
                optionClassName: 'h-[136px] w-[212px] relative',
              })}
            </Field>
          </div>
        </div>
      </div>
    </form>
  )
}
