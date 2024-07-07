import { useState } from 'react';
import { NextPage } from 'next';

import main from '../utilities/main';
import { AppBar } from '../components/AppBar'
import  CreateWallet from '../components/CreateWallet'
import { useWallet } from '../components/useWalletContext';


const {
    Connection,
    Keypair,
} = require('@solana/web3.js');






const endpoint = "https://mainnet.helius-rpc.com/?api-key=a78d80e6-ce3a-4c9f-81a1-d6dedf6e70c2";
const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NzM2MmYzNi0wOWUyLTQzOGUtODgzNi01NWJkM2YxMjAzNWEiLCJlbWFpbCI6ImV2YW53YW5nMjAwMkBwcm90b24ubWUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZWJmZDQyMTgyYTI5ZDM0ZjhiMjkiLCJzY29wZWRLZXlTZWNyZXQiOiI3MzA0YWMyZDRlMTE4YTkyN2ZiN2RjOTA3NDA3MzJmMWNlYzQ0ODEyYTMyZDcyYjE0NzU3MDQ1ZjY5N2IyNGNkIiwiaWF0IjoxNzE5Njk1Nzk3fQ.FbQ0bO2bPSEAOx-BTg2g0SBRpMsu7N99DZLIxUwPYck';

const revokeMintBool = true
const revokeFreezeBool  = true




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

  const connection = new Connection(endpoint, 'confirmed');
    

  // Get form data
  const amount = event.target.elements.amount.value;
  const decimals = event.target.elements.decimals.value;
  const metadata = event.target.elements.metadata.value;
  const symbol = event.target.elements.symbol.value;
  const tokenName = event.target.elements.tokenName.value;
  const description = event.target.elements.description.value;

  // Store info in a variable
  let tokenInfo = {
    amount: amount,
    decimals: decimals,
    metadata: metadata,
    symbol: symbol,
    tokenName: tokenName
  };

  let metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '',
    "description": description
  };

  try {
    main(NFT_STORAGE_TOKEN, revokeMintBool, revokeFreezeBool, tokenInfo, metaDataforToken, connection, wallet);

} catch (error) {
    console.error(error);
    return
}




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
          <p>Public Key: {wallet}</p>
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