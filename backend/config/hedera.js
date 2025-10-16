const { Client, PrivateKey, AccountId } = require('@hashgraph/sdk');

let hederaClient = null;

const initializeHedera = () => {
  try {
    // For testnet - you can change to mainnet when ready
    const client = Client.forTestnet();

    // Set your Hedera account credentials
    // These should be stored in environment variables for security
    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_PRIVATE_KEY;

    if (accountId && privateKey) {
      client.setOperator(AccountId.fromString(accountId), PrivateKey.fromString(privateKey));
      console.log('Hedera client initialized with operator account');
    } else {
      console.warn('Hedera credentials not found. Please set HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY environment variables');
    }

    hederaClient = client;
    return client;
  } catch (error) {
    console.error('Failed to initialize Hedera client:', error.message);
    throw error;
  }
};

const getHederaClient = () => {
  if (!hederaClient) {
    throw new Error('Hedera client not initialized. Call initializeHedera() first.');
  }
  return hederaClient;
};

module.exports = {
  initializeHedera,
  getHederaClient
};
