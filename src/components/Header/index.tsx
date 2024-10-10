import Link from 'next/link'
import styles from './styles.module.scss'
import { FiMenu,FiLogOut } from 'react-icons/fi'
import { AuthContext } from '@/src/contexts/AuthContext'
import { useContext, useState } from 'react'

export default function Header() {
    const{signOut}=useContext(AuthContext)
    async function handleLogout(){
        signOut()
    }

    const [menuOpen,setMenuOpen]=useState(false)
    function showMenu(){
        setMenuOpen(!menuOpen)
    }


    return (
    <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
            <Link href={'/'}>
                <div className={styles.title}><h1>Draco</h1><span>Suplementos</span></div>
            </Link>
            <div className={styles.menuNav} >
                <div className={styles.menuLarge}>

                    <Link href={'/'}>
                        <p>Dashboard</p>
                    </Link>
                    <Link href={'/marca'}>
                        <p>Marcas</p>
                    </Link>
                    <Link href={'/objetivo'}>
                        <p>Objetivos</p>
                    </Link>
                    <Link href={'/categoria'}>
                        <p>Categorias</p>
                    </Link>
                    <Link href={'/produtos'}>
                        <p>Produtos</p>
                    </Link>
                    <Link href={'/pedidos'}>
                        <p>Pedidos</p>
                    </Link>
                    <button onClick={handleLogout}>
                        <FiLogOut size={26} color='#F2B21A' />
                    </button>

                </div>

                <div className={styles.menuHamburger} onClick={showMenu}>
                    <FiMenu size={26} color='#F2B21A'/>
                </div>

              
            </div>
            
        </div>
        {menuOpen &&(
            <div className={styles.menuDropdown}>
                
                <Link href={'/'}>
                        <p>Dashboard</p>
                    </Link>
                    <Link href={'/marca'}>
                        <p>Marcas</p>
                    </Link>
                    <Link href={'/objetivo'}>
                        <p>Objetivos</p>
                    </Link>
                    <Link href={'/categoria'}>
                        <p>Categorias</p>
                    </Link>
                    <Link href={'/produtos'}>
                        <p>Produtos</p>
                    </Link>
                    <Link href={'/pedidos'}>
                        <p>Pedidos</p>
                    </Link>
                <button onClick={handleLogout}>
                    <FiLogOut size={26} color='#F2B21A' />
                </button>

            </div>
        )}
    </header>
  )
}
