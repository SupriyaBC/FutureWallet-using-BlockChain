import React, { useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react'; 
import './App.css';
// Corrected import for QRCodeCanvas

function App() {
    const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState('');
    const [transaction, setTransaction] = useState({
        privateKey: '',
        to: '',
        amount: '',
    });

    // Create Wallet
    const createWallet = async () => {
        try {
            const response = await axios.get('http://localhost:3000/create-wallet');
            setWallet(response.data);
        } catch (error) {
            console.error('Error creating wallet:', error);
        }
    };

    // Check Balance
    const checkBalance = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/balance/${wallet.address}`);
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Error checking balance:', error);
        }
    };

    // Send Transaction
    const sendTransaction = async () => {
        try {
            const response = await axios.post('http://localhost:3000/send-transaction', transaction);
            alert(`Transaction Receipt: ${response.data.transactionHash}`);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                // Check for specific 'insufficient funds' error from the backend
                if (error.response.data.error === 'Insufficient funds for transaction and gas fees') {
                    alert('Error: Insufficient funds for transaction and gas fees.');
                } else {
                    alert('Error: ' + error.response.data.error);
                }
            } else {
                console.error('Error sending transaction:', error);
                alert('Error: An unexpected error occurred while sending the transaction.');
            }
        }
    };

    return (
        <div className="App">
            <h1>Future Wallet</h1>
            <button onClick={createWallet}>Create Wallet</button>
            {wallet && (
                <div>
                    <p>Address: {wallet.address}</p>
                    <p>Private Key: {wallet.privateKey}</p>
                    <QRCodeCanvas value={wallet.address} />
                    <button onClick={checkBalance}>Check Balance</button>
                    <p>Balance: {balance} FTR</p>
                </div>
            )}

            <h2>Send Transaction</h2>
            <input
                type="text"
                placeholder="Private Key"
                value={transaction.privateKey}
                onChange={(e) => setTransaction({ ...transaction, privateKey: e.target.value })}
            />
            <input
                type="text"
                placeholder="To Address"
                value={transaction.to}
                onChange={(e) => setTransaction({ ...transaction, to: e.target.value })}
            />
            <input
                type="text"
                placeholder="Amount"
                value={transaction.amount}
                onChange={(e) => setTransaction({ ...transaction, amount: e.target.value })}
            />
            <button onClick={sendTransaction}>Send</button>
        </div>
    );
}

export default App;
