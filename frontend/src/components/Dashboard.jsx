import React, { useState } from 'react';
import AddInvoice from './AddInvoice';

const invoicesExample = [
  {
    id: 1,
    company: "OpenAI Inc.",
    amount: "1.000 USDT",
    date: "Aug 03, 2025",
    status: "Paid",
    category: "AI",
  }
];

export default function Dashboard({ account, contract, useInvoices }) {
  // Dummy state for demonstration
  const [search, setSearch] = useState('');
  const [paidInvoices] = useState(1);
  const [dueInvoices] = useState(0);
  const [activeTab] = useState("Paid");

  return (
    <div>
      <div className="header-bar">
        <div className="header-logo">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="6" fill="#23395d"/>
            <text x="6" y="18" fill="#fff" fontSize="12" fontWeight="bold">ID</text>
          </svg>
          Invoice dApp
        </div>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="header-actions">
          <button className="connect-btn">
            {account ? `${account.substring(0, 6)}...${account.substring(38)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <div className="stats-row">
            <div className="stats-card">
              <div className="stats-label">Paid Invoices</div>
              <div className="stats-value">{paidInvoices}</div>
            </div>
            <div className="stats-card">
              <div className="stats-label">Due Invoices</div>
              <div className="stats-value">{dueInvoices}</div>
            </div>
          </div>

          <div className="invoice-list-card">
            <div className="invoice-list-header">
              <span className="active">All</span>
              <span>Faturalar</span>
            </div>
            {invoicesExample.map(inv => (
              <div className="invoice-item" key={inv.id}>
                <div className="invoice-main">
                  <div className="invoice-company">{inv.company}</div>
                  <div className="invoice-date">{inv.date}</div>
                </div>
                <div>
                  <div className="invoice-amount">{inv.amount}</div>
                  <div className={`invoice-status ${inv.status === 'Paid' ? '' : 'due'}`}>
                    {inv.status}
                  </div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: "1rem", color: "#7b8ca8", textAlign: "left" }}>
              Tüm Faturalar
            </div>
          </div>

          <div className="upload-card">
            ↑ Upload
          </div>

          <div className="open-invoices-card">
            <div style={{ fontWeight: "600", color: "#23395d", marginBottom: "0.8rem" }}>
              Açık Faturalar
            </div>
            <div className="search-invoices-bar">
              <input type="text" placeholder="Search invoices..." />
            </div>
          </div>
        </div>

        <div className="dashboard-right">
          <h2>Fatura İşlemleri</h2>
          {/* Contract ve account prop'larını AddInvoice'a geçiriyoruz */}
          <AddInvoice contract={contract} account={account} />
        </div>
      </div>
    </div>
  );
}