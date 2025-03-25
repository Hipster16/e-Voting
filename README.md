# e-Voting Blockchain Application

A secure, transparent, and user-friendly electronic voting system built on blockchain technology, leveraging zero-knowledge proofs for privacy and security.

## 🚀 Overview

This Next.js-based decentralized application (dApp) provides a modern approach to electronic voting, ensuring:

- **Verifiable Results**: All votes are recorded on the blockchain, making them immutable and transparent
- **Privacy Protection**: Zero-knowledge proofs allow verification without revealing sensitive information
- **Prevention of Double Voting**: Smart contract logic prevents duplicate votes
- **User-Friendly Interface**: Modern UI with real-time feedback and animations

## 📋 Features

### For Voters (Students)
- **Secure Authentication**: College ID and passphrase verification
- **Candidate Selection**: View and select from available candidates
- **Vote Submission**: Cryptographically secure submission process
- **Transaction Feedback**: Real-time processing indicators
- **Vote Receipt**: Digital receipt with transaction details
- **Double Vote Prevention**: System prevents multiple votes from the same user
- **Participant Verification**: Only registered voters can participate

### For Administrators
- **Election Creation**: Set up new election events
- **Candidate Management**: Add and manage candidates
- **Voter List Management**: Control eligible voter lists
- **Election Monitoring**: Real-time statistics and progress
- **Result Visualization**: Dynamic charts and data visualization

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Blockchain Integration**: Ethers.js, Web3.js
- **Authentication**: MetaMask wallet integration
- **Zero-Knowledge Proofs**: Circom, SnarkJS for ZK verification
- **Styling**: Tailwind CSS with custom UI components
- **State Management**: React hooks
- **Form Handling**: React Hook Form, Zod validation

## 🏗️ Architecture

The application follows a modular architecture with:

- **Smart Contracts**: 
  - `ElectionFactory.sol`: Manages election creation and administration
  - `ElectionContract.sol`: Handles the voting logic for specific elections
  - `Groth16Verifier.sol`: Verifies zero-knowledge proofs

- **Frontend Components**:
  - Authentication flows
  - Election browsing and voting interfaces
  - Admin dashboard
  - Result visualization

- **Zero-Knowledge Proof System**:
  - Generates proofs to verify voter eligibility without revealing identity
  - Validates votes without compromising privacy
  - Prevents double voting

## 🔒 Security Features

- **Zero-Knowledge Proofs**: Verify eligibility without revealing identity
- **Transaction Validation**: Multi-level error detection and handling
- **Double Vote Prevention**: Blockchain-enforced uniqueness
- **Gasless Transactions**: Using Biconomy for enhanced UX
- **Error Detection**:
  - Double voting detection
  - Non-participant detection
  - Transaction failure handling

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Hipster16/e-Voting.git
cd e-Voting

# Install dependencies
npm install

# Set up environment variables

# Run development server
npm run dev
```

## 🦊 MetaMask & Amoy Testnet Setup

### Installing MetaMask

1. **Install the Extension**:
   - Visit [MetaMask.io](https://metamask.io/download/)
   - Choose your browser (Chrome, Firefox, Edge, or Brave)
   - Click "Install MetaMask" and follow browser-specific installation instructions

2. **Create a Wallet**:
   - Click "Create a new wallet"
   - Set a strong password
   - Save your Secret Recovery Phrase securely (12 or 24 words)
   - Complete the verification process

### Adding Amoy Testnet to MetaMask

1. **Access Network Settings**:
   - Click on the network dropdown at the top of MetaMask
   - Select "Add network"
   - Click "Add a network manually" (at the bottom)

2. **Enter Amoy Testnet Details**:
   - **Network Name**: Amoy Testnet
   - **New RPC URL**: https://chainlist.org/chain/80002
   - **Chain ID**: 80002
   - **Currency Symbol**: ETH
   - **Block Explorer URL**: https://explorer.amoy.eth.zkevm.io
   - Click "Save"

### Getting Test ETH for Amoy Testnet

1. **Get Free Test ETH**:
   - Visit [Amoy Faucet](https://faucet.polygon.technology/amoy)
   - Connect your wallet and request test ETH
   - Wait a few moments for the ETH to appear in your wallet

   Alternative faucet options:
   - [Ethereum Amoy Faucet](https://faucet.quicknode.com/ethereum/amoy)
   - [PolygonZK Amoy Faucet](https://faucet.polygon.technology/amoy)

2. **Verify Your Balance**:
   - In MetaMask, ensure you've selected "Amoy Testnet" as your network
   - Check that your ETH balance has updated with the test tokens

### Connecting MetaMask to the e-Voting Application

1. **Access the Application**:
   - Open the e-Voting application in your browser
   - Click "Connect Wallet" on the homepage

2. **Authorize Connection**:
   - MetaMask will prompt you to connect
   - Select the account you want to use
   - Make sure "Amoy Testnet" is selected as your network
   - Confirm the connection

3. **Verify Connection**:
   - Once connected, your wallet address should appear in the application
   - The application will display "Connected to Amoy Testnet"

Now you're ready to use the e-Voting application with MetaMask and Amoy Testnet!

## 📚 Usage Guide

### For Voters:

1. **Connect Wallet**: Connect your MetaMask wallet
2. **Browse Elections**: View active elections
3. **Select Candidate**: Choose your preferred candidate
4. **Authenticate**: Enter your College ID and passphrase
5. **Submit Vote**: Confirm your transaction
6. **Receive Receipt**: Get your vote confirmation

### For Administrators:

1. **Access Admin Panel**: Login with admin credentials
2. **Create Election**: Set up new elections with details
3. **Add Candidates**: Register candidates for the election
4. **Manage Voter List**: Upload or modify eligible voter lists
5. **Monitor Elections**: Track voting progress
6. **End Election**: Close voting and publish results

## 🧠 Advanced Features

### Zero-Knowledge Proof Verification

The system uses zero-knowledge proofs to verify voter eligibility without revealing sensitive information:

1. User provides credentials (College ID, passphrase)
2. System generates a proof that the user is on the approved voter list
3. Smart contract verifies the proof without revealing the user's identity
4. Vote is recorded if the proof is valid

### Error Handling

Sophisticated error handling for various scenarios:

- **Double Voting**: Clear alerts when a user attempts to vote twice
- **Non-Participant**: Informative messages when unregistered users attempt to vote
- **Transaction Failures**: User-friendly error messages with recovery options
- **Network Issues**: Resilient connections with retry mechanisms

## 🌱 Future Enhancements

- **Mobile Application**: Native mobile apps for iOS and Android
- **DAO Integration**: Governance features for community-run elections

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

For questions or feedback, please open an issue or contact the development team.

---

Built with ❤️ using Next.js, Ethereum, and Zero-Knowledge Proofs.
