import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'

export default function ShareButton() {
  return (
    <button
      className={button({
        size: 'sm',
        className: '!py-2 !px-0 !shadow-none font-semibold',
      })}
    >
      <Icon
        icon="mingcute:share-forward-fill"
        className="text-dashboard-gray-4"
      />
      <div>Share</div>
    </button>
  )
}
