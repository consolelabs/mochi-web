import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'

export const PepeCard = ({
  img,
  portrait = false,
  children,
}: {
  img: StaticImageData
  portrait?: boolean
  children?: React.ReactNode
}) => {
  return (
    <div
      style={{
        boxShadow: '5px 5px 0px black',
      }}
      className="flex flex-col p-2 bg-white rounded-xl border-2 max-w-[250px] border-near-black"
    >
      <Image
        className={clsx('object-cover rounded-lg', {
          'aspect-square': !portrait,
          'aspect-[3/4]': portrait,
        })}
        src={img}
        alt=""
      />
      {children}
    </div>
  )
}

const deg = 8
const dist = 170
const alpha = 0.3

PepeCard.Cards = ({ img }: { img: StaticImageData[] }) => {
  return (
    <div className="flex">
      {img.map((i, idx) => {
        const mid = Math.ceil(img.length / 2)
        const isMiddle = mid === idx + 1
        const diff = (mid - (idx + 1)) * -1
        return (
          <div
            className={clsx({
              absolute: !isMiddle,
              relative: isMiddle,
            })}
            style={{
              zIndex: isMiddle
                ? img.length
                : idx + 1 > mid
                ? img.length - (idx + 1)
                : 0,
              transform: `rotate(${deg * diff}deg) translate(${dist * diff}px)`,
              filter:
                idx === 0 || idx === img.length - 1
                  ? `opacity(${1 - Math.abs(alpha * diff)}) blur(2px)`
                  : '',
            }}
            key={i.src}
          >
            <PepeCard img={i} portrait />
          </div>
        )
      })}
    </div>
  )
}
