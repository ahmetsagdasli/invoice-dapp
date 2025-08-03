import React, { useState } from 'react';
import Button from './UI/Button';
import { InvoiceFormData } from '../hooks/useInvoices';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: InvoiceFormData) => Promise<void>;
  isLoading?: boolean;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    companyName: '',
    invoiceNumber: '',
    amount: '',
    date: '',
    description: '',
    category: 'Technology'
  });

  const [errors, setErrors] = useState<Partial<InvoiceFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<InvoiceFormData> = {};

    // Company name validation
    if (!formData.companyName.trim() || formData.companyName.length < 2) {
      newErrors.companyName = 'Company name must be at least 2 characters';
    }

    // Amount validation
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    // Description validation
    if (!formData.description.trim() || formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    // Due date validation
    if (!formData.date) {
      newErrors.date = 'Due date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Due date must be in the future';
      }
    }

    // Invoice number validation
    if (!formData.invoiceNumber.trim()) {
      newErrors.invoiceNumber = 'Invoice number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        companyName: '',
        invoiceNumber: '',
        amount: '',
        date: '',
        description: '',
        category: 'Technology'
      });
      setErrors({});
      onClose();
    } catch (error) {
      console.error('Failed to create invoice:', error);
    }
  };

  const handleInputChange = (field: keyof InvoiceFormData, value: string) => {
    setFormData((prev: InvoiceFormData) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: Partial<InvoiceFormData>) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleClose = () => {
    setFormData({
      companyName: '',
      invoiceNumber: '',
      amount: '',
      date: '',
      description: '',
      category: 'Technology'
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Invoice</h2>
          <button className="modal-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="invoice-form">
          <div className="form-group">
            <label htmlFor="companyName">Client/Company Name *</label>
            <input
              id="companyName"
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="Enter client or company name"
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="invoiceNumber">Invoice Number *</label>
            <input
              id="invoiceNumber"
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
              placeholder="e.g., INV-2025-001"
              className={errors.invoiceNumber ? 'error' : ''}
            />
            {errors.invoiceNumber && <span className="error-message">{errors.invoiceNumber}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount in ETH *</label>
            <input
              id="amount"
              type="number"
              step="0.001"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              placeholder="e.g., 1.5"
              className={errors.amount ? 'error' : ''}
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
            >
              <option value="Technology">Technology</option>
              <option value="Development">Development</option>
              <option value="Consulting">Consulting</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Due Date *</label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className={errors.date ? 'error' : ''}
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the invoice details (min 10 characters)"
              rows={4}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-actions">
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
              {isLoading ? 'Creating Invoice...' : 'Create Invoice'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;