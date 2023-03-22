import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'

export default function ShareButton({ link }: { link: string }) {
  return (
    <button
      type="button"
      className={button({
        size: 'sm',
        className: 'flex-1',
      })}
      onClick={() => navigator.share({ url: link }).catch(() => null)}
    >
      <Icon
        icon="mingcute:share-forward-fill"
        className="w-4 h-4 text-dashboard-gray-4"
      />
      <div className="whitespace-nowrap">Share</div>
    </button>
  )
}
