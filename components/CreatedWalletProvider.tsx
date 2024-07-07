import { useState } from 'react';
import { WalletContext } from './useWalletContext';
import { Keypair } from '@solana/web3.js';

export const CreatedWalletProvider: React.FC = ({ children }) => {
  const [wallet, setWallet] = useState<Keypair | null>(null);

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};