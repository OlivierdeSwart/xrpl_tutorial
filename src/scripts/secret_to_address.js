const xrpl = require("xrpl");

async function secretToAddress() {
  // Define your secret key (use the one you generated) sXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  const secret = "sEdSjwAc62v7rPzPw34kYp9XfUcv49h";
  const wallet = xrpl.Wallet.fromSecret(secret);
  
  console.log(`Wallet address: ${wallet.address}`);

}

secretToAddress();
