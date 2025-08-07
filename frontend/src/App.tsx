import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useBlockchain from './hooks/useBlockchain';
import useInvoices from './hooks/useInvoices';
import Button from './components/UI/Button';
import Dashboard from './components/Dashboard'; // Dashboard artık ayrı dosyada!
import './App.css';

// Header Component
const Header = ({ account, balance, onConnect, onDisconnect, isLoading }) => (
  <header className="app-header">
    <div className="header-content">
      <div className="header-left">
        <h1>🧾 Invoice DApp</h1>
        <p>Modern Blockchain-based Invoice Management System</p>
        <p>Developer: <strong>ahmetsagdasli</strong> | {new Date().toLocaleDateString()}</p>
      </div>
      <div className="header-right">
        {account ? (
          <div className="wallet-info">
            <div className="wallet-details">
              <p><strong>Account:</strong> {account.substring(0, 6)}...{account.substring(38)}</p>
              <p><strong>Balance:</strong> {parseFloat(balance).toFixed(4)} ETH</p>
            </div>
            <Button variant="outline" onClick={onDisconnect}>🔌 Disconnect</Button>
          </div>
        ) : (
          <Button 
            variant="primary" 
            onClick={onConnect} 
            isLoading={isLoading}
            size="lg"
          >
            🔗 Connect MetaMask
          </Button>
        )}
      </div>
    </div>
  </header>
);

// Welcome Screen Component
const WelcomeScreen = ({ onConnect, isLoading }) => (
  <main className="welcome-screen">
    <div className="container">
      <div className="welcome-content">
        <h2>👋 Welcome to Invoice DApp</h2>
        <p>Connect your MetaMask wallet to start managing invoices on the blockchain</p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>All invoices are stored securely on the blockchain</p>
          </div>
          <div className="feature-card">
            <h3>🪙 Decentralized</h3>
            <p>No central authority controls your data</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Fast</h3>
            <p>Quick transactions with low fees</p>
          </div>
        </div>
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onConnect} 
          isLoading={isLoading}
        >
          🔗 Connect MetaMask to Get Started
        </Button>
      </div>
    </div>
  </main>
);

const App = () => {
  const {
    isConnected,
    account,
    balance,
    contract,
    chainId,
    isLoading,
    error,
    connectWallet,
    disconnectWallet,
  } = useBlockchain();

  const { getTotalInvoices } = useInvoices(contract);
  const [totalInvoices, setTotalInvoices] = useState(0);

  useEffect(() => {
    if (contract) {
      getTotalInvoices().then(setTotalInvoices);
    }
  }, [contract, getTotalInvoices]);

  return (
    <Router>
      <div className="app">
        <Header 
          account={account}
          balance={balance}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          isLoading={isLoading}
        />
        {/* Error Alert */}
        {error && (
          <div className="error-alert">
            <p>❌ {error}</p>
          </div>
        )}
        {/* Network Warning */}
        {isConnected && chainId !== 1337 && (
          <div className="warning-alert">
            <p>⚠️ Please switch to Hardhat Localhost (Chain ID: 1337)</p>
          </div>
        )}
        <Routes>
          <Route 
            path="/" 
            element={
              isConnected && account ? (
                <Dashboard 
                  account={account} 
                  contract={contract}
                  totalInvoices={totalInvoices}
                  useInvoices={useInvoices}
                />
              ) : (
                <WelcomeScreen 
                  onConnect={connectWallet} 
                  isLoading={isLoading} 
                />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <footer className="app-footer">
          <p>© 2025 Invoice DApp | Developer: ahmetsagdasli | Built with ❤️</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;