import '../styles/globals.css'
import Layout from '../components/layout'
import { AuthProvider } from '../contexts/authContext'
import { DomainProvider } from '../contexts/domainContext'

function MyApp({ Component, pageProps }) {
  return (
    <DomainProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </DomainProvider>
  )
}

export default MyApp
