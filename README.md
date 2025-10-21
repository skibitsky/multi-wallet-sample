# Multi-Wallet Test App

A React application built to test Reown AppKit's multi-wallet functionality. This app allows you to connect multiple wallets simultaneously and switch between them.

## Features

- **Multi-Wallet Support**: Connect multiple wallets at the same time
- **Switch Between Wallets**: Easily switch the active wallet
- **Connection Management**: View, delete, and disconnect wallet connections
- **Recent Connections**: Quick access to recently connected wallets
- **Real-time Updates**: Live connection status and updates

## Tech Stack

- React 19
- Vite 7
- TypeScript
- pnpm
- Reown AppKit (with Wagmi adapter)
- wagmi & viem

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- A Reown Project ID (get one at https://cloud.reown.com)

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Configure your project ID:

   - Copy `.env.example` to `.env`
   - Get your project ID from https://cloud.reown.com
   - Add it to `.env`:

   ```
   VITE_PROJECT_ID=your_project_id_here
   ```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Test Multi-Wallet Functionality

1. **Connect First Wallet**:

   - Click the "Connect Wallet" button in the header
   - Select a wallet and complete the connection

2. **Connect Additional Wallets**:

   - Click "Connect Wallet" again
   - Select a different wallet or account
   - You'll now see both wallets in the "Connected Wallets" section

3. **Switch Between Wallets**:

   - Click the "Switch" button next to any connected wallet
   - The active wallet will change

4. **Manage Connections**:

   - **Delete**: Removes the connection from the list
   - **Disconnect**: Fully disconnects the wallet

5. **Recent Connections**:
   - Previously connected wallets appear in the "Recent Connected Wallets" section
   - Click "Reconnect" to quickly connect them again

## Project Structure

```
src/
├── components/
│   └── MultiWalletTest.tsx    # Main multi-wallet test component
├── config.ts                   # AppKit configuration with multi-wallet enabled
├── App.tsx                     # Main app component
├── main.tsx                    # App entry point with providers
└── ...
```

## Key Configuration

Multi-wallet is enabled in `src/config.ts`:

```typescript
export const modal = createAppKit({
  // ... other config
  features: {
    analytics: true,
  },
});
```

## AppKit Hooks Used

- `useAppKitState()`: Get AppKit state including multi-wallet enabled status
- `useAppKitConnections()`: Get active and recent connections
- `useAppKitConnection()`: Switch and delete connections
- `useDisconnect()`: Disconnect wallets

## References

- [Reown AppKit Documentation](https://docs.reown.com/appkit)
- [AppKit Lab Example](https://github.com/reown-com/appkit/tree/main/apps/laboratory)

## Notes

- Multi-wallet is a new feature in Reown AppKit
- Make sure you have the latest version of AppKit installed
- The feature must be explicitly enabled in the configuration

## License

MIT
