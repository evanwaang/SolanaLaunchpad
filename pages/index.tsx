import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
// import { BalanceDisplay } from '../components/BalanceDisplay'
import { PingButton } from '../components/PingButton'
import Head from 'next/head'
import Link from 'next/link';

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>Solana Launchpad</title>
        <meta
          name="description"
          content="Solana Launchpad"
        />
         <link rel="icon" href="/sol.ico" />
      </Head>


      <WalletContextProvider>
        <AppBar></AppBar>

      </WalletContextProvider >
      <Link href="/createtoken">
        <button className={styles.myButton}> Create a token</button>
      </Link>
    </div>
  );
}

export default Home;