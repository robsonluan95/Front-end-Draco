// HeaderDash.tsx

import React, { useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaCartShopping } from 'react-icons/fa6';
import { LuPhone } from 'react-icons/lu';
import { SiDragonframe } from 'react-icons/si';
import styles from './styles.module.scss';
import logoImg from '../../../public/8f07c3.png';
import { AuthContext } from '@/src/contexts/AuthContext';
import { BiLogIn } from "react-icons/bi";

const HeaderDash = () => {
  const { signOut, user } = useContext(AuthContext);

  async function handleLogout() {
    signOut();
    // Após o logout, se estiver no lado do cliente, redirecione para '/login'
    if (typeof window !== 'undefined') {
      window.location.href = '/login'; // Ou use router.push('/login') se preferir
    }
  }

  return (
    <div className={styles.containerHeaderDash}>

      <div className={styles.containerLogo}>
        <Image className={styles.logoImg} src={logoImg} alt="logo draco suplementos" />
        <div className={styles.fontDraco}>
          <h1>Draco</h1>
          <h2>Suplementos</h2>
        </div>
      </div>

      <div className={styles.containerHeaders}>
        {user ? (
          <div>
            <div className={styles.containerNavigation} onClick={handleLogout}>
              <IoLogOutOutline className={styles.draco} fontSize={25} color="#ff3f4b" />
              <div className={styles.contentLogin}>
                <p className={styles.contentTextLogin}>Bem-vindo!</p>
                <p><span>Sair</span></p>
              </div>
            </div>
            <div className={styles.dracoLogout}>
              <IoLogOutOutline className={styles.draco} fontSize={25} color="#ff3f4b" />
            </div>
          </div>
        ) : (
          <div>
            <div className={styles.containerNavigation}>
              <SiDragonframe className={styles.draco} fontSize={25} color="#F2B21A" />
              <div className={styles.contentLogin}>
                <p className={styles.contentTextLogin}>Olá! Seja bem-vindo!</p>
                <p><Link href='/login'><span>Entre</span></Link> ou <Link href='/cadastro'><span>Cadastre-se</span></Link></p>
              </div>
            </div>
            <div className={styles.dracoLogout}>
                <Link className={styles.contenteDracoLogout} href='/login'><SiDragonframe className={styles.draco} fontSize={25} color="#F2B21A" /><span>Login</span></Link>
                <Link className={styles.contenteDracoLogout}  href='/cadastro'><BiLogIn  className={styles.draco} fontSize={25} color="#F2B21A" /><span>Cadastre-se</span></Link>

                
                
            </div>
          </div>
        )}

        <div className={styles.containerNavigation}>
          <LuPhone className={styles.draco} fontSize={25} color="#F2B21A" />
          <div className={styles.contentWhats}>
            <p className={styles.contentTextLogin}>Fale Conosco</p>
            <p>Diretamente no <span>WhatsApp</span></p>
          </div>
        </div>
        <div className={styles.dracoLogout}>
          <LuPhone className={styles.draco} fontSize={25} color="#F2B21A" />
        </div>

        <div className={styles.containerNavigation}>
          <FaCartShopping className={styles.draco} fontSize={25} color="#F2B21A" />
          <div className={styles.contentLogin}>
            <p className={styles.contentTextLogin}>Meu carrinho</p>
            <p>Meus <span>Produtos</span></p>
          </div>
        </div>
        <div className={styles.dracoLogout}>
          <FaCartShopping className={styles.draco} fontSize={25} color="#F2B21A" />
        </div>

      </div>

    </div>
  );
};

export default HeaderDash;
