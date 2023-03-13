import { isSSR } from '@dwarvesf/react-utils'
import { SEO } from '~app/layout/seo'
import Home from '~components/Dashboard/Home'
import DashboardLayout from '~components/Dashboard/Layout'
import Login from '~components/Dashboard/Login'
import { useAppWalletContext } from '~context/wallet-context'

export default function Dashboard() {
  const { connected } = useAppWalletContext()

  if (isSSR()) {
    return <SEO title="Mochi Profile" description="Mochi Profile" />
  }

  return <DashboardLayout>{connected ? <Home /> : <Login />}</DashboardLayout>
}
