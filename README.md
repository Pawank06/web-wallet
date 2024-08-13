## Web Based Wallet
Create a pneumonic, add multiple wallets and see the public key associated with each wallet.

### Demo

https://github.com/user-attachments/assets/294f0fd6-74b7-48b6-90d2-965b89475a53


## Features

- **Mnemonic Generation**: Generate a new mnemonic phrase using the BIP39 standard.
- **Blockchain Selection**: Choose between supported blockchains, currently Solana and Ethereum.
- **Wallet Creation**: Derive wallet addresses from the mnemonic for the selected blockchain.
- **Show/Hide Mnemonic**: Toggle visibility of the generated mnemonic with an eye icon.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/Pawank06/web-wallet.git
    ```

2. **Navigate to the project directory**:

    ```bash
    cd web-wallet
    ```

3. **Install dependencies**:

    ```bash
    npm install
    ```

4. **Run the development server**:

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Generate Mnemonic**: Click the "Generate Mnemonic" button to create a new mnemonic phrase.
2. **Select Blockchain**: Choose either Solana or Ethereum from the dropdown.
3. **Add Wallet**: After selecting the blockchain, click "Add Wallet" to generate and add the wallet to the list.
4. **View Balances**: The wallet addresses and their corresponding balances will be displayed below.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **React**: JavaScript library for building user interfaces.
- **bip39**: Library for mnemonic generation.
- **ethers**: Ethereum library for interacting with the blockchain.
- **@solana/web3.js**: Solana library for blockchain interactions.
- **ed25519-hd-key**: Library for deriving keys using the ed25519 curve.
- **nacl**: Library for cryptographic operations.

