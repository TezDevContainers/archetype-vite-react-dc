import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from './components/providers/WalletProvider.tsx'
// The following lines about Buffer are a hacky workaround to solve polyfill issues.
// This workaround is from here: https://github.com/vitejs/vite/discussions/2785
// As seen here, there is likely a cleaner solution that confines the configuration to vite.config.ts.
// A PR fix to this repo would be welcomed.
// https://tezos.stackexchange.com/a/5888
import { Buffer } from 'buffer'
import { CountProvider } from './components/providers/CountProvider.tsx'
globalThis.Buffer = Buffer
// End workaround

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      <CountProvider>
        <App />
      </CountProvider>
    </WalletProvider>
  </React.StrictMode>,
)
