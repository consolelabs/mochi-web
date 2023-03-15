import { useClipboard } from '@dwarvesf/react-hooks'
import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'

export default function CopyLink({ link }: { link: string }) {
  const { hasCopied, onCopy } = useClipboard(link)

  return (
    <button
      className={button({
        size: 'sm',
        className: '!py-2 !px-0 !shadow-none font-semibold',
      })}
      onClick={onCopy}
    >
      <Icon
        icon={hasCopied ? 'mdi:success' : 'mingcute:copy-2-fill'}
        className="text-dashboard-gray-4"
      />
      <div>{hasCopied ? 'Copied' : 'Copy Link'}</div>
    </button>
  )
}
