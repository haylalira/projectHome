import GlobalStyles from '../styles/globals';
import type { AppProps } from 'next/app'
import { CartProvider } from '../hooks/useCart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <GlobalStyles />
      <Component {...pageProps} />
    </CartProvider>
  )
}

export default MyApp
