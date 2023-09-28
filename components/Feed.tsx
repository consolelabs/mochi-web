import { Icon } from '@iconify/react'
import Image from 'next/image'

export default function Feed() {
  return (
    <div className="flex relative justify-start items-center py-7 px-8 bg-white md:py-14 md:px-16 max-h-[400px]">
      <div className="flex relative flex-col h-full">
        <div className="flex gap-x-2 items-center">
          <Icon
            icon="octicon:feed-star-16"
            className="w-5 h-5 text-yellow-500"
          />
          <p className="text-2xl">Recent transactions</p>
        </div>
        <ul className="flex overflow-hidden relative flex-col gap-y-2 py-3 px-1 w-full h-full">
          {[
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/1007247521468403744.png?size=240&quality=lossless',
                symbol: 'BUTTTT',
              },
              amount: '1',
              from: '👾 vincent.console',
              to: '👾 minh_cloud',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/1049620715374133288.png?size=240&quality=lossless',
                symbol: 'ICY',
              },
              amount: '2',
              from: '👾 0xm',
              to: '👾 trkhoi',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/1049620715374133288.png?size=240&quality=lossless',
                symbol: 'ICY',
              },
              amount: '5',
              from: '👾 vitran',
              to: '👾 thanh',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/1093923016691421205.png?size=240&quality=lossless',
                symbol: 'KEKK',
              },
              amount: '10',
              from: '🔌 app:Mochi',
              to: '🔹 tg:cuang00',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
            {
              token: {
                icon: 'https://cdn.discordapp.com/emojis/967285237686108212.png?size=240&quality=lossless',
                symbol: 'FTM',
              },
              amount: '0.01',
              from: '👾 minh_cloud',
              to: '📩 minh@console.so',
            },
          ].map((txn, i) => {
            return (
              <li
                key={`${txn.from} to ${txn.to} ${txn.amount} ${txn.token} ${i}`}
                className="flex items-center"
              >
                <a
                  href="#"
                  target="_blank"
                  className="p-0.5 font-mono text-sm underline rounded opacity-80 hover:opacity-90"
                >
                  df86a
                </a>
                <span className="mr-1 ml-0.5">/</span>
                <span className="flex text-sm font-medium whitespace-normal sm:text-base font-text">
                  {txn.from} sent{' '}
                  <Image
                    width={16}
                    height={16}
                    className="object-contain mx-1 mt-1 rounded-full max-h-[16px]"
                    src={txn.token.icon}
                    alt=""
                  />{' '}
                  {txn.amount} {txn.token.symbol} to {txn.to}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="pointer-events-none bg-gradient-to-t from-white-pure to-transparent absolute left-0 right-0 bottom-0 h-[50%]">
        &nbsp;
      </div>
    </div>
  )
}
