import React, { useState } from 'react';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import { useWallet } from './useWalletContext';




const CreateWallet: React.FC = () => {
    const [showPrivateKey, setShowPrivateKey] = useState(false);
    const [privateKeySaved, setPrivateKeySaved] = useState(false);
    const [revealPrivateKey, setRevealPrivateKey] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [privateKey, setPrivateKey] = useState('');

    const { wallet, setWallet } = useWallet();

    const downloadKeypair = () => {
        const keypair = { publicKey, privateKey };
        const data = new Blob([JSON.stringify(keypair)], { type: 'text/plain' });
        const url = URL.createObjectURL(data);

        const link = document.createElement('a');
        link.download = 'keypair.json';
        link.href = url;
        link.click();

        URL.revokeObjectURL(url);
    };

    const generateWallet = () => {
        const newWallet = Keypair.generate();
        
        const privateKeyBase58 = bs58.encode(newWallet.secretKey);

        // Set the public and private keys in state
        setPublicKey(newWallet.publicKey.toString());
        setPrivateKey(privateKeyBase58);
        setWallet(newWallet);
    
        // Show the private key
        setShowPrivateKey(true);
    };

    const handlePrivateKeySaved = () => {
        // Logic to handle when the private key is saved
        // ...
        setPrivateKeySaved(true);

        // Hide the private key
        setRevealPrivateKey(false);
    };

    const handleRevealPrivateKey = () => {
        setRevealPrivateKey(true);
    };

    return (
        <div>
            <button onClick={generateWallet}>Create Wallet</button>
            {showPrivateKey && !privateKeySaved && (
                <div>
                    <p>Public Key: {publicKey}</p>
                    {!revealPrivateKey ? (
                        <button onClick={handleRevealPrivateKey}>Reveal Private Key</button>
                    ) : (
                        <>
                            <p>Private Key: {privateKey}</p>
                            <button onClick={handlePrivateKeySaved}>I've saved my private key</button>
                            <button onClick={downloadKeypair}>Download Keypair</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreateWallet;