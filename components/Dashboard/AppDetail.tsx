import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import Alert from '~components/alert'
import { API } from '~constants/api'
import { App } from '~pages/dashboard/home'
import { button } from './Button'

type Props = {
  app: App
  closeDrawer: () => void
  refresh: () => void
}

export default function AppDetail({ closeDrawer, refresh, app }: Props) {
  const [updated, setUpdated] = useState(false)
  const [keyReset, setKeyReset] = useState('')
  const { hasCopied, onCopy } = useClipboard(keyReset)

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
            src={`https://boring-avatars-api.vercel.app/api/avatar?name=${app.id}&variant=beam`}
            alt=""
            className="w-full h-full"
          />
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setUpdated(false)
          const formData = new FormData(e.target as HTMLFormElement)
          const name = formData.get('appName')
          API.MOCHI_PROFILE.put({ name }, `/applications/${app.id}`)
            .json(() => {
              setUpdated(true)
            })
            .then(refresh)
        }}
        className="flex flex-col flex-1 gap-y-3"
      >
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-medium text-gray-500">APP NAME</span>
          <input
            name="appName"
            defaultValue={app.name}
            required
            className="py-2 px-4 rounded-lg border border-gray-200 outline-none"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-medium text-gray-500">KEY</span>
          <div className="overflow-hidden relative rounded-lg border border-gray-200">
            <input
              value={keyReset || app.key || '*'.repeat(100)}
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
                  onClick={onCopy}
                  className={button({
                    appearance: 'text',
                    className: 'bg-white-pure',
                    size: 'xs',
                  })}
                >
                  {hasCopied ? 'Copied' : 'Copy'}
                </button>
              )}
              <button
                onClick={() => {
                  API.MOCHI_PROFILE.put(
                    { app_name: app.name },
                    `/applications/${app.id}/reset-key`,
                  ).json((r) => {
                    setKeyReset(r.private_key)
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
          <Alert title="New key generated" appearance="success">
            <span className="text-sm">
              The key has been reset, please make sure to remember new key as it
              will not be shown again
            </span>
          </Alert>
        ) : (
          <Alert title="API key" appearance="warn">
            <span className="text-sm">
              For security purposes the api key is only shown once (when you
              create an app or reset current key). If you lose or forget or your
              key got leaked, you will need to generate a new one.
            </span>
          </Alert>
        )}
        {updated && (
          <Alert title="Success" appearance="success">
            <span className="text-sm">
              All information of the app was updated
            </span>
          </Alert>
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
