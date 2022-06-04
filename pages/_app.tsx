import type { AppProps } from 'next/app'
import Script from 'next/script'
import GlobalStyles from '../styles/globals';
import { CartProvider } from '../hooks/useCart';
import Header from '../components/Header';
 
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
      <Script src="https://sdk.mercadopago.com/js/v2" />
    </CartProvider>
  )
}

export default MyApp
