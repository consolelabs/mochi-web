import { useClipboard, useDisclosure } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { ReactElement, useState } from 'react'
import Alert from '~components/alert'
import AuthenticatedLayout from '~components/auth-layout'
import { button } from '~components/button'
import { API } from '~constants/api'
import { NextPageWithLayout } from '~pages/_app'
import { boringAvatar } from '~utils/string'

type Props = {
  id: string
  name: string
  key: string
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { id } = ctx.params ?? {}
  if (!id)
    return {
      notFound: true,
    }

  const g = await API.MOCHI_PROFILE.get(`/applications/${id}`).json((r) => r)

  if (!g)
    return {
      notFound: true,
    }

  return {
    props: { id: id as string, name: g.name, key: '' },
  }
}

function Home({ id, key, name }: Props) {
  const [newKey, setNewKey] = useState('')
  const { onCopy, hasCopied } = useClipboard(newKey)
  const {
    isOpen: isUpdated,
    onOpen: setUpdated,
    onClose: setUnupdated,
  } = useDisclosure()

  return (
    <div className="flex gap-x-5 mx-auto max-w-3xl">
      <div className="">
        <img className="w-28 h-28 rounded-full" src={boringAvatar(id)} alt="" />
      </div>
      <div className="flex flex-col flex-1 gap-y-5 py-3 px-4 pb-4 bg-white rounded-lg border border-gray-200 shadow">
        <div className="flex flex-col gap-y-1">
          <Link
            href="/profile"
            className="flex items-center text-sm hover:underline"
          >
            <Icon icon="ic:round-chevron-left" className="w-5 h-5" />
            Back
          </Link>
          <span className="mt-3 text-lg font-medium">App details</span>
          <span className="text-sm text-gray-500">
            General information about your creation, such as name, icon app, and
            amazing things to build it.
          </span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setUnupdated()
            const formData = new FormData(e.target as HTMLFormElement)
            const name = formData.get('appName')
            API.MOCHI_PROFILE.put({ name }, `/applications/${id}`).json(() => {
              setUpdated()
            })
          }}
          className="flex flex-col flex-1 gap-y-5"
        >
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-medium text-gray-500">APP NAME</span>
            <input
              name="appName"
              defaultValue={name}
              required
              className="py-2 px-4 rounded-lg border border-gray-200 outline-none"
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <span className="text-xs font-medium text-gray-500">KEY</span>
            <div className="overflow-hidden relative rounded-lg border border-gray-200">
              <input
                value={newKey || key || '*'.repeat(100)}
                disabled
                className="py-2 px-4 w-full bg-transparent outline-none"
              />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l to-transparent pointer-events-none from-white-pure">
                &nbsp;
              </div>
              <div className="flex absolute right-2 top-1/2 gap-x-2 -translate-y-1/2">
                {newKey && (
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
                      { app_name: name },
                      `/applications/${id}/reset-key`,
                    ).json((r) => {
                      setNewKey(r.private_key)
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
          {newKey ? (
            <Alert title="New key generated" appearance="success">
              <span className="text-sm">
                The key has been reset, please make sure to remember new key as
                it will not be shown again
              </span>
            </Alert>
          ) : (
            <Alert title="API key" appearance="warn">
              <span className="text-sm">
                For security purposes the api key is only shown once (when you
                create an app or reset current key). If you lose or forget or
                your key got leaked, you will need to generate a new one.
              </span>
            </Alert>
          )}
          {isUpdated && (
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
    </div>
  )
}

const App: NextPageWithLayout<Props> = (props) => {
  return <Home {...props} />
}

App.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticatedLayout>{page}</AuthenticatedLayout>
}

export default App
