// components/getstarted.js

const xrpl = require("xrpl");

async function main() {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const response = await client.request({
    command: "account_info",
    account: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
    ledger_index: "validated",
  });
  console.log(response);

  client.disconnect();
}

main();
