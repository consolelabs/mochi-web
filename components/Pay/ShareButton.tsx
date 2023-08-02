import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'

export default function ShareButton({ link }: { link: string }) {
  const { onCopy } = useClipboard(link)
  return (
    <button
      type="button"
      className={button({
        size: 'sm',
        className: 'flex-1',
      })}
      onClick={() => {
        const shareData = { url: link }
        if (navigator.share && navigator.canShare(shareData)) {
          navigator.share(shareData)
        } else {
          // Copy link if can't share
          onCopy()
          alert('Link Copied')
        }
      }}
    >
      <Icon
        icon="mingcute:share-forward-fill"
        className="w-4 h-4 text-dashboard-gray-4"
      />
      <div className="whitespace-nowrap">Share</div>
    </button>
  )
}
