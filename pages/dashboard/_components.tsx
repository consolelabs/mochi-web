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
import { useHasMounted } from '@dwarvesf/react-hooks'
import { SEO } from '~app/layout/seo'
import { INVITE_LINK } from '~envs'
import { Tab } from '~components/Dashboard/Tab'
import { Transition } from '@headlessui/react'
import { Table } from '~components/Dashboard/Table'

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
  const mounted = useHasMounted()
  const { control, handleSubmit } = useForm()

  const onSubmit = (values: Record<string, any>) => {
    console.log(values)
  }

  if (!mounted) return null

  return (
    <div className="overflow-hidden py-24 px-12 mx-auto max-w-7xl">
      <SEO title="Components" description="" />
      <form
        className="flex flex-col space-y-32 w-full"
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
            <div className="max-w-xs bg-[#FFFFFF] rounded-lg py-4 flex flex-col gap-y-4">
              <a
                href={INVITE_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  boxShadow: '0px 4px 16px rgba(249, 164, 180, 0.8)',
                }}
                className={button({
                  appearance: 'mochi',
                  size: 'sm',
                  className: 'whitespace-nowrap mx-3',
                })}
              >
                <Icon icon="mingcute:discord-fill" width={16} />
                Add Bot
              </a>
              <Menu
                activeId="invite-friends"
                activeIdx={0}
                items={[
                  [
                    'Account',
                    [
                      {
                        id: 'profile',
                        icon: (
                          <Icon
                            icon="mingcute:user-3-fill"
                            className="w-5 h-5"
                          />
                        ),
                        text: 'My Profile',
                        onClick: () => {},
                      },
                      {
                        id: 'server-management',
                        icon: (
                          <Icon
                            icon="majesticons:settings-cog"
                            className="w-5 h-5"
                          />
                        ),
                        text: 'Server Management',
                        onClick: () => {},
                      },
                      {
                        id: 'settings',
                        icon: (
                          <Icon
                            icon="majesticons:settings-cog"
                            className="w-5 h-5"
                          />
                        ),
                        text: 'Settings',
                        onClick: () => {},
                      },
                    ],
                  ],
                  [
                    'Social',
                    [
                      {
                        id: 'invite-friends',
                        icon: (
                          <Icon
                            icon="mingcute:user-add-fill"
                            className="w-5 h-5"
                          />
                        ),
                        text: 'Invite Friends',
                        onClick: () => {},
                        subItems: [
                          {
                            text: 'Lorem',
                          },
                          {
                            text: 'Ipsum',
                          },
                        ],
                      },
                      {
                        id: 'feedback',
                        icon: <Icon icon="ph:star-fill" className="w-5 h-5" />,
                        text: 'Feedback',
                        onClick: () => {},
                      },
                    ],
                  ],
                  [
                    '',
                    [
                      {
                        id: 'logout',
                        icon: (
                          <Icon icon="majesticons:logout" className="w-5 h-5" />
                        ),
                        text: 'Logout',
                        onClick: () => {},
                      },
                    ],
                  ],
                ]}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Tabs</h2>
          <div>
            <label className={labelStyles()}>Default</label>
            <Tab headings={['Setup', 'Participate', 'Rewards']}>
              <Tab.Panel>
                {({ selected }) => {
                  return (
                    <Transition
                      appear
                      show={selected}
                      enter="transition-all duration-100 ease-in-out"
                      enterFrom="-translate-x-2 opacity-0"
                      enterTo="translate-x-0 opacity-100"
                      leave="transition-all duration-100 ease-in-out"
                      leaveFrom="translate-x-0 opacity-100"
                      leaveTo="translate-x-2 opacity-0"
                    >
                      Setup panel
                    </Transition>
                  )
                }}
              </Tab.Panel>
              <Tab.Panel>
                {({ selected }) => {
                  return (
                    <Transition
                      appear
                      show={selected}
                      enter="transition-all duration-100 ease-in-out"
                      enterFrom="-translate-x-2 opacity-0"
                      enterTo="translate-x-0 opacity-100"
                      leave="transition-all duration-100 ease-in-out"
                      leaveFrom="translate-x-0 opacity-100"
                      leaveTo="translate-x-2 opacity-0"
                    >
                      Participate panel
                    </Transition>
                  )
                }}
              </Tab.Panel>
              <Tab.Panel>
                {({ selected }) => {
                  return (
                    <Transition
                      appear
                      show={selected}
                      enter="transition-all duration-100 ease-in-out"
                      enterFrom="-translate-x-2 opacity-0"
                      enterTo="translate-x-0 opacity-100"
                      leave="transition-all duration-100 ease-in-out"
                      leaveFrom="translate-x-0 opacity-100"
                      leaveTo="translate-x-2 opacity-0"
                    >
                      Rewards panel
                    </Transition>
                  )
                }}
              </Tab.Panel>
            </Tab>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Tables</h2>
          <div>
            <div className={labelStyles()}>Default</div>
            <Table
              data={[
                { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
                { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
              ]}
              columns={[
                {
                  accessor: 'a',
                  title: 'Column A',
                  width: 400,
                  tdClassName: 'font-bold',
                },
                { accessor: 'b', title: 'Column B' },
                { accessor: 'c', title: 'Column C' },
                {
                  accessor: 'd',
                  title: 'Column D',
                  thClassName: 'text-right',
                  tdClassName: 'flex justify-end',
                  render: () => <Switch />,
                },
              ]}
              theadClassName="text-xs uppercase text-dashboard-gray-2 font-bold mb-2"
              trBodyClassName="p-4 bg-[#FFFFFF] rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
            />
          </div>
          <div>
            <div className={labelStyles()}>Buttons Appear On Hover</div>
            <div className="bg-[#FFFFFF] p-4">
              <div className="flex items-center px-4 mb-4">
                <Icon
                  className="w-6 h-6"
                  icon="heroicons:magnifying-glass-20-solid"
                />
                <Input
                  className="!border-none"
                  placeholder="Search..."
                  allowClear
                />
              </div>
              <Table
                data={[
                  { a: 'Lorem Ipsum', b: 1234, c: '#', d: 'Actions' },
                  { a: 'Lorem Ipsum', b: 5678, c: '#', d: 'Actions' },
                ]}
                columns={[
                  {
                    accessor: 'a',
                    title: 'Column A',
                    width: 400,
                    tdClassName: 'font-bold',
                  },
                  { accessor: 'b', title: 'Column B' },
                  { accessor: 'c', title: 'Column C' },
                  {
                    accessor: 'd',
                    title: 'Column D',
                    thClassName: 'text-right',
                    tdClassName: 'flex justify-end h-full',
                    render: (value) => (
                      <div className="flex gap-2 items-center h-full transition translate-x-1/2 group-hover:translate-x-0">
                        <span className="w-1/2">{value}</span>
                        <button
                          type="button"
                          className="flex gap-2 items-center p-2 w-1/2 h-full bg-black/10"
                        >
                          <Icon
                            className="flex-shrink-0 w-4 h-4"
                            icon="heroicons:star"
                          />
                          <span className="font-bold leading-tight text-[8px]">
                            Add To Wishlist
                          </span>
                        </button>
                      </div>
                    ),
                  },
                ]}
                theadClassName="hidden"
                trBodyClassName="pl-4 h-[52px] hover:bg-dashboard-gray-1 rounded-lg text-sm mb-2 transition items-center overflow-hidden group"
              />
            </div>
          </div>
          <div>
            <div className={labelStyles()}>Table Groups</div>
            <div className="overflow-auto">
              <div className="inline-block px-4 mb-2 min-w-full text-xs font-bold uppercase thead text-dashboard-gray-2">
                <div className="flex trHead">
                  <div
                    className="th"
                    style={{ flex: '1 1 400px', minWidth: 150 }}
                  >
                    Column A
                  </div>
                  <div
                    className="th"
                    style={{ flex: '1 1 150px', minWidth: 150 }}
                  >
                    Column B
                  </div>
                  <div
                    className="th"
                    style={{ flex: '1 1 150px', minWidth: 150 }}
                  >
                    Column C
                  </div>
                  <div
                    className="text-right th"
                    style={{ flex: '1 1 150px', minWidth: 150 }}
                  >
                    Column D
                  </div>
                </div>
              </div>
              <div className="inline-block p-4 mb-4 min-w-full rounded-lg bg-dashboard-gray-1">
                <div className="mb-4 text-xl font-bold">Group 1</div>
                <Table
                  data={[
                    { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
                    { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
                  ]}
                  columns={[
                    {
                      accessor: 'a',
                      title: 'Column A',
                      width: 400,
                      tdClassName: 'font-bold',
                    },
                    { accessor: 'b', title: 'Column B' },
                    { accessor: 'c', title: 'Column C' },
                    {
                      accessor: 'd',
                      title: 'Column D',
                      thClassName: 'text-right',
                      tdClassName: 'flex justify-end',
                      render: () => <Switch />,
                    },
                  ]}
                  tableClassName="!overflow-visible"
                  theadClassName="hidden"
                  trBodyClassName="p-4 bg-[#FFFFFF] rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
                />
              </div>
              <div className="inline-block p-4 min-w-full rounded-lg bg-dashboard-gray-1">
                <div className="mb-4 text-xl font-bold">Group 2</div>
                <Table
                  data={[
                    { a: 'Lorem Ipsum', b: 1234, c: '#', d: '' },
                    { a: 'Lorem Ipsum', b: 5678, c: '#', d: '' },
                  ]}
                  columns={[
                    {
                      accessor: 'a',
                      title: 'Column A',
                      width: 400,
                      tdClassName: 'font-bold',
                    },
                    { accessor: 'b', title: 'Column B' },
                    { accessor: 'c', title: 'Column C' },
                    {
                      accessor: 'd',
                      title: 'Column D',
                      thClassName: 'text-right',
                      tdClassName: 'flex justify-end',
                      render: () => <Switch />,
                    },
                  ]}
                  tableClassName="!overflow-visible"
                  theadClassName="hidden"
                  trBodyClassName="p-4 bg-[#FFFFFF] rounded-lg border border-[#FFFFFF] hover:shadow hover:border-dashboard-gray-1 text-sm mb-2 transition"
                />
              </div>
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