import { Icon } from '@iconify/react'
import { button } from '~components/Dashboard/Button'

export default function SocialButton({
  discordLink,
  telegramLink,
  twitterLink,
  googleLink,
}: {
  discordLink: string
  telegramLink: string
  twitterLink: string
  googleLink: string
}) {
  const data = [
    {
      link: discordLink,
      icon: 'ic:baseline-discord',
      name: 'Discord',
    },
    {
      link: telegramLink,
      icon: 'ic:baseline-telegram',
      name: 'Telegram',
    },
    {
      link: twitterLink,
      icon: 'mdi:twitter',
      name: 'Twitter',
    },
    {
      link: googleLink,
      icon: 'mingcute:google-fill',
      name: 'Google',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {data.map((item) => (
        <a
          key={item.name}
          className={button({
            className: '!shadow-none font-semibold',
          })}
          href={item.link}
          target="_blank"
          rel="noreferrer"
        >
          <Icon icon={item.icon} />
          <div>{item.name}</div>
        </a>
      ))}
    </div>
  )
}
