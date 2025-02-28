const { Client, Wallet } = require('xrpl')
const client = new Client('wss://s.altnet.rippletest.net:51233')

async function submitTransaction() {
  const senderWallet = client.fundWallet()
  const recipientWallet = client.fundWallet()

  const transaction = {
    TransactionType: 'Payment',
    Account: senderWallet.address,
    Destination: recipientWallet.address,
    Amount: '10'
  }

  try {
    await client.submit(signedTransaction, { wallet: senderWallet })
    console.log(result)
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)
  }
}

submitTransaction()
