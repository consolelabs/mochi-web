import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import { label as labelStyles } from '~components/Dashboard/Form/styles'
import { heading } from '~components/Dashboard/Heading'
import { FileInput, Input } from '~components/Dashboard/Input'
import { Menu } from '~components/Dashboard/Menu'
import { RadioGroup } from '~components/Dashboard/Radio'
import { Select } from '~components/Dashboard/Select'
import { Switch } from '~components/Dashboard/Switch'
import { Controller, ControllerProps, useForm } from 'react-hook-form'

const Field = ({
  label,
  render,
  ...rest
}: { label?: string } & ControllerProps) => {
  return (
    <div>
      {label && <label className={labelStyles()}>Default</label>}
      <Controller
        {...rest}
        render={({ field, fieldState, ...renderRest }) => {
          return (
            <>
              {render({
                field: {
                  ...field,
                  ...(fieldState.error ? { appearance: 'invalid' } : {}),
                },
                fieldState,
                ...renderRest,
              })}
              {fieldState.error && (
                <div className="mt-1 text-xs text-mochi-500">
                  {fieldState.error.message}
                </div>
              )}
            </>
          )
        }}
      />
    </div>
  )
}

export default function Default() {
  const { control, handleSubmit } = useForm()

  const onSubmit = (values: Record<string, any>) => {
    console.log(values)
  }

  return (
    <div className="py-24 px-12 mx-auto max-w-7xl">
      <form
        className="flex flex-col space-y-8 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Button</h2>
          <div className="flex flex-wrap gap-2">
            <button className={button({ appearance: 'primary' })}>
              Primary
            </button>
            <button className={button({ appearance: 'secondary' })}>
              Secondary
            </button>
            <button className={button({ appearance: 'mochi' })}>Mochi</button>
            <button className={button({ appearance: 'text' })}>Text</button>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button className={button({ appearance: 'primary' })}>Base</button>
            <button className={button({ appearance: 'primary', size: 'sm' })}>
              Small
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className={button({ appearance: 'primary', size: 'icon' })}>
              <Icon icon="ic:baseline-discord" />
            </button>
            <button
              className={button({
                appearance: 'secondary',
                size: 'icon',
              })}
            >
              <Icon icon="ic:baseline-discord" />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Input</h2>
          <Field
            name="input-default"
            label="Default"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return <Input {...field} {...fieldState} />
            }}
          />
          <Field
            name="input-prefix"
            label="Prefix"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return <Input {...field} {...fieldState} prefix="mochi.gg/" />
            }}
          />
          <Field
            name="input-suffix"
            label="Suffix"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <Input
                  {...field}
                  {...fieldState}
                  suffix="times"
                  suffixProps={{ appearance: 'bgless' }}
                />
              )
            }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Select</h2>
          <Field
            name="select-default"
            label="Default"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <Select
                  {...field}
                  {...fieldState}
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                  ]}
                />
              )
            }}
          />
          <Field
            name="select-custom"
            label="Custom Option Render"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <Select
                  {...field}
                  {...fieldState}
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                  ]}
                  renderOption={(option) => {
                    return (
                      <div className="flex gap-2 items-center">
                        <Icon icon="ic:baseline-discord" className="w-4 h-4" />
                        <span>{option.label}</span>
                      </div>
                    )
                  }}
                />
              )
            }}
          />
          <Field
            name="select-searchable"
            label="Searchable"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <Select
                  {...field}
                  {...fieldState}
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                  ]}
                  searchable
                />
              )
            }}
          />
          <Field
            name="select-multiple"
            label="Multiple"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <Select
                  {...field}
                  {...fieldState}
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                  ]}
                  searchable
                  multiple
                />
              )
            }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Radio Group</h2>
          <Field
            name="radio-group-default"
            label="Default"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <RadioGroup
                  {...field}
                  {...fieldState}
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                  ]}
                />
              )
            }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Switch</h2>
          <Field
            name="switch-default"
            label="Default"
            control={control}
            render={({ field, fieldState }) => {
              return <Switch {...field} {...fieldState} checked={field.value} />
            }}
          />
          <Field
            name="switch-with-label"
            label="With Label"
            control={control}
            render={({ field, fieldState }) => {
              return (
                <Switch
                  {...field}
                  {...fieldState}
                  label="With Label"
                  checked={field.value}
                />
              )
            }}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>File Input</h2>
          <Field
            name="file-input-default"
            label="Default"
            control={control}
            rules={{
              required: 'Required',
            }}
            render={({ field, fieldState }) => {
              return (
                <FileInput
                  {...field}
                  {...fieldState}
                  onChange={(e) => field.onChange(e.target.files)}
                />
              )
            }}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Menu</h2>
          <div>
            <label className={labelStyles()}>Default</label>
            <div className="max-w-xl bg-[#FFFFFF] rounded-lg py-4">
              <Menu
                items={[
                  [
                    {
                      icon: <Icon icon="mingcute:user-3-fill" />,
                      text: 'My Profile',
                      onClick: () => {},
                    },
                    {
                      icon: <Icon icon="majesticons:settings-cog" />,
                      text: 'Server Management',
                      onClick: () => {},
                    },
                    {
                      icon: <Icon icon="majesticons:settings-cog" />,
                      text: 'Settings',
                      onClick: () => {},
                    },
                  ],
                  [
                    {
                      icon: <Icon icon="mingcute:user-add-fill" />,
                      text: 'Invite Friends',
                      onClick: () => {},
                    },
                    {
                      icon: <Icon icon="ph:star-fill" />,
                      text: 'Feedback',
                      onClick: () => {},
                    },
                  ],
                  [
                    {
                      icon: <Icon icon="majesticons:logout" />,
                      text: 'Logout',
                      onClick: () => {},
                    },
                  ],
                ]}
              />
            </div>
          </div>
        </div>
        <button type="submit" className={button({ appearance: 'primary' })}>
          Submit
        </button>
      </form>
    </div>
  )
}
