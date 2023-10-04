import { useEffect, useRef, useState } from 'react'
import Dialog from '~components/Dialog'
import { API } from '~constants/api'
import { button } from './Button'

type Props = {
  onClose: () => void
  onCreated: (a: any) => void
}

export default function NewAppForm({ onCreated, onClose }: Props) {
  const [err, setErr] = useState('')
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    input.current?.focus()
  }, [])

  return (
    <Dialog close={onClose} title="Create an application">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.target as HTMLFormElement)
          const appName = formData.get('appName')
          API.MOCHI_PROFILE.post({ app_name: appName }, '/applications')
            .badRequest((e) => {
              const err = JSON.parse(e.message)
              setErr(err.msg)
            })
            .json((r) => {
              onClose()
              onCreated(r)
            })
        }}
        className="flex flex-col"
      >
        <div className="flex flex-col gap-y-1">
          <span className="text-xs font-medium text-gray-500">NAME</span>
          <input
            ref={input}
            required
            name="appName"
            className="py-2 px-4 rounded-lg border border-gray-200 outline-none"
          />
        </div>
        {err && <span className="mt-1 text-sm text-red-500">{err}</span>}
        <div className="flex gap-2 justify-end mt-7">
          <button
            type="button"
            onClick={onClose}
            className={button({ appearance: 'text', size: 'sm' })}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={button({ appearance: 'secondary', size: 'sm' })}
          >
            Create
          </button>
        </div>
      </form>
    </Dialog>
  )
}
