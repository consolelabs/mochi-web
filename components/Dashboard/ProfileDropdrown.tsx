import { Popover } from '~components/Popover'
import { Icon } from '@iconify/react'
import { useAuthStore, useProfileStore } from '~store'
import { shallow } from 'zustand/shallow'

export default function ProfileDropdown() {
  const { logout } = useAuthStore()
  const { name } = useProfileStore(
    (s) => ({
      id: s.me?.id,
      name: s.me?.profile_name,
      avatar: s.me?.avatar,
    }),
    shallow,
  )

  return (
    <Popover
      trigger={
        <div className="flex justify-center items-center w-8 h-8 rounded-full border border-gray-300">
          <Icon
            icon="heroicons-outline:user"
            className="w-5 h-5 text-gray-500"
          />
        </div>
      }
    >
      <div className="flex flex-col px-2 rounded-xl border border-gray-200 w-[250px] bg-white-pure">
        <div className="flex flex-col px-3 pt-4">
          <span className="text-sm text-gray-500">Logged in as</span>
          <span>{name}</span>
        </div>
        <hr className="my-3 w-full h-px bg-gray-200" />
        <a href="#" className="flex justify-between px-3 pb-2">
          <span className="text-sm">Docs</span>
          <Icon icon="eva:diagonal-arrow-right-up-fill" className="w-4 h-4" />
        </a>
        <a href="#" className="flex justify-between px-3 pt-2">
          <span className="text-sm">Mochi Web</span>
          <Icon icon="eva:diagonal-arrow-right-up-fill" className="w-4 h-4" />
        </a>
        <hr className="my-3 w-full h-px bg-gray-200" />
        <button
          type="button"
          onClick={logout}
          className="self-start px-3 pb-4 text-sm text-red-400"
        >
          Log Out
        </button>
      </div>
    </Popover>
  )
}
