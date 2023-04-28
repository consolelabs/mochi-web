import { Fragment } from 'react'
import { Footer } from './footer'
import { Navbar } from './navbar'

interface Props {
  children: React.ReactNode
  showBanner?: boolean
  darkNav?: boolean
}

export const Layout = (props: Props) => (
  <Fragment>
    <Navbar
      dark={props.darkNav ?? false}
      showBanner={props.showBanner ?? true}
    />
    {props.children}
    <Footer />
  </Fragment>
)
