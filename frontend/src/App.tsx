import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import tezosLogo from './assets/tezos.svg'
import { useWalletContext } from './components/providers/WalletContext'
import { useCountContext } from './components/providers/CountContext'

function App() {
  const { connect, disconnect, account } = useWalletContext()
  const { increment, count, incrementInProgress, countLoading } = useCountContext()

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://tezos.com" target="_blank">
          <img src={tezosLogo} className="logo" alt="Tezos logo" />
        </a>
      </div>
      <h1>Vite + React + Archetype + Tezos</h1>
      <div>
        {account ? (
          <>
            <button onClick={disconnect}>
              Disconnect
            </button>
            <div>
              Connected to the Tezos Blockchain with account {account.address}
            </div>
          </>
        ) : (
          <>
            <button onClick={connect}>
              Connect
            </button>
            <div>
              No wallet connected
            </div>
          </>
        )}
      </div>
      <div className="card">
        <button onClick={increment} disabled={incrementInProgress}>
          {incrementInProgress ? 'incrementing...' : 'increment'}
        </button>
        <p></p>
        <div style={{ fontSize: 'large' }}>
          The count now equals:
        </div>
        <div style={{ fontSize: 'xxx-large' }}>
          {countLoading ? 'loading...' : count}
        </div>
      </div>

    </>
  )
}

export default App
