import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useIsVisible } from '~hooks/useIsVisible'

const DATA = [
  {
    sender: 'edwards',
    receiver: 'elenor',
    command: 'tip',
    message: '200 USDT happpieee 1-month baby 💕️',
  },
  {
    sender: 'jenny',
    receiver: 'henry',
    command: 'tip',
    message: '0.1 ETH happy birthday bro 🎂',
  },
  {
    sender: 'simmons',
    receiver: 'steward',
    command: 'tip',
    message: '10 ICY thanks for your contribution 🤘',
  },
  {
    sender: 'dianne',
    receiver: 'howard',
    command: 'tip',
    message: '2 BTC hope this helps! 💪🏻',
  },
  {
    sender: 'wade',
    receiver: 'alex',
    command: 'tip',
    message: '15 BNB my treat! 😋️',
  },
]

export default function CommandMessages() {
  const [index, setIndex] = useState(0)
  const [displayList, setDisplayList] = useState(DATA)
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useIsVisible(ref)

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined

    if (isVisible) {
      interval = setInterval(() => {
        const nextIndex = index + 1
        setDisplayList((prev) => {
          return [...prev, DATA[index % DATA.length]]
        })
        setIndex(nextIndex)
      }, 3000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [index, isVisible])

  const resetState = () => {
    setIndex(0)
    setDisplayList(DATA)
  }

  useEffect(() => {
    return () => {
      resetState()
    }
  }, [])

  useEffect(() => {
    if (!isVisible) {
      resetState()
    }
  }, [isVisible])

  return (
    <section id="slider" className="text-center" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="max-h-[14.375rem] overflow-hidden relative">
          <ul
            className={clsx(
              'text-center transition-all delay-150 duration-500 scale-y-50',
            )}
            style={{
              transform: `translateY(-${index * 82}px)`,
            }}
          >
            {displayList.map((item, i) => (
              <li
                className={clsx(
                  'text-2xl flex items-center justify-center flex-nowrap whitespace-nowrap h-[50px] mb-[32px] transition-all duration-500 scale-x-[0.4375] scale-y-[0.7] sm:scale-x-100 sm:scale-y-100 top-0',
                )}
                key={item.sender + i}
              >
                <img
                  width={40}
                  height={40}
                  className="mr-2"
                  src={`/assets/tip/${item.sender}.png`}
                  alt="social icons"
                />
                {item.sender}
                <span className="text-[#017AFF] font-semibold">
                  &nbsp;{`/${item.command}`}&nbsp;
                </span>
                <span className="text-[#017AFF] font-semibold">
                  {`@${item.receiver}`}&nbsp;
                </span>
                {item.message}
              </li>
            ))}
          </ul>
          <div className="bg-gradient-to-b from-white to-transparent absolute left-0 right-0 top-0 h-[50%]">
            &nbsp;
          </div>
          <div className="bg-gradient-to-t from-white to-transparent absolute left-0 right-0 bottom-0 h-[50%]">
            &nbsp;
          </div>
        </div>
      </div>
    </section>
  )
}
