const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile } = require('@metaplex-foundation/js');
const { Key } = require('@metaplex-foundation/mpl-token-metadata');
const { Connection, clusterApiUrl, Keypair } = require('@solana/web3.js');








async function uploadMetadata(name, symbol, description, image, keypair, connection) {


  const metaplex = Metaplex.make(connection)
  .use(keypairIdentity(keypair))
  .use(irysStorage());

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