import React, { useState } from 'react';

const SearchInvoice = ({ contract }) => {
  const [companyName, setCompanyName] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const invoices = await contract.searchInvoicesByCompany(companyName);
      setResults(invoices);
    } catch (error) {
      alert('Error searching invoices');
    }
  };

  return (
    <div>
      <h2>Search Invoices</h2>
      <input
        type="text"
        value={companyName}
        onChange={e => setCompanyName(e.target.value)}
        placeholder="Company Name"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(inv => (
          <li key={inv.id}>
            {inv.companyName} - {inv.invoiceNumber} - {inv.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchInvoice;