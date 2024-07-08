// main.ts

import { Metaplex, keypairIdentity, irysStorage, toMetaplexFile, MetaplexFile } from '@metaplex-foundation/js';
import { Key } from '@metaplex-foundation/mpl-token-metadata';
import { Connection, clusterApiUrl, Keypair } from '@solana/web3.js';

// import { createToken } from './create_token';

const connection = new Connection('https://mainnet.helius-rpc.com/?api-key=a78d80e6-ce3a-4c9f-81a1-d6dedf6e70c2');




interface TokenInfo {
  amount: number;
  decimals: number;
  metadata: string;
  symbol: string;
  tokenName: string;
}

interface MetadataForToken {
  name: string;
  symbol: string;
  image: string;
  description: string;
}



async function uploadMD(name: string, symbol: string, description: string, image: Buffer, keypair: Keypair, connection: Connection): Promise<string> {
  const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(irysStorage());

  const metaplexFile = toMetaplexFile(image, 'image.png');
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: name,
    symbol: symbol,
    image: metaplexFile,
    description: description
  });
  console.log(uri);
  return uri;
}

async function main(
  NFT_STORAGE_TOKEN: string,
  revokeMintBool: boolean,
  revokeFreezeBool: boolean,
  tokenInfo: TokenInfo,
  metaDataforToken: MetadataForToken,
  connection: Connection,
  myKeyPair: Keypair
): Promise<void> {

  console.log("Got to main");
  const metadata_url = await uploadMetaData(metaDataforToken, myKeyPair);

  console.log("MD uploaded");
  if (!metadata_url) {
    console.log("Metadata failed");
    return;
  }
  tokenInfo.metadata = metadata_url;

  console.log("Creating Token...");

  // CHANGE THIS TO YOUR MINT ADDRESS
  const mintAddress = "test"
  
  // await createToken(connection, myKeyPair, tokenInfo, revokeMintBool, revokeFreezeBool);
  console.log(`Mint Link: https://solscan.io/token/${mintAddress.toString()}`);
}

async function uploadMetaData( metaDataforToken: MetadataForToken, keypair: Keypair): Promise<string | null> {

  const response = await fetch('/api/image');
  const base64 = await response.text();
  const buffer = Buffer.from(base64, 'base64');

  console.log("Uploading metadata");
  try {
    const uri = await uploadMD(
      metaDataforToken.name,
      metaDataforToken.symbol,
      metaDataforToken.description,
      buffer,
      keypair,
      connection
    );
    return uri;
  } catch (error) {
    console.log("Error uploading metadata");
    return null;
  }
}

export default main;