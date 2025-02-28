const xrpl = require("xrpl");

async function sendTransaction() {
  // Define wallet addresses and secret keys
  const walletAddress1 = "rBK4ZGt13YKjdBaB5FbZyoiTB2NubEQief"; // Wallet 1 address
  const walletAddress2 = "rJF9ntBXxcJLLMmkVPcFkjJFwcefKnpEv1"; // Wallet 2 address
  const secret1 = "sEdSMWJBQpmN5zDrRnG4zoSEep3Thgt"; // Wallet 1 secret key

  // Create a client to connect to the testnet
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

  await client.connect();

  const response1 = await client.request({ command: "account_info", account: walletAddress1, ledger_index: "validated" });

  console.log(response1.result.account_data.Sequence);
  console.log(response1.result.account_data.Sequence + 1);

  // Prepare the transaction
  const tx = {
    TransactionType: "Payment",
    Account: walletAddress1,
    Destination: walletAddress2,
    Amount: "1000000", // Amount in drops (1 XRP = 1,000,000 drops)
    Fee: "12", // Standard fee for testnet
    Sequence: response1.result.account_data.Sequence + 1, // Increment sequence for next transaction
  };

  // Sign the transaction with wallet 1's secret key
  const wallet1 = xrpl.Wallet.fromSeed(secret1);
  const signedTx = wallet1.sign(tx);

  console.log("Signed transaction:", signedTx.tx_json);

  // Submit the transaction
  const submitResponse = await client.submitAndWait(signedTx.tx_blob);
  console.log("Transaction result:", submitResponse.result);

  // Disconnect from the testnet
  client.disconnect();
}

sendTransaction();
