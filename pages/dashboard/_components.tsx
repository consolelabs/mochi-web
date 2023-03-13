import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'
import { label } from '~components/Dashboard/Form/styles'
import { heading } from '~components/Dashboard/Heading'
import { FileInput, Input } from '~components/Dashboard/Input'
import { Menu } from '~components/Dashboard/Menu'
import { RadioGroup } from '~components/Dashboard/Radio'
import { Select } from '~components/Dashboard/Select'
import { Switch } from '~components/Dashboard/Switch'
import { IconDiscord } from '~components/icons/components/IconDiscord'
import { DiscordIcon } from '~components/icons/discord'

export default function Default() {
  return (
    <div className="max-w-7xl px-12 py-24 mx-auto">
      <div className="flex flex-col w-full space-y-8">
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
          <div className="flex flex-wrap gap-2">
            <button className={button({ appearance: 'primary' })}>Base</button>
            <button className={button({ appearance: 'primary', size: 'sm' })}>
              Small
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className={button({ appearance: 'primary', size: 'icon' })}>
              <IconDiscord />
            </button>
            <button
              className={button({
                appearance: 'secondary',
                size: 'icon',
              })}
            >
              <IconDiscord />
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Input</h2>
          <div>
            <label className={label()}>Default</label>
            <Input />
          </div>
          <div>
            <label className={label()}>Invalid</label>
            <Input appearance="invalid" />
          </div>
          <div>
            <label className={label()}>Prefix</label>
            <Input value="random-url" prefix="mochi.gg/" />
          </div>
          <div>
            <label className={label()}>Suffix</label>
            <Input suffix="times" suffixProps={{ appearance: 'bgless' }} />
          </div>
          <div>
            <label className={label()}>Number</label>
            <Input
              suffix="times"
              suffixProps={{ appearance: 'bgless' }}
              type="number"
            />
          </div>
          <div>
            <label className={label()}>Date</label>
            <Input type="datetime-local" />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Select</h2>
          <div>
            <label className={label()}>Default</label>
            <Select
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
          </div>
          <div>
            <label htmlFor="invalid" className={label()}>
              Invalid
            </label>
            <Select
              appearance="invalid"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
              value="1"
            />
          </div>
          <div>
            <label className={label()}>Custom Option Render</label>
            <Select
              value="2"
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
              renderOption={(option) => {
                return (
                  <div className="flex gap-2 items-center">
                    <DiscordIcon className="w-4 h-4" />
                    <span>{option.label}</span>
                  </div>
                )
              }}
            />
          </div>
          <div>
            <label className={label()}>Searchable</label>
            <Select
              searchable
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
          </div>
          <div>
            <label className={label()}>Multiple</label>
            <Select
              value={['1', '2']}
              searchable
              multiple
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Radio Group</h2>
          <div>
            <label className={label()}>Default</label>
            <RadioGroup
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Switch</h2>
          <div>
            <label className={label()}>Default</label>
            <Switch />
          </div>
          <div>
            <label className={label()}>With Label</label>
            <Switch label="With Label" checked />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>File Input</h2>
          <div>
            <label className={label()}>Default</label>
            <FileInput />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className={heading({ size: 'sm' })}>Menu</h2>
          <div>
            <label className={label()}>Default</label>
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
      </div>
    </div>
  )
}
