// Invoice DApp Contract Configuration
// Generated: 2025-08-03 15:01:43 UTC
// Developer: ahmetsagdasli

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_companyName", "type": "string"},
      {"internalType": "string", "name": "_invoiceNumber", "type": "string"},
      {"internalType": "uint256", "name": "_amount", "type": "uint256"},
      {"internalType": "uint256", "name": "_date", "type": "uint256"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_ipfsHash", "type": "string"},
      {"internalType": "string", "name": "_category", "type": "string"}
    ],
    "name": "addInvoice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllInvoices",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "owner", "type": "address"},
          {"internalType": "string", "name": "companyName", "type": "string"},
          {"internalType": "string", "name": "invoiceNumber", "type": "string"},
          {"internalType": "uint256", "name": "amount", "type": "uint256"},
          {"internalType": "uint256", "name": "date", "type": "uint256"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "string", "name": "ipfsHash", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "bool", "name": "isActive", "type": "bool"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
        ],
        "internalType": "struct InvoiceManager.Invoice[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalInvoices",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserInvoices",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "owner", "type": "address"},
          {"internalType": "string", "name": "companyName", "type": "string"},
          {"internalType": "string", "name": "invoiceNumber", "type": "string"},
          {"internalType": "uint256", "name": "amount", "type": "uint256"},
          {"internalType": "uint256", "name": "date", "type": "uint256"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "string", "name": "ipfsHash", "type": "string"},
          {"internalType": "string", "name": "category", "type": "string"},
          {"internalType": "bool", "name": "isActive", "type": "bool"},
          {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
        ],
        "internalType": "struct InvoiceManager.Invoice[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const NETWORK_CONFIG = {
  chainId: 1337,
  name: 'Hardhat Localhost',
  rpcUrl: 'http://localhost:8545'
};

export const DEPLOYER_ACCOUNT = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
