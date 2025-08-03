import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { CONTRACT_ADDRESS, CONTRACT_ABI, NETWORK_CONFIG } from '../config/contract';

interface BlockchainState {
  isConnected: boolean;
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  contract: ethers.Contract | null;
  balance: string;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useBlockchain = () => {
  const [state, setState] = useState<BlockchainState>({
    isConnected: false,
    account: null,
    provider: null,
    signer: null,
    contract: null,
    balance: '0',
    chainId: null,
    isLoading: false,
    error: null
  });

  // MetaMask algılama
  const detectProvider = useCallback(async () => {
    const ethereumProvider = await detectEthereumProvider();
    return ethereumProvider;
  }, []);

  // Wallet bağlantısı
  const connectWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const ethereumProvider = await detectProvider();
      
      if (!ethereumProvider) {
        throw new Error('MetaMask is not installed! Please install MetaMask.');
      }

      // MetaMask'a erişim iste
      const accounts = await (ethereumProvider as any).request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      // Provider ve signer oluştur
      const provider = new ethers.BrowserProvider(ethereumProvider as any);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      // Bakiye al
      const balance = await provider.getBalance(accounts[0]);
      const balanceInEth = ethers.formatEther(balance);

      // Contract bağlantısı
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      setState({
        isConnected: true,
        account: accounts[0],
        provider,
        signer,
        contract,
        balance: balanceInEth,
        chainId: Number(network.chainId),
        isLoading: false,
        error: null
      });

      console.log('��� Wallet connected:', accounts[0]);
      console.log('��� Balance:', balanceInEth, 'ETH');

    } catch (error: any) {
      console.error('❌ Wallet connection error:', error);
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message
      }));
    }
  }, [detectProvider]);

  // Wallet bağlantısını kes
  const disconnectWallet = useCallback(() => {
    setState({
      isConnected: false,
      account: null,
      provider: null,
      signer: null,
      contract: null,
      balance: '0',
      chainId: null,
      isLoading: false,
      error: null
    });
    console.log('��� Wallet disconnected');
  }, []);

  // Network değişimi kontrolü
  const checkNetwork = useCallback(async () => {
    if (state.provider) {
      const network = await state.provider.getNetwork();
      const currentChainId = Number(network.chainId);
      
      if (currentChainId !== NETWORK_CONFIG.chainId) {
        setState(prev => ({
          ...prev,
          error: `Please switch to ${NETWORK_CONFIG.name} (Chain ID: ${NETWORK_CONFIG.chainId})`
        }));
        return false;
      }
      
      setState(prev => ({ ...prev, error: null }));
      return true;
    }
    return false;
  }, [state.provider]);

  // Otomatik bağlantı kontrolü
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const ethereumProvider = await detectProvider();
        
        if (ethereumProvider && (ethereumProvider as any).selectedAddress) {
          await connectWallet();
        }
      } catch (error) {
        console.log('Auto-connect failed:', error);
      }
    };

    checkConnection();
  }, [connectWallet, detectProvider]);

  // MetaMask event listeners
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== state.account) {
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [state.account, connectWallet, disconnectWallet]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    checkNetwork
  };
};

export default useBlockchain;
