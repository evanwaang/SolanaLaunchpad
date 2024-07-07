import { createContext, useContext } from 'react';
import { Keypair } from '@solana/web3.js';

interface WalletContextProps {
  wallet: Keypair | null;
  setWallet: React.Dispatch<React.SetStateAction<Keypair | null>>;
}

export const WalletContext = createContext<WalletContextProps | null>(null);

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === null) {
    throw new Error('useWallet must be used within a CreatedWalletProvider');
  }
  return context;
}