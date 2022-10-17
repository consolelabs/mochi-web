import { Footer } from './footer'
import { Navbar } from './navbar'

interface Props {
  children: React.ReactNode
}

export const Layout = (props: Props) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    {props.children}
    <Footer />
  </div>
)
