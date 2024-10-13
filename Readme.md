# AI Decentralized Escrow System

A decentralized escrow system built on the Polygon blockchain, allowing secure transactions between two parties (Payer and Payee) with the intervention of an Arbiter. The system ensures that funds are held in escrow and only released when both parties agree or after the resolution of disputes. In case of disagreements, the Arbiter, typically a legal entity, holds the authority to resolve disputes with the help of an AI-based court for decision-making suggestions powered by a language model (LLM) hosted on a Flask server.

## Features

- **Secure Escrow**: Funds are safely locked in the contract until the transaction is completed.
- **Arbiter Authority**: The Arbiter has control over releasing payments or refunding the payer.
- **Dispute Resolution**: If disputes arise, both parties (Payer and Payee) can raise flags to notify the Arbiter.
- **AI Court Assistance**: The Arbiter can consult an AI-based court for suggestions on resolving disputes.
- **LLM Integration**: A language model provides intelligent suggestions for dispute resolution.
- **Decentralized**: Built on Polygon, ensuring a decentralized and trustless environment.

## Tech Stack

### Blockchain & Frontend
- **Solidity**: Smart contract language used to write the escrow logic.
- **Polygon**: Layer 2 solution used for fast and low-cost transactions.
- **Foundry**: Development framework for writing and testing Solidity contracts.
- **React**: Frontend framework for building a user interface.
- **Wagmi & Viem**: Used for interacting with smart contracts and handling blockchain interactions on the frontend.
- **Alchemy**: Blockchain infrastructure provider.
- **Pinata & IPFS**: For decentralized file storage, when needed.

### Backend & AI
- **Flask**: Python-based web framework used to serve the LLM (Language Model) API for AI dispute resolution.
- **Large Language Model (LLM)**: An AI model providing context-based suggestions for dispute resolution.
- **REST API**: Flask server hosting the AI court which interacts with the frontend and provides suggestions based on case data.
  
## How It Works

1. **Escrow Initiation**:
   - The Payer initiates the escrow by creating a contract and depositing the funds.
   - An Arbiter (typically a legal body) is assigned to the escrow during contract creation.
  
2. **Dispute Mechanism**:
   - If the Payer or Payee has any dispute regarding the transaction, they can raise a dispute flag.
   - The Arbiter steps in to resolve the issue.
  
3. **AI Court**:
   - The Arbiter can consult an AI-based court system hosted on a Flask server. The court uses a language model (LLM) to provide suggestions on how to resolve disputes based on the case history and data.
   - This feature enhances fairness and ensures the decision is well-informed.

4. **Final Resolution**:
   - The Arbiter decides whether to release the funds to the Payee or refund the Payer based on the dispute and AI suggestions.

## Live Demo

Check out the live demo of the decentralized escrow system:  
[Deployed Application](https://ai-escrow-qe98.vercel.app/)

## Video Overview

Watch the project walkthrough on YouTube:  
[YouTube Video Link](#) *(https://youtu.be/ZFtmlE8Z2E8)*
