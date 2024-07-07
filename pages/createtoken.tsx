import { useState } from 'react';
import { NextPage } from 'next';

import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import  CreateWallet from '../components/CreateWallet'
import { useWallet } from '../components/useWalletContext';

const Createtoken: NextPage = () => {

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [revokeMint, setRevokeMint] = useState(false);
  const [revokeFreeze, setRevokeFreeze] = useState(false);
  const [decimals, setDecimals] = useState(0);
  const [amount, setAmount] = useState(0);
  const { wallet } = useWallet();
  const [showWallet, setShowWallet] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  const handleShowWallet = () => {
    setShowWallet(!showWallet);
  };



  return (
    <div>
    


  
        
        <AppBar></AppBar>

      
    <button onClick={handleShowWallet}>Toggle Wallet Info</button>
    {showWallet && wallet && (
        <div>
          <h2>Wallet Info</h2>
          <p>Public Key: {wallet.publicKey.toString()}</p>
          {/* Don't display private key in a real application */}
          <p>Private Key: {wallet.secretKey.toString()}</p>
        </div>
      )}


    <h1>Create a token</h1>

    <CreateWallet></CreateWallet>
    
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Symbol" />
      <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <label>
        <input type="checkbox" checked={revokeMint} onChange={(e) => setRevokeMint(e.target.checked)} />
        Revoke Mint
      </label>
      <label>
        <input type="checkbox" checked={revokeFreeze} onChange={(e) => setRevokeFreeze(e.target.checked)} />
        Revoke Freeze
      </label>
      <label>
      Decimals
      <input type="number" value={decimals} onChange={(e) => setDecimals(Number(e.target.value))} placeholder="Decimals" />
      
      </label>
      <label>
      Amount
      <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} placeholder="Amount" />
        
      </label>
      <button type="submit">Create Token</button>
    </form>


   
    </div>
    
  );



  
};

export default Createtoken;