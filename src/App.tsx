import './App.css'
import { MultiWalletTest } from './components/MultiWalletTest'

function App() {
  return (
    <>
      <header style={{
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        borderRadius: '12px',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>Reown AppKit Multi-Wallet Test</h1>
        <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>
          Test multiple wallet connections with Reown AppKit
        </p>
        <appkit-button />
      </header>

      <main>
        <MultiWalletTest />
      </main>

      <footer style={{
        marginTop: '50px',
        padding: '20px',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.9em',
        borderTop: '1px solid #eee'
      }}>
        <p>Built with React + Vite + TypeScript + Reown AppKit</p>
        <p style={{ marginTop: '10px' }}>
          <a href="https://docs.reown.com/appkit" target="_blank" rel="noopener noreferrer">
            AppKit Documentation
          </a>
        </p>
      </footer>
    </>
  )
}

export default App
