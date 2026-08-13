# Wallet Monitor

A safe, professional wallet-monitoring starter for local development and future testnet use. It supports a dry-run mode that never broadcasts transactions and can run without a private key.

## What this project does

- monitors a wallet address for balance checks
- works in local development without a real RPC connection
- supports a mock wallet address and mock balance for testing
- logs a simulated transaction instead of broadcasting it in dry-run mode
- is structured so a real testnet wallet can be added later without touching the core logic

## Important safety rules

- no private key is required
- no private key is stored or exposed
- no wallet-draining or fund-sending logic is included
- all secrets live in `.env`, and `.env` is ignored by Git
- dry-run mode never calls a send function or broadcasts a transaction

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example environment file:

```bash
cp .env.example .env
```

3. Edit `.env` with your local values.

Example:

```env
PORT=3000
DRY_RUN=true
NETWORK_RPC_URL=
WATCH_WALLET_ADDRESS=0x1111111111111111111111111111111111111111
MOCK_BALANCE_ETH=1.5
```

## Run locally

```bash
npm run start
```

### Development mode

```bash
npm run dev
```

### Run tests

```bash
npm test
```

## Dry-run mode

When `DRY_RUN=true`, the app:

- does not require a private key
- does not connect to a live RPC unless you provide one
- uses a mock wallet and mock balance for local testing
- logs a readable description of the transaction it would have created
- never sends a transaction to the network

## API

### Health check

```http
GET /health
```

### Wallet status

```http
GET /wallet?address=0x1111111111111111111111111111111111111111
```

### Simulated transaction preview

```http
POST /simulate
```

Example body:

```json
{
  "to": "0x2222222222222222222222222222222222222222",
  "value": "0.1",
  "note": "Sample transfer preview"
}
```

The response includes the planned transaction details and a `wouldBroadcast: false` flag.

## Modular structure

- `src/config.js` handles environment configuration
- `src/mock-wallet.js` defines mock wallet data for local testing
- `src/monitor.js` performs optional RPC or mock balance checks
- `src/transaction-simulator.js` builds a dry-run transaction preview
- `src/index.js` exposes the API and wires the app together

This keeps the project safe for development while allowing a real testnet wallet integration later with minimal changes.
