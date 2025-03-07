const xrpl = require("xrpl");

async function send_xrpl() {
// Example credentials
const wallet = xrpl.Wallet.fromSeed("sEdSMWJBQpmN5zDrRnG4zoSEep3Thgt")
console.log(wallet.address) // rBK4ZGt13YKjdBaB5FbZyoiTB2NubEQief

  // Define the network client
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
  await client.connect()

// Prepare transaction -------------------------------------------------------
const prepared = await client.autofill({
    "TransactionType": "Payment",
    "Account": wallet.address,
    "DeliverMax": "1",//xrpl.xrpToDrops("22"),
    "Destination": "rJF9ntBXxcJLLMmkVPcFkjJFwcefKnpEv1",
    "Memos": [
      {
        "Memo": {
          "MemoType": "", // Optional: You can leave it blank or provide a custom type
          "MemoData": "4f6c697669657265725f74657374" // Store the Merkle root in hexadecimal format
        }
      }
    ]
    })
    const max_ledger = prepared.LastLedgerSequence
    console.log("Prepared transaction instructions:", prepared)
    console.log("Transaction cost:", xrpl.dropsToXrp(prepared.Fee), "XRP")
    console.log("Transaction expires after ledger:", max_ledger)

// Sign prepared instructions ------------------------------------------------
const signed = wallet.sign(prepared)
console.log("Identifying hash:", signed.hash)
console.log("Signed blob:", signed.tx_blob)

// Submit signed blob --------------------------------------------------------
const tx = await client.submitAndWait(signed.tx_blob)

// Wait for validation -------------------------------------------------------
// submitAndWait() handles this automatically, but it can take 4-7s.

// Check transaction results -------------------------------------------------
console.log("Transaction result:", tx.result.meta.TransactionResult)
console.log("Balance changes:", JSON.stringify(xrpl.getBalanceChanges(tx.result.meta), null, 2))

// Disconnect when done (If you omit this, Node.js won't end the process)
await client.disconnect()

}

send_xrpl();
