import React, { useState } from 'react';
import { ethers } from 'ethers';

const AddInvoice = ({ contract, account }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tx = await contract.createInvoice(
        formData.recipient,
        ethers.utils.parseEther(formData.amount),
        formData.description,
        Math.floor(new Date(formData.dueDate).getTime() / 1000)
      );
      await tx.wait();
      alert('Fatura başarıyla oluşturuldu!');
      setFormData({ recipient: '', amount: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Fatura oluşturma hatası:', error);
      alert('Fatura oluşturulamadı!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-invoice-form">
      <h2>Yeni Fatura Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Alıcı Adresi:</label>
          <input
            type="text"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            placeholder="0x..."
            required
          />
        </div>
        
        <div className="form-group">
          <label>Tutar (ETH):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.001"
            placeholder="0.1"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Açıklama:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Fatura açıklaması..."
            required
          />
        </div>
        
        <div className="form-group">
          <label>Son Ödeme Tarihi:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary">
          Fatura Oluştur
        </button>
      </form>
    </div>
  );
};

export default AddInvoice;