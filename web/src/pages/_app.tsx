import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps, NextWebVitalsMetric } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      console.log('FCP =', metric.value);
      break;
    case 'LCP':
      console.log('LCP = ', metric.value);
      break;
    case 'CLS':
      console.log('CLS = ', metric.value);
      break;
    case 'FID':
      console.log('FID = ', metric.value);
      break;
    case 'TTFB':
      console.log('TTFB = ', metric.value);
      break;
    case 'Next.js-route-change-to-render':
      console.log('nextjs change route render = ', metric.value);
      break;
    case 'Next.js-render':
      console.log('nextjs route render = ', metric.value);
      break;
    default:
      break;
  }
}

export default MyApp
