import  main  from './main';
const endpoint = "https://mainnet.helius-rpc.com/?api-key=a78d80e6-ce3a-4c9f-81a1-d6dedf6e70c2"
import { Connection, Keypair, } from '@solana/web3.js';
import fs from 'fs';

const keypairfile = fs.readFileSync('/Users/evanwang/.config/solana', 'utf-8');
const secretKey = new Uint8Array(JSON.parse(keypairfile));
const keypair = Keypair.fromSecretKey(secretKey);


let tokenInfo = {
    amount: 1000000000,
    decimals: 9,
    metadata: '',
    symbol: 'TBS',
    tokenName: 'Teletubbies'
}


let metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '',
    "description": `
                            One hundred eaters
                            They won't fit in one SUV (nah)
                            S-O-S, somebody rescue me
                            I got too many gyal, too many-many gyal, I got
                            They can last me the next two weeks (uh, huh)
                            Alright, like send the address through, please
                            `,
    "extensions": {
        "website": "https://kokiez.com/",
        "twitter": "https://twitter.com/kokiez",
        "telegram": "https://t.me/kokiez"
    },
    "tags": [ "SOLANA","MEME", "KOKIEZ"
    ],
    "creator": {
        "name": "KOKIEZ",
        "site": "https://github.com/kokiez"
    }
}

async function run() {
  const NFT_STORAGE_TOKEN = 'your-token';
  const revokeMintBool = false;
  const revokeFreezeBool = false;

  const tokenInfo = {    
    amount: 1000000000,
    decimals: 9,
    metadata: '',
    symbol: 'TBS',
    tokenName: 'Teletubbies'}; // Fill this with your token info

  const metaDataforToken = {
    "name": tokenInfo.tokenName,
    "symbol": tokenInfo.symbol,
    "image": '',
    "description": `
                            One hundred eaters
                            They won't fit in one SUV (nah)
                            S-O-S, somebody rescue me
                            I got too many gyal, too many-many gyal, I got
                            They can last me the next two weeks (uh, huh)
                            Alright, like send the address through, please
                            `,
  }; // Fill this with your metadata for token
  const connection = new Connection(endpoint); // Fill this with your connection
  const myKeyPair = {}; // Fill this with your key pair

  await main(NFT_STORAGE_TOKEN, revokeMintBool, revokeFreezeBool, tokenInfo, metaDataforToken, connection, keypair);
}

run();