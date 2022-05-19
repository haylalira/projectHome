import GlobalStyles from '../styles/globals';
import type { AppProps } from 'next/app'
import Header from '../components/Header';
import { CartProvider } from '../hooks/useCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider>
        <GlobalStyles />
        <Header />
        <Component {...pageProps} />
      </CartProvider>
    </>
  )
}

export default MyApp
