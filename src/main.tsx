import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App'

import theme from '../src/theme';
import '../src/theme/styles.css';

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)