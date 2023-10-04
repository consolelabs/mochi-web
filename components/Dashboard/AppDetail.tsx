import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { API } from '~constants/api'
import { button } from './Button'

type Props = {
  id: string
  name: string
  newName: string
  key: string
  closeDrawer: () => void
}

export default function AppDetail({
  id,
  newName,
  name,
  closeDrawer,
  key,
}: Props) {
  const [updated, setUpdated] = useState(false)
  const [keyReset, setKeyReset] = useState(false)

  return (
    <div className="flex flex-col gap-y-3 py-3 px-4 h-full rounded-lg w-[530px] bg-white-pure">
      <button
        type="button"
        onClick={closeDrawer}
        className="w-8 h-8 p-1 bg-[#faf9f7] rounded-lg"
      >
        <Icon icon="ic:round-chevron-left" className="w-full h-full" />
      </button>
      <div className="flex flex-col gap-y-1">
        <span className="text-lg font-medium">App details</span>
        <span className="text-sm text-gray-500">
          General information about your creation, such as name, icon app, and
          amazing things to build it.
        </span>
      </div>
      <div className="flex justify-center py-5">
        <div className="w-24 h-24">
          <img
            src={`https://boring-avatars-api.vercel.app/api/avatar?name=${id}&variant=beam`}
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const name = formData.get('appName')
          API.MOCHI_PROFILE.put({ name }, `/applications/${id}`).json(() => {
            setUpdated(true)
          })
        }}
        className="flex flex-col flex-1 gap-y-3"
      >
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-medium text-gray-500">APP NAME</span>
          <input
            name="appName"
            defaultValue={newName}
            required
            className="py-2 px-4 rounded-lg border border-gray-200 outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-medium text-gray-500">KEY</span>
          <div className="overflow-hidden relative rounded-lg border border-gray-200">
            <input
              value={key ? key : '*'.repeat(100)}
              disabled
              className="py-2 px-4 w-full bg-transparent outline-none"
            />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l to-transparent pointer-events-none from-white-pure">
              &nbsp;
            </div>
            <div className="flex absolute right-2 top-1/2 gap-x-2 -translate-y-1/2">
              {keyReset && (
                <button
                  type="button"
                  className={button({
                    appearance: 'text',
                    className: 'bg-white-pure',
                    size: 'xs',
                  })}
                >
                  Copy
                </button>
              )}
              <button
                onClick={() => {
                  API.MOCHI_PROFILE.put(
                    { app_name: name },
                    `/applications/${id}/reset-key`,
                  ).json((r) => {
                    console.log(r)
                    setKeyReset(true)
                  })
                }}
                type="button"
                className={button({
                  appearance: 'text',
                  className: 'bg-white-pure',
                  size: 'xs',
                })}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        {keyReset ? (
          <span className="text-sm">
            The key has been reset, please make sure to remember new key as it
            will not be shown again
          </span>
        ) : (
          <span className="text-sm">
            The key can only be seen once, for security purposes. If you lose or
            forget your key, you will need to generate a new one.
          </span>
        )}
        {updated && (
          <div className="flex items-center">
            <Icon icon="ic:round-check" className="text-green-500" />
            <span className="text-sm text-green-500">Your app was updated</span>
          </div>
        )}
        <div className="flex justify-between mt-auto">
          <button
            className={button({
              appearance: 'text',
              size: 'sm',
              className: 'text-red-400',
            })}
          >
            Delete app
          </button>
          <button
            className={button({
              appearance: 'secondary',
              size: 'sm',
            })}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}
