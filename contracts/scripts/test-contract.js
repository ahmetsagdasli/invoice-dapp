const hre = require("hardhat");

async function main() {
  console.log("🧪 Contract Test Başlıyor...");
  
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this
  
  try {
    const InvoiceManager = await hre.ethers.getContractFactory("InvoiceManager");
    const contract = InvoiceManager.attach(contractAddress);

    // Test 1: Add Invoice
    console.log("\n📝 Test 1: Fatura Ekleme");
    const tx = await contract.addInvoice(
      "Test Şirketi A.Ş.",
      "TEST-001",
      1000,
      Math.floor(Date.now() / 1000),
      "Test açıklaması",
      "",
      "Test"
    );
    await tx.wait();
    console.log("✅ Fatura başarıyla eklendi");

    // Test 2: Get All Invoices
    console.log("\n📋 Test 2: Tüm Faturaları Getirme");
    const allInvoices = await contract.getAllInvoices();
    console.log(`✅ ${allInvoices.length} fatura bulundu`);

    // Test 3: Search
    console.log("\n🔍 Test 3: Şirket Arama");
    const searchResults = await contract.searchInvoicesByCompany("Test Şirketi A.Ş.");
    console.log(`✅ ${searchResults.length} arama sonucu`);

    console.log("\n🎉 Tüm testler başarılı!");

  } catch (error) {
    console.error("❌ Test hatası:", error);
  }
}

main().catch(console.error);