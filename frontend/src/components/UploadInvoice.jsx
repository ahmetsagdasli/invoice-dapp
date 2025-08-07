import React, { useState } from 'react';
import { ethers } from 'ethers';
// Optionally import a CSV parser like PapaParse for real parsing

const UploadInvoice = ({ contract, account }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    // You'd parse the CSV here. This is placeholder logic.
    // For real use, integrate a CSV parser and extract rows.
    const parsedInvoices = [
      // Example:
      // { companyName: "Acme", invoiceNumber: "INV001", amount: "1.0", date: 1689999999, description: "Test invoice", ipfsHash: "", category: "General" }
      // Populate from actual CSV rows
    ];
    for (const invoice of parsedInvoices) {
      try {
        const tx = await contract.addInvoice(
          invoice.companyName,
          invoice.invoiceNumber,
          ethers.utils.parseEther(invoice.amount),
          invoice.date,
          invoice.description,
          invoice.ipfsHash,
          invoice.category
        );
        await tx.wait();
      } catch (err) {
        alert(`Error uploading invoice: ${invoice.invoiceNumber}`);
      }
    }
    alert('Invoices uploaded!');
  };

  return (
    <div>
      <h2>Upload Invoices</h2>
      <input type="file" accept=".csv,.pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default UploadInvoice;