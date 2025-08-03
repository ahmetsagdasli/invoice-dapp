import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useBlockchain from './hooks/useBlockchain';
import useInvoices from './hooks/useInvoices';
import Button from './components/UI/Button';
import AddInvoiceButton from './components/UI/AddInvoiceButton';
import InvoiceModal from './components/InvoiceModal';
import { InvoiceFormData } from './hooks/useInvoices';
import './App.css';

// Components
const Header: React.FC<{ 
  account: string | null; 
  balance: string; 
  onConnect: () => void; 
  onDisconnect: () => void; 
  isLoading: boolean;
}> = ({ account, balance, onConnect, onDisconnect, isLoading }) => (
  <header className="app-header">
    <div className="header-content">
      <div className="header-left">
        <h1>��� Invoice DApp</h1>
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
            <Button variant="outline" onClick={onDisconnect}>
              ��� Disconnect
            </Button>
          </div>
        ) : (
          <Button 
            variant="primary" 
            onClick={onConnect} 
            isLoading={isLoading}
            size="lg"
          >
            ��� Connect MetaMask
          </Button>
        )}
      </div>
    </div>
  </header>
);

const Dashboard: React.FC<{ 
  account: string; 
  contract: any; 
  totalInvoices: number;
  onInvoiceAdded: () => void;
}> = ({ account, contract, totalInvoices, onInvoiceAdded }) => {
  const { invoices, isLoading, fetchAllInvoices, fetchUserInvoices, addInvoice } = useInvoices(contract);
  const [viewMode, setViewMode] = useState<'all' | 'user'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (viewMode === 'all') {
      fetchAllInvoices();
    } else {
      fetchUserInvoices(account);
    }
  }, [viewMode, account, fetchAllInvoices, fetchUserInvoices]);

  const handleAddInvoice = async (formData: InvoiceFormData) => {
    setIsCreating(true);
    try {
      await addInvoice(formData);
      onInvoiceAdded(); // Refresh total invoices count
      // Success feedback will be handled by the contract
    } catch (error) {
      console.error('Failed to add invoice:', error);
      // Error handling will be managed by the addInvoice function
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <main className="dashboard">
      <div className="container">
        {/* Dashboard Header with Add Button */}
        <div className="dashboard-header">
          <h2 className="dashboard-title">Invoice Dashboard</h2>
          <AddInvoiceButton 
            onClick={() => setIsModalOpen(true)}
            disabled={!contract}
          />
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>��� Total Invoices</h3>
            <p className="stat-number">{totalInvoices}</p>
          </div>
          
          <div className="stat-card">
            <h3>��� Your Invoices</h3>
            <p className="stat-number">{invoices.filter(inv => inv.owner.toLowerCase() === account.toLowerCase()).length}</p>
          </div>
          
          <div className="stat-card">
            <h3>��� Total Value</h3>
            <p className="stat-number">
              {invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toFixed(2)} ETH
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="view-toggle">
          <Button 
            variant={viewMode === 'all' ? 'primary' : 'outline'}
            onClick={() => setViewMode('all')}
          >
            ��� All Invoices
          </Button>
          <Button 
            variant={viewMode === 'user' ? 'primary' : 'outline'}
            onClick={() => setViewMode('user')}
          >
            ��� My Invoices
          </Button>
        </div>

        {/* Invoices List */}
        <div className="invoices-section">
          <h2>{viewMode === 'all' ? 'All Invoices' : 'My Invoices'}</h2>
          
          {isLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading invoices...</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="empty-state">
              <h3>��� No invoices found</h3>
              <p>Create your first invoice to get started!</p>
            </div>
          ) : (
            <div className="invoices-grid">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="invoice-card">
                  <div className="invoice-header">
                    <h4>{invoice.companyName}</h4>
                    <span className={`status ${invoice.isActive ? 'active' : 'inactive'}`}>
                      {invoice.isActive ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  
                  <div className="invoice-details">
                    <p><strong>Invoice #:</strong> {invoice.invoiceNumber}</p>
                    <p><strong>Amount:</strong> {invoice.amount} ETH</p>
                    <p><strong>Category:</strong> {invoice.category}</p>
                    <p><strong>Date:</strong> {new Date(invoice.date * 1000).toLocaleDateString()}</p>
                    <p><strong>Owner:</strong> {invoice.owner.substring(0, 6)}...{invoice.owner.substring(38)}</p>
                  </div>
                  
                  {invoice.description && (
                    <div className="invoice-description">
                      <p><strong>Description:</strong></p>
                      <p>{invoice.description}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Invoice Creation Modal */}
        <InvoiceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddInvoice}
          isLoading={isCreating}
        />
      </div>
    </main>
  );
};

const WelcomeScreen: React.FC<{ onConnect: () => void; isLoading: boolean }> = ({ onConnect, isLoading }) => (
  <main className="welcome-screen">
    <div className="container">
      <div className="welcome-content">
        <h2>��� Welcome to Invoice DApp</h2>
        <p>Connect your MetaMask wallet to start managing invoices on the blockchain</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>��� Secure</h3>
            <p>All invoices are stored securely on the blockchain</p>
          </div>
          <div className="feature-card">
            <h3>��� Decentralized</h3>
            <p>No central authority controls your data</p>
          </div>
          <div className="feature-card">
            <h3>��� Fast</h3>
            <p>Quick transactions with low fees</p>
          </div>
        </div>

        <Button 
          variant="primary" 
          size="lg" 
          onClick={onConnect} 
          isLoading={isLoading}
        >
          ��� Connect MetaMask to Get Started
        </Button>
      </div>
    </div>
  </main>
);

const App: React.FC = () => {
  const {
    isConnected,
    account,
    balance,
    contract,
    chainId,
    isLoading,
    error,
    connectWallet,
    disconnectWallet
  } = useBlockchain();

  const { getTotalInvoices } = useInvoices(contract);
  const [totalInvoices, setTotalInvoices] = useState(0);

  // Total invoice sayısını al
  const refreshTotalInvoices = () => {
    if (contract) {
      getTotalInvoices().then(setTotalInvoices);
    }
  };

  useEffect(() => {
    refreshTotalInvoices();
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
                  onInvoiceAdded={refreshTotalInvoices}
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
