// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title InvoiceManager
 * @dev Basit fatura yönetim sistemi - OpenZeppelin dependency'si olmadan
 * @author ahmetsagdasli
 */
contract InvoiceManager {
    uint256 private _invoiceIds;

    struct Invoice {
        uint256 id;
        address owner;
        string companyName;
        string invoiceNumber;
        uint256 amount;
        uint256 date;
        string description;
        string ipfsHash;
        string category;
        bool isActive;
        uint256 createdAt;
    }

    mapping(uint256 => Invoice) public invoices;
    mapping(address => uint256[]) public userInvoices;
    uint256[] public allInvoiceIds;

    event InvoiceAdded(
        uint256 indexed id,
        address indexed owner,
        string companyName,
        string invoiceNumber,
        uint256 amount,
        uint256 timestamp
    );

    event InvoiceUpdated(uint256 indexed id, address indexed owner);
    event InvoiceDeactivated(uint256 indexed id, address indexed owner);

    modifier onlyInvoiceOwner(uint256 _invoiceId) {
        require(invoices[_invoiceId].owner == msg.sender, "Not invoice owner");
        _;
    }

    modifier validInvoice(uint256 _invoiceId) {
        require(_invoiceId > 0 && _invoiceId <= _invoiceIds, "Invalid invoice ID");
        require(invoices[_invoiceId].isActive, "Invoice not active");
        _;
    }

    /**
     * @dev Yeni fatura ekler
     */
    function addInvoice(
        string memory _companyName,
        string memory _invoiceNumber,
        uint256 _amount,
        uint256 _date,
        string memory _description,
        string memory _ipfsHash,
        string memory _category
    ) external returns (uint256) {
        require(bytes(_companyName).length > 0, "Company name required");
        require(bytes(_invoiceNumber).length > 0, "Invoice number required");
        require(_amount > 0, "Amount must be greater than 0");
        require(_date > 0, "Date required");

        _invoiceIds++;
        uint256 newInvoiceId = _invoiceIds;

        Invoice memory newInvoice = Invoice({
            id: newInvoiceId,
            owner: msg.sender,
            companyName: _companyName,
            invoiceNumber: _invoiceNumber,
            amount: _amount,
            date: _date,
            description: _description,
            ipfsHash: _ipfsHash,
            category: _category,
            isActive: true,
            createdAt: block.timestamp
        });

        invoices[newInvoiceId] = newInvoice;
        userInvoices[msg.sender].push(newInvoiceId);
        allInvoiceIds.push(newInvoiceId);

        emit InvoiceAdded(
            newInvoiceId, 
            msg.sender, 
            _companyName, 
            _invoiceNumber, 
            _amount,
            block.timestamp
        );

        return newInvoiceId;
    }

    /**
     * @dev Belirli bir faturayı getirir
     */
    function getInvoice(uint256 _invoiceId) 
        external 
        view 
        validInvoice(_invoiceId) 
        returns (Invoice memory) 
    {
        return invoices[_invoiceId];
    }

    /**
     * @dev Tüm aktif faturaları getirir
     */
    function getAllInvoices() external view returns (Invoice[] memory) {
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < allInvoiceIds.length; i++) {
            if (invoices[allInvoiceIds[i]].isActive) {
                activeCount++;
            }
        }

        Invoice[] memory activeInvoices = new Invoice[](activeCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allInvoiceIds.length; i++) {
            if (invoices[allInvoiceIds[i]].isActive) {
                activeInvoices[index] = invoices[allInvoiceIds[i]];
                index++;
            }
        }

        return activeInvoices;
    }

    /**
     * @dev Kullanıcının faturalarını getirir
     */
    function getUserInvoices(address _user) external view returns (Invoice[] memory) {
        uint256[] memory userInvoiceIds = userInvoices[_user];
        uint256 activeCount = 0;

        for (uint256 i = 0; i < userInvoiceIds.length; i++) {
            if (invoices[userInvoiceIds[i]].isActive) {
                activeCount++;
            }
        }

        Invoice[] memory userActiveInvoices = new Invoice[](activeCount);
        uint256 index = 0;

        for (uint256 i = 0; i < userInvoiceIds.length; i++) {
            uint256 invoiceId = userInvoiceIds[i];
            if (invoices[invoiceId].isActive) {
                userActiveInvoices[index] = invoices[invoiceId];
                index++;
            }
        }

        return userActiveInvoices;
    }

    /**
     * @dev Şirket adına göre fatura arar
     */
    function searchInvoicesByCompany(string memory _companyName) 
        external 
        view 
        returns (Invoice[] memory) 
    {
        require(bytes(_companyName).length > 0, "Company name required");
        
        uint256 matchCount = 0;
        
        for (uint256 i = 0; i < allInvoiceIds.length; i++) {
            uint256 invoiceId = allInvoiceIds[i];
            if (invoices[invoiceId].isActive && 
                keccak256(bytes(invoices[invoiceId].companyName)) == keccak256(bytes(_companyName))) {
                matchCount++;
            }
        }

        Invoice[] memory matchedInvoices = new Invoice[](matchCount);
        uint256 index = 0;

        for (uint256 i = 0; i < allInvoiceIds.length; i++) {
            uint256 invoiceId = allInvoiceIds[i];
            if (invoices[invoiceId].isActive && 
                keccak256(bytes(invoices[invoiceId].companyName)) == keccak256(bytes(_companyName))) {
                matchedInvoices[index] = invoices[invoiceId];
                index++;
            }
        }

        return matchedInvoices;
    }

    /**
     * @dev Fatura günceller
     */
    function updateInvoice(
        uint256 _invoiceId,
        string memory _description,
        string memory _category
    ) external validInvoice(_invoiceId) onlyInvoiceOwner(_invoiceId) {
        invoices[_invoiceId].description = _description;
        invoices[_invoiceId].category = _category;

        emit InvoiceUpdated(_invoiceId, msg.sender);
    }

    /**
     * @dev Faturayı deaktive eder
     */
    function deactivateInvoice(uint256 _invoiceId) 
        external 
        validInvoice(_invoiceId) 
        onlyInvoiceOwner(_invoiceId) 
    {
        invoices[_invoiceId].isActive = false;
        emit InvoiceDeactivated(_invoiceId, msg.sender);
    }

    /**
     * @dev Toplam fatura sayısını getirir
     */
    function getTotalInvoices() external view returns (uint256) {
        return _invoiceIds;
    }

    /**
     * @dev Aktif fatura sayısını getirir
     */
    function getActiveInvoicesCount() external view returns (uint256) {
        uint256 activeCount = 0;
        for (uint256 i = 0; i < allInvoiceIds.length; i++) {
            if (invoices[allInvoiceIds[i]].isActive) {
                activeCount++;
            }
        }
        return activeCount;
    }
}
