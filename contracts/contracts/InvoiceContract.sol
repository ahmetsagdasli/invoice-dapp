// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceContract {
    struct Invoice {
        uint256 id;
        address issuer;
        address recipient;
        uint256 amount;
        string description;
        uint256 dueDate;
        bool isPaid;
        uint256 createdAt;
    }
    
    mapping(uint256 => Invoice) public invoices;
    mapping(address => uint256[]) public userInvoices;
    uint256 public invoiceCounter;
    
    event InvoiceCreated(
        uint256 indexed invoiceId,
        address indexed issuer,
        address indexed recipient,
        uint256 amount
    );
    
    event InvoicePaid(uint256 indexed invoiceId, address indexed payer);
    
    function createInvoice(
        address _recipient,
        uint256 _amount,
        string memory _description,
        uint256 _dueDate
    ) public returns (uint256) {
        require(_recipient != address(0), "Geçersiz alıcı adresi");
        require(_amount > 0, "Tutar sıfırdan büyük olmalı");
        require(_dueDate > block.timestamp, "Son ödeme tarihi gelecekte olmalı");
        
        invoiceCounter++;
        
        invoices[invoiceCounter] = Invoice({
            id: invoiceCounter,
            issuer: msg.sender,
            recipient: _recipient,
            amount: _amount,
            description: _description,
            dueDate: _dueDate,
            isPaid: false,
            createdAt: block.timestamp
        });
        
        userInvoices[msg.sender].push(invoiceCounter);
        userInvoices[_recipient].push(invoiceCounter);
        
        emit InvoiceCreated(invoiceCounter, msg.sender, _recipient, _amount);
        
        return invoiceCounter;
    }
    
    function payInvoice(uint256 _invoiceId) public payable {
        Invoice storage invoice = invoices[_invoiceId];
        require(invoice.id != 0, "Fatura bulunamadı");
        require(!invoice.isPaid, "Fatura zaten ödenmiş");
        require(msg.value == invoice.amount, "Yanlış tutar");
        require(block.timestamp <= invoice.dueDate, "Fatura süresi dolmuş");
        
        invoice.isPaid = true;
        
        payable(invoice.issuer).transfer(msg.value);
        
        emit InvoicePaid(_invoiceId, msg.sender);
    }
    
    function getInvoice(uint256 _invoiceId) public view returns (Invoice memory) {
        return invoices[_invoiceId];
    }
    
    function getUserInvoices(address _user) public view returns (uint256[] memory) {
        return userInvoices[_user];
    }
}