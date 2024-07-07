import { FC, useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import Image from 'next/image'

export const AppBar: FC = () => {

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
      setDomLoaded(true);
    }, []);

    
    return (
        <>
        {domLoaded && (
          <div className={styles.AppHeader}>
            
            <Image src="/solanaLogo.png" height={30} width={200} alt="Solana Logo" />
            <span>Solana Launchpad</span>
            <WalletMultiButton></WalletMultiButton>
        </div>
        )}
        </>
    )
}