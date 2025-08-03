import React, { useState } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';
import { User, DollarSign, FileText, Calendar, Loader2 } from 'lucide-react';
import '../styles/AddInvoice.css';

const AddInvoice = ({ contract, account }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    description: '',
    dueDate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    // Ethereum address validation
    if (!formData.recipient) {
      newErrors.recipient = 'Alıcı adresi zorunludur';
    } else if (!ethers.utils.isAddress(formData.recipient)) {
      newErrors.recipient = 'Geçerli bir Ethereum adresi giriniz';
    }
    
    // Amount validation
    if (!formData.amount) {
      newErrors.amount = 'Tutar zorunludur';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Tutar sıfırdan büyük olmalıdır';
    }
    
    // Description validation
    if (!formData.description || formData.description.trim().length < 3) {
      newErrors.description = 'Açıklama en az 3 karakter olmalıdır';
    }
    
    // Due date validation
    if (!formData.dueDate) {
      newErrors.dueDate = 'Son ödeme tarihi zorunludur';
    } else if (new Date(formData.dueDate) <= new Date()) {
      newErrors.dueDate = 'Son ödeme tarihi gelecekte olmalıdır';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Lütfen form hatalarını düzeltin');
      return;
    }

    if (!contract) {
      toast.error('Smart contract bağlantısı bulunamadı');
      return;
    }

    setIsLoading(true);
    
    try {
      toast.loading('Fatura oluşturuluyor...', { id: 'create-invoice' });
      
      const tx = await contract.createInvoice(
        formData.recipient,
        ethers.utils.parseEther(formData.amount),
        formData.description,
        Math.floor(new Date(formData.dueDate).getTime() / 1000)
      );
      
      await tx.wait();
      
      toast.success('Fatura başarıyla oluşturuldu! 🎉', { id: 'create-invoice' });
      
      // Reset form
      setFormData({ recipient: '', amount: '', description: '', dueDate: '' });
      setErrors({});
      
    } catch (error) {
      console.error('Fatura oluşturma hatası:', error);
      toast.error('Fatura oluşturulamadı. Lütfen tekrar deneyin.', { id: 'create-invoice' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="add-invoice-container">
      <div className="add-invoice-form">
        <div className="form-header">
          <h2>✨ Yeni Fatura Oluştur</h2>
          <p>Blockchain üzerinde güvenli fatura oluşturun</p>
        </div>
        
        <form onSubmit={handleSubmit} className="invoice-form">
          {/* Recipient Address Field */}
          <div className="form-group">
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input
                type="text"
                name="recipient"
                value={formData.recipient}
                onChange={handleChange}
                placeholder=" "
                required
                className={errors.recipient ? 'error' : ''}
                aria-label="Alıcı Ethereum Adresi"
              />
              <label htmlFor="recipient">Alıcı Adresi</label>
            </div>
            {errors.recipient && <span className="error-message">{errors.recipient}</span>}
          </div>
          
          {/* Amount Field */}
          <div className="form-group">
            <div className="input-wrapper">
              <DollarSign className="input-icon" size={20} />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.001"
                min="0"
                placeholder=" "
                required
                className={errors.amount ? 'error' : ''}
                aria-label="Fatura Tutarı ETH"
              />
              <label htmlFor="amount">Tutar (ETH)</label>
            </div>
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>
          
          {/* Description Field */}
          <div className="form-group">
            <div className="input-wrapper textarea-wrapper">
              <FileText className="input-icon" size={20} />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder=" "
                required
                rows="4"
                className={errors.description ? 'error' : ''}
                aria-label="Fatura Açıklaması"
              />
              <label htmlFor="description">Açıklama</label>
            </div>
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>
          
          {/* Due Date Field */}
          <div className="form-group">
            <div className="input-wrapper">
              <Calendar className="input-icon" size={20} />
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className={errors.dueDate ? 'error' : ''}
                aria-label="Son Ödeme Tarihi"
              />
              <label htmlFor="dueDate">Son Ödeme Tarihi</label>
            </div>
            {errors.dueDate && <span className="error-message">{errors.dueDate}</span>}
          </div>
          
          {/* Submit Button */}
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isLoading}
            aria-label="Fatura Oluştur"
          >
            {isLoading ? (
              <>
                <Loader2 className="spinner" size={20} />
                Oluşturuluyor...
              </>
            ) : (
              <>
                ✨ Fatura Oluştur
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddInvoice;