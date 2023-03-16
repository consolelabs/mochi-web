import { Icon } from '@iconify/react'
import Link from 'next/link'
import { SOCIAL_LINKS } from '~constants'

export default function Footer() {
  return (
    <div className="p-4 md:p-6 flex flex-col md:flex-row gap-x-2 justify-center items-center text-sm text-dashboard-gray-4">
      <div>Mochi &#169; {new Date().getFullYear()}</div>
      <div className="flex flex-row gap-x-2">
        <Link href="/">Feature</Link>
        <Link href="/">Community</Link>
        <Link href="/">Support</Link>
        <Link href="/">Credibility</Link>
        <a href={SOCIAL_LINKS.TWITTER} target="_blank" rel="noreferrer">
          <Icon icon="mdi:twitter" className="w-4 h-4 text-gray-500" />
        </a>
        <a href={SOCIAL_LINKS.DISCORD} target="_blank" rel="noreferrer">
          <Icon icon="ic:baseline-discord" className="w-4 h-4 text-gray-500" />
        </a>
        <a href={SOCIAL_LINKS.GITBOOK} target="_blank" rel="noreferrer">
          <Icon icon="simple-icons:gitbook" className="w-4 h-4 text-gray-500" />
        </a>
      </div>
    </div>
  )
}
