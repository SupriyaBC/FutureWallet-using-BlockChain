const express = require('express');
const { Web3 }= require('web3');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Connect to Ethereum Sepolia Testnet using WSS
const web3 = new Web3('wss://aged-damp-crater.ethereum-sepolia.quiknode.pro/9fa2eff4e680192f0df713880170f61ac87f9c1d');

// ✅ Generate Wallet
app.get('/create-wallet', (req, res) => {
    const account = web3.eth.accounts.create();
    res.json({
        address: account.address,
        privateKey: account.privateKey,
    });
});

// ✅ Check Balance
app.get('/balance/:address', async (req, res) => {
    const address = req.params.address;

    // Ensure the address is a valid Ethereum address
    if (!web3.utils.isAddress(address)) {
        return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    try {
        const balance = await web3.eth.getBalance(address);
        const balanceInEther = web3.utils.fromWei(balance, 'ether');  // Convert balance from Wei to Ether

        res.json({
            address: address,
            balance: `${balanceInEther} ETH`,  // Return balance in Ether
        });
    } catch (error) {
        console.error('Error fetching balance:', error);
        res.status(500).json({ error: 'Network issue or address error' });
    }
});

// ✅ Send Transaction
// ✅ Send Transaction
app.post('/send-transaction', async (req, res) => {
    const { privateKey, to, amount } = req.body;

    // Check if the required fields are provided
    if (!privateKey || !to || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Convert private key to account
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);

        // Check the balance of the account
        const balance = await web3.eth.getBalance(account.address);
        const balanceInEther = web3.utils.fromWei(balance, 'ether');  // Convert balance from Wei to Ether

        // If balance is less than the amount + gas fees
        const gasPrice = await web3.eth.getGasPrice();
        const gasCost = gasPrice * 21000; // Gas for simple transactions (21000)
        const totalCost = web3.utils.toWei(amount.toString(), 'ether') + gasCost;

        if (parseFloat(balanceInEther) < parseFloat(web3.utils.fromWei(totalCost.toString(), 'ether'))) {
            return res.status(402).json({ error: 'Insufficient funds for transaction and gas fees' });
        }

        // Create the transaction object with default gas if not provided
        const tx = {
            from: account.address,
            to: to,
            value: web3.utils.toWei(amount.toString(), 'ether'),
            gas: 21000,  // Default gas for simple transfers
            gasPrice: gasPrice, // Dynamically fetch current gas price
        };

        // Sign the transaction
        const signedTx = await account.signTransaction(tx);

        // Send the signed transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        res.json({
            transactionHash: receipt.transactionHash,
            status: 'Transaction Successful',
            from: receipt.from,
            to: receipt.to,
            gasUsed: receipt.gasUsed,
        });
    } catch (error) {
        console.error('Error sending transaction:', error);
        // Return a generic error message if something goes wrong
        res.status(500).json({ error: 'An error occurred while sending the transaction' });
    }
});



// ✅ Start the Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
