
# Future Wallet

**Future Wallet** is a web application that allows users to create a wallet, check balances, and send transactions. This project demonstrates how digital wallets work and provides basic functionalities such as generating wallets, checking balances, and sending transactions using a simple frontend (React.js) and backend (Node.js with Express).

---

## 🚀 Features

- **Create Wallet**: Generate a new wallet with a unique address and private key.
- **Check Balance**: Retrieve the balance of the wallet using the provided address.
- **Send Transaction**: Initiate a transaction by providing the private key, recipient address, and the amount to send.
- **QR Code**: Display a QR code for the wallet address.

---

## 🧰 Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **QR Code Generation**: `qrcode.react` library
- **State Management**: React hooks (`useState`)
- **API Requests**: Axios for making HTTP requests to the backend
- **Ethereum API Integration**: QuickNode with Ethers.js

---

## 📋 Prerequisites

- **Node.js** and **npm** installed on your machine. You can download and install them from [here](https://nodejs.org/).
- **Git** for version control. Install it from [here](https://git-scm.com/).

---

## 💻 Setup Instructions

### 1. Clone the Repository

To get started, clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/username/futurewallet.git
```

---

### 2. Navigate to the Project Directory

Once the repository is cloned, navigate into the **futurewallet** directory:

```bash
cd futurewallet
```

---

### 3. Install Frontend Dependencies

Inside the **futurewallet** directory, run the following command to install the necessary frontend dependencies:

```bash
npm install
```

This will install all the packages listed in the `package.json` file.

---

### 4. Start the Frontend Development Server

After installing the dependencies, you can start the frontend development server with the following command:

```bash
npm start
```

The React app will now run on [http://localhost:3000](http://localhost:3000).

---

## ⚙️ Setting Up the Backend

If you don't have a backend already, you need to set it up as well. Follow these steps to set up the backend API.

### 5.1 Install Backend Dependencies

In the root of the project directory, run the following command to install the backend dependencies:

```bash
npm install express axios ethers dotenv
```

This will install the necessary backend packages.

---

### 5.2 Create a Backend Server

Create a new file called **`server.js`** in the project directory. This server will handle the following API requests:

- **`/create-wallet`**: Generate a new wallet.
- **`/balance/:address`**: Check the balance of a wallet by its address.
- **`/send-transaction`**: Send a transaction using the private key, recipient address, and amount.

---

### 5.3 Start the Backend Server

Once the backend server is set up, you can start the server using the following command:

```bash
node server.js
```

The backend will run on [http://localhost:3001](http://localhost:3001) (or any port you specify).

---

### 🔄 Running Both Frontend and Backend

Make sure both the frontend and backend servers are running:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:3001](http://localhost:3001)

---

## 🔗 QuickNode Integration Guide for Future Wallet

### 📋 What is QuickNode?

QuickNode is a **blockchain API provider** that allows developers to connect their applications to the **Ethereum network** and other blockchains. In this project, we use **QuickNode's Ethereum API** to retrieve wallet balances and send transactions.

---

### 🧑‍💻 1. Create a QuickNode Account

1. Go to [QuickNode](https://www.quicknode.com/) and **sign up** for an account.
2. Once logged in, click on **"Create Endpoint"**.
3. Choose **Ethereum Mainnet** or **Testnet** (for testing, choose **Goerli Testnet**).
4. After creating the endpoint, you’ll see a **HTTP Provider URL**.

---

### 🔑 2. Copy the QuickNode HTTP URL

After creating the endpoint, you’ll see a URL like this:

```
https://late-snowy-moon.ethereum-goerli.discover.quiknode.pro/YOUR-UNIQUE-KEY/
```

Copy this **HTTP URL**. You’ll need it to connect to the Ethereum network in your **server.js** file.

---

### 📂 3. Set Up Environment Variables

1. In your project directory, create a **`.env`** file to store your QuickNode URL securely.

```env
QUICKNODE_HTTP_URL=https://late-snowy-moon.ethereum-goerli.discover.quiknode.pro/YOUR-UNIQUE-KEY/
```

2. Add **dotenv** to your backend project to load the environment variables.

```bash
npm install dotenv
```

3. Update your **`server.js`** file to use this URL.
---

## ✅ Testing the Application

### Create Wallet

```bash
curl -X POST http://localhost:3001/create-wallet
```

### Check Balance

```bash
curl -X GET http://localhost:3001/balance/{address}
```

### Send Transaction

```bash
curl -X POST http://localhost:3001/send-transaction -d '{"privateKey": "YOUR_PRIVATE_KEY", "to": "RECIPIENT_ADDRESS", "amount": "0.01"}' -H "Content-Type: application/json"
```



### 🔍 Troubleshooting

If you face any issues while running the project, refer to these troubleshooting tips:

1. **Cannot fetch data from the backend?**  
   Ensure that both the frontend and backend servers are running, and the URLs in the frontend code match the backend routes.

2. **CORS issues?**  
   If you encounter CORS errors, add the `cors` package to your backend:

   ```bash
   npm install cors
   ```

   Then, add this to your `server.js`:

   ```javascript
   const cors = require('cors');
   app.use(cors());
   ```

---

## 💻 Commands Summary

| **Command**                  | **Description**                               |
|------------------------------|-----------------------------------------------|
| `git clone`                  | Clone the repository                          |
| `cd futurewallet`            | Navigate to the project directory             |
| `npm install`                | Install dependencies                          |
| `npm start`                  | Start the frontend server                     |
| `node server.js`             | Start the backend server                      |
| `npm run build`              | Build the frontend for production             |

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. Contributions are welcome!

---

## 🌐 Contact

For any queries, contact **Supriya Chougale** at supriyachougale2626@gmail.com.
```
