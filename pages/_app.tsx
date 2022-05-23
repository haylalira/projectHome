import GlobalStyles from '../styles/globals';
import type { AppProps } from 'next/app'
import { CartProvider } from '../hooks/useCart';
import Header from '../components/Header'
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
