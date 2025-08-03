import React from 'react';
import Button from './Button';

interface AddInvoiceButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddInvoiceButton: React.FC<AddInvoiceButtonProps> = ({ onClick, disabled = false }) => {
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={onClick}
      disabled={disabled}
      className="add-invoice-btn"
    >
      ➕ Add Invoice
    </Button>
  );
};

export default AddInvoiceButton;