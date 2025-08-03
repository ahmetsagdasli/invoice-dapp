const hre = require("hardhat");

async function main() {
  console.log("��� Invoice DApp Deployment Başlıyor...");
  console.log("═══════════════════════════════════════");

  try {
    // Get deployer account
    const [deployer] = await hre.ethers.getSigners();
    console.log("��� Deployer Account:", deployer.address);
    
    // Get balance - DOĞRU YÖNTEM (Ethers v6)
    const balance = await hre.ethers.provider.getBalance(deployer.address);
    console.log("��� Account Balance:", hre.ethers.formatEther(balance), "ETH");

    // Deploy contract
    console.log("\n��� InvoiceManager Contract Deploy Ediliyor...");
    const InvoiceManager = await hre.ethers.getContractFactory("InvoiceManager");
    const invoiceManager = await InvoiceManager.deploy();

    // Wait for deployment
    await invoiceManager.waitForDeployment();
    
    const contractAddress = await invoiceManager.getAddress();

    console.log("✅ CONTRACT BAŞARIYLA DEPLOY EDİLDİ!");
    console.log("═════════════════════════════════════");
    console.log("��� Contract Address:", contractAddress);
    console.log("��� Network:", hre.network.name);

    console.log("\n��� ÖNEMLİ: Aşağıdaki address'i frontend config'e kaydedin:");
    console.log("═══════════════════════════════════════════════════════");
    console.log(`export const CONTRACT_ADDRESS = "${contractAddress}";`);
    console.log("Dosya: frontend/src/config/contract.ts");

    // Test deployment with sample data
    console.log("\n��� Test Verisi Ekleniyor...");
    try {
      const testTx = await invoiceManager.addInvoice(
        "Ahmet Sağdaşlı Tech",
        "INV-2025-001",
        hre.ethers.parseEther("1.5"), // 1.5 ETH
        Math.floor(Date.now() / 1000),
        "Modern Invoice DApp test faturası - Blockchain tabanlı fatura yönetim sistemi",
        "", // No IPFS hash for test
        "Teknoloji"
      );
      
      await testTx.wait();
      console.log("✅ Test faturası başarıyla eklendi!");
      
      // Get invoice count
      const totalInvoices = await invoiceManager.getTotalInvoices();
      console.log("��� Toplam Fatura Sayısı:", totalInvoices.toString());
      
    } catch (testError) {
      console.log("⚠️ Test verisi eklenirken hata:", testError.message);
    }

    console.log("\n��� DEPLOYMENT TAMAMLANDI!");
    console.log("═══════════════════════════════════");
    console.log("��� Şimdi frontend ve backend'i başlatabilirsiniz:");
    console.log("   npm run backend");
    console.log("   npm run frontend");
    console.log("\n��� Uygulama URL'leri:");
    console.log("   Frontend: http://localhost:5173");
    console.log("   Backend:  http://localhost:5000");
    console.log("   Hardhat:  http://localhost:8545");

  } catch (error) {
    console.error("❌ DEPLOYMENT HATASI:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Beklenmeyen hata:", error);
    process.exit(1);
  });
