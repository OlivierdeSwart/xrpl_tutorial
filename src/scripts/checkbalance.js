const xrpl = require("xrpl");

async function checkBalance() {
  // Define your wallet address (use the one you generated and funded) rBK4ZGt13YKjdBaB5FbZyoiTB2NubEQief
  const walletAddress1 = "rBK4ZGt13YKjdBaB5FbZyoiTB2NubEQief";
  const walletAddress2 = "rJF9ntBXxcJLLMmkVPcFkjJFwcefKnpEv1";

  // Create a client to connect to the testnet
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");

  await client.connect();

  // Fetch account information
  const response1 = await client.request({ command: "account_info", account: walletAddress1, ledger_index: "validated",  });
  const response2 = await client.request({ command: "account_info", account: walletAddress2, ledger_index: "validated",  });

  // Extract the balance from the response
  const balance1 = response1.result.account_data.Balance;
  const balance2 = response2.result.account_data.Balance;
  console.log(`Account ${walletAddress1} balance: ${balance1} drops`);
  console.log(`Account ${walletAddress2} balance: ${balance2} drops`);

  // Disconnect from the testnet
  client.disconnect();
}

checkBalance();
