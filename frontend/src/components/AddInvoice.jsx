import React, { useState } from 'react';
import { ethers } from 'ethers';

export default function AddInvoice({ contract, account }) {
  const [form, setForm] = useState({
    company: "",
    amount: "",
    currency: "USD",
    invoiceNo: "",
    email: "",
    category: "",
    file: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      if (!contract || !account) {
        setError("Lütfen önce cüzdanınızı bağlayın.");
        setLoading(false);
        return;
      }

      const { company, amount, currency, invoiceNo, email, category, description } = form;

      if (!company.trim() || !amount.trim() || !invoiceNo.trim() || !email.trim() || !category.trim()) {
        setError("Lütfen tüm zorunlu alanları doldurun.");
        setLoading(false);
        return;
      }

      // *** DOĞRU PARAMETRE HAZIRLIĞI - ABI'ye Uygun ***
      
      // 1. companyName: string
      const companyName = company.trim();
      
      // 2. invoiceNumber: string  
      const invoiceNumber = invoiceNo.trim();
      
      // 3. amount: uint256 (wei cinsinden, ama burada sent cinsinden kullanacağız)
      const amountInSmallestUnit = ethers.parseUnits(amount, 2);
      
      // 4. date: uint256 (unix timestamp)
      const currentDate = Math.floor(Date.now() / 1000); // Şu anki timestamp
      
      // 5. description: string
      const invoiceDescription = description.trim() || "Fatura açıklaması";
      
      // 6. ipfsHash: string (şimdilik boş, dosya yükleme daha sonra implementasyonu)
      const ipfsHash = ""; // Dosya yükleme özelliği henüz aktif değil
      
      // 7. category: string (bytes32 değil, string!)
      const invoiceCategory = category;

      console.log("Kontrata gönderilecek parametreler:", {
        companyName,
        invoiceNumber, 
        amount: amountInSmallestUnit.toString(),
        date: currentDate,
        description: invoiceDescription,
        ipfsHash,
        category: invoiceCategory
      });

      // *** KONTRAT ÇAĞRISI - ABI ile Tam Uyumlu ***
      const tx = await contract.addInvoice(
        companyName,           // string _companyName
        invoiceNumber,         // string _invoiceNumber  
        amountInSmallestUnit,  // uint256 _amount
        currentDate,           // uint256 _date
        invoiceDescription,    // string _description
        ipfsHash,              // string _ipfsHash
        invoiceCategory        // string _category
      );

      // İşlemin tamamlanmasını bekle
      await tx.wait();
      console.log("İşlem başarılı:", tx);

      // Formu temizle
      setForm({
        company: "", 
        amount: "", 
        currency: "USD", 
        invoiceNo: "", 
        email: "", 
        category: "", 
        file: null, 
        description: "",
      });
      
      alert("✅ Fatura başarıyla blockchain'e eklendi!");
      
    } catch (err) {
      console.error("Kontrat hatası:", err);
      
      let errorMessage = "Fatura eklenemedi. Lütfen tekrar deneyin.";
      
      if (err.code === 'ACTION_REJECTED') {
        errorMessage = "İşlem kullanıcı tarafından iptal edildi.";
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = "Yetersiz bakiye. Gas ücreti için yeterli ETH'iniz yok.";
      } else if (err.reason) {
        errorMessage = `İşlem başarısız: ${err.reason}`;
      } else if (err.message.includes("Company name required")) {
        errorMessage = "Şirket adı zorunludur.";
      } else if (err.message.includes("Amount must be greater than 0")) {
        errorMessage = "Tutar sıfırdan büyük olmalıdır.";
      } else if (err.message.includes("Invoice number required")) {
        errorMessage = "Fatura numarası zorunludur.";
      } else if (err.code === 'INVALID_ARGUMENT') {
        errorMessage = `Geçersiz parametre. Lütfen tüm alanları kontrol edin.`;
      }
      
      setError(errorMessage);
    }
    
    setLoading(false);
  }

  // Render kısmı değişmez
  if (!contract) {
    return (
      <div className="invoice-form">
        <div style={{ color: "orange", padding: "20px", textAlign: "center" }}>
          Smart contract yükleniyor... Wallet bağlantınızı kontrol edin.
        </div>
      </div>
    );
  }

  if (!account) {
    return (
      <div className="invoice-form">
        <div style={{ color: "red", padding: "20px", textAlign: "center" }}>
          Wallet bağlantısı bulunamadı. Lütfen wallet'ınızı bağlayın.
        </div>
      </div>
    );
  }

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <label>Şirket Adı</label>
      <div className="row">
        <input
          type="text"
          placeholder="Şirket adı"
          value={form.company}
          onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
          required
        />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Tutar"
          style={{ maxWidth: "80px" }}
          value={form.amount}
          onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
          required
        />
        <span style={{
          fontWeight: 600,
          color: "#1352a0",
          alignSelf: "center",
          marginLeft: "5px"
        }}>USD</span>
      </div>
      <label>Fatura No</label>
      <input
        type="text"
        placeholder="Fatura No"
        value={form.invoiceNo}
        onChange={e => setForm(f => ({ ...f, invoiceNo: e.target.value }))}
        required
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        required
      />
      <label>Kategori</label>
      <select
        value={form.category}
        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
        required
      >
        <option value="">Kategori Seç</option>
        <option value="AI">AI</option>
        <option value="Fintech">Fintech</option>
        <option value="Consulting">Consulting</option>
        <option value="Other">Other</option>
      </select>
      <label>Dosya Yükle (PDF/Foto)</label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={e => setForm(f => ({ ...f, file: e.target.files[0] }))}
      />
      <label>Açıklama</label>
      <textarea
        rows={2}
        placeholder="Açıklama"
        value={form.description}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
      />
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <div className="form-actions">
        <button type="submit" disabled={loading || !contract || !account}>
          {loading ? "Ekleniyor..." : "Ekle"}
        </button>
      </div>
    </form>
  );
}