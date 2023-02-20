import React from 'react'
import Marquee from 'react-fast-marquee'
import clsx from 'classnames'

const Image = (props: any) => (
  <img
    {...props}
    className={clsx(
      props.className,
      'grayscale hover:grayscale-0 duration-100 ease-in-out mx-7 md:mx-10',
    )}
    style={{
      transitionProperty: 'filter',
    }}
    alt={props.alt}
  />
)

export const Partner = () => {
  return (
    <Marquee className="w-20 h-20 py-3 overflow-hidden flex" pauseOnHover>
      <Image
        className="h-full"
        src="/partner/blue-move.png"
        alt="blue-move-logo"
      />
      <Image className="h-full" src="/partner/okx.png" alt="okx-logo" />
      <Image
        className="h-full"
        src="/partner/solscan.webp"
        alt="solscan-logo"
      />
    </Marquee>
  )
}
