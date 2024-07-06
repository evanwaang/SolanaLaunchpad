const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile } = require('@metaplex-foundation/js');
const { Key } = require('@metaplex-foundation/mpl-token-metadata');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');
const fs = require('fs');

const keypairFile = fs.readFileSync();
const secretKey = new Uint8Array(JSON.parse(keypairFile));
const keypair = Keypair.fromSecretKey(secretKey);


const connection = new Connection();
const wallet = Keypair.generate();
const metaplex = Metaplex.make(connection)
    .use(keypairIdentity(keypair))
    .use(irysStorage());




async function uploadMetadata(name, symbol, description, image) {

  image = toMetaplexFile(image, 'image.png')
  const { uri } = await metaplex.nfts().uploadMetadata({
    name: name,
    symbol: symbol,
    image: image,
    description: description
  });
  console.log(uri); 
  return uri;
  
}

module.exports = uploadMetadata;