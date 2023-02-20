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

export const IntegratedChains = () => {
  return (
    <Marquee
      className="w-20 h-20 py-3 overflow-hidden flex"
      pauseOnHover
      direction="right"
    >
      <Image
        className="h-full"
        src="/integrated-chains/aptos.png"
        alt="aptos-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/eth.png"
        alt="eth-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/ftm.png"
        alt="ftm-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/onus.webp"
        alt="onus-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/polygon.png"
        alt="polygon-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/sol.png"
        alt="sol-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/sui.png"
        alt="sui-logo"
      />
      <Image
        className="h-full"
        src="/integrated-chains/okx.png"
        alt="okx-logo"
      />
    </Marquee>
  )
}
