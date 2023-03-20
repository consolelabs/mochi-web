import { Icon } from '@iconify/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { button } from '~components/Dashboard/Button'
import Field from '~components/Dashboard/Form/Field'
import { FileInput, Input } from '~components/Dashboard/Input'

type FormValue = {
  adName: string
  startDate: string
  endDate: string
  image: any
  headline: string
  description: string
  landingUrl: string
  callToActionUrl: string
  discordPlacements: number
  telegramPlacements: number
  metaversePlacements: number
}

export function AdsForm() {
  const { back } = useRouter()
  const { handleSubmit, control } = useForm<FormValue>()

  const onSubmit = (values: FormValue) => {
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex h-full">
        <div className="w-2/5 pt-4 pb-8 md:pt-8 md:pb-12">
          <div className="flex flex-col gap-y-6 max-w-sm mx-auto">
            <h2>
              <div className="flex items-center gap-2">
                <button type="button" onClick={back}>
                  <Icon className="w-6 h-6" icon="heroicons:chevron-left" />
                </button>
                <div className="text-[22px] font-bold">Ad Name 1</div>
              </div>
            </h2>

            <Field
              name="adName"
              rules={{ required: 'required' }}
              label="Ad Name"
              control={control}
            >
              <Input placeholder="Enter the ads name" />
            </Field>

            <div className="flex flex-col gap-3">
              <Field
                name="startDate"
                rules={{ required: 'required' }}
                label="Start Date"
                control={control}
              >
                <Input placeholder="Enter the ads name" type="date" />
              </Field>
              <Field
                name="endDate"
                rules={{ required: 'required' }}
                label="End"
                control={control}
              >
                <Input placeholder="Enter the ads name" type="date" />
              </Field>
            </div>

            <div className="flex flex-col gap-y-4 max-w-[90%]">
              <Field
                name="image"
                rules={{ required: 'required' }}
                label="Upload your image"
                control={control}
              >
                <FileInput placeholder="Select a file" />
              </Field>
              <Field
                name="headline"
                rules={{ required: 'required' }}
                label="Headline"
                control={control}
              >
                <Input />
              </Field>
              <Field
                name="description"
                rules={{ required: 'required' }}
                label="Description"
                control={control}
              >
                <Input />
              </Field>
              <Field
                name="landingUrl"
                rules={{ required: 'required' }}
                label="Landing page to run ad"
                control={control}
              >
                <Input placeholder="Enter url" />
              </Field>
              <Field
                name="callToActionUrl"
                rules={{ required: 'required' }}
                label="Call-to-action url"
                control={control}
              >
                <Input />
              </Field>
            </div>

            <div className="mt-6 md:mt-12">
              <div className="flex justify-between">
                <button
                  className={button({
                    appearance: 'text',
                    size: 'sm',
                    className: 'md:px-[14px] md:py-[6px]',
                  })}
                >
                  Back
                </button>
                <div className="flex flex-row gap-x-1 md:gap-x-2">
                  <button
                    className={button({
                      appearance: 'gray',
                      size: 'sm',
                      className: 'md:px-[14px] md:py-[6px]',
                    })}
                  >
                    Cancel
                  </button>
                  <button
                    className={button({
                      appearance: 'secondary',
                      size: 'sm',
                      className: 'md:px-[14px] md:py-[6px]',
                    })}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 bg-dashboard-gray-6 h-full py-10 px-5">
          ads page
        </div>
      </div>
    </form>
  )
}
