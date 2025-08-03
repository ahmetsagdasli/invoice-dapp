import { useState, useCallback } from 'react';
import { ethers } from 'ethers';

export interface Invoice {
  id: number;
  owner: string;
  companyName: string;
  invoiceNumber: string;
  amount: string;
  date: number;
  description: string;
  ipfsHash: string;
  category: string;
  isActive: boolean;
  createdAt: number;
}

export interface InvoiceFormData {
  companyName: string;
  invoiceNumber: string;
  amount: string;
  date: string;
  description: string;
  category: string;
  file?: File;
}

export const useInvoices = (contract: ethers.Contract | null) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Tüm faturaları getir
  const fetchAllInvoices = useCallback(async () => {
    if (!contract) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('��� Fetching all invoices...');
      const invoiceData = await contract.getAllInvoices();
      
      const formattedInvoices: Invoice[] = invoiceData.map((invoice: any) => ({
        id: Number(invoice.id),
        owner: invoice.owner,
        companyName: invoice.companyName,
        invoiceNumber: invoice.invoiceNumber,
        amount: ethers.formatEther(invoice.amount),
        date: Number(invoice.date),
        description: invoice.description,
        ipfsHash: invoice.ipfsHash,
        category: invoice.category,
        isActive: invoice.isActive,
        createdAt: Number(invoice.createdAt)
      }));

      setInvoices(formattedInvoices);
      console.log(`✅ Loaded ${formattedInvoices.length} invoices`);

    } catch (error: any) {
      console.error('❌ Error fetching invoices:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  // Yeni fatura ekle
  const addInvoice = useCallback(async (formData: InvoiceFormData) => {
    if (!contract) throw new Error('Contract not connected');

    setIsLoading(true);
    setError(null);

    try {
      console.log('��� Adding new invoice...', formData);

      // Amount'u wei'ye çevir
      const amountInWei = ethers.parseEther(formData.amount);
      
      // Date'i timestamp'e çevir
      const dateTimestamp = Math.floor(new Date(formData.date).getTime() / 1000);

      // Contract fonksiyonunu çağır
      const tx = await contract.addInvoice(
        formData.companyName,
        formData.invoiceNumber,
        amountInWei,
        dateTimestamp,
        formData.description,
        '', // IPFS hash (şimdilik boş)
        formData.category
      );

      console.log('��� Transaction sent:', tx.hash);
      
      // Transaction'ı bekle
      const receipt = await tx.wait();
      console.log('✅ Transaction confirmed:', receipt.hash);

      // Fatura listesini güncelle
      await fetchAllInvoices();

      return receipt;

    } catch (error: any) {
      console.error('❌ Error adding invoice:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [contract, fetchAllInvoices]);

  // Kullanıcının faturalarını getir
  const fetchUserInvoices = useCallback(async (userAddress: string) => {
    if (!contract) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('��� Fetching user invoices for:', userAddress);
      const invoiceData = await contract.getUserInvoices(userAddress);
      
      const formattedInvoices: Invoice[] = invoiceData.map((invoice: any) => ({
        id: Number(invoice.id),
        owner: invoice.owner,
        companyName: invoice.companyName,
        invoiceNumber: invoice.invoiceNumber,
        amount: ethers.formatEther(invoice.amount),
        date: Number(invoice.date),
        description: invoice.description,
        ipfsHash: invoice.ipfsHash,
        category: invoice.category,
        isActive: invoice.isActive,
        createdAt: Number(invoice.createdAt)
      }));

      setInvoices(formattedInvoices);
      console.log(`✅ Loaded ${formattedInvoices.length} user invoices`);

    } catch (error: any) {
      console.error('❌ Error fetching user invoices:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [contract]);

  // Toplam fatura sayısını getir
  const getTotalInvoices = useCallback(async () => {
    if (!contract) return 0;

    try {
      const total = await contract.getTotalInvoices();
      return Number(total);
    } catch (error) {
      console.error('Error getting total invoices:', error);
      return 0;
    }
  }, [contract]);

  return {
    invoices,
    isLoading,
    error,
    addInvoice,
    fetchAllInvoices,
    fetchUserInvoices,
    getTotalInvoices
  };
};

export default useInvoices;
