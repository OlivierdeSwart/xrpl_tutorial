const xrpl = require("xrpl");

async function createWallet() {
  // Generate a new XRP wallet
  const wallet = xrpl.Wallet.generate();
  
  // Log the wallet's address and secret
  console.log("New wallet address:", wallet.address);
  console.log("New wallet secret:", wallet.privateKey);
}

createWallet();