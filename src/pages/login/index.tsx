import { FormEvent, useContext, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import logoImg from '../../../public/8f07c3.png'
import styles from "./styles.module.scss";
import {Input,TextArea} from "../../components/ui/Input";
import Button from "../../components/ui/Button/Index";

import { AuthContext } from "../../contexts/AuthContext";
import { GetServerSideProps } from "next";

import { canSSRGuest } from "../../utils/canSSRGuest";

import Link from "next/link";
import { api } from "../../services/apiClient";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)


  const {isAuthenticated,signIn,user}=useContext(AuthContext)
  async function handleLogin(event:FormEvent){
    event.preventDefault()
    if (email===''||password ===''){
      toast.error('Preenchas os dados')
      return;
    }
    setLoading(true)
    let data={
      email,
      password
    }

    await signIn(data)
    setLoading(false)
  }
  return (
    <>
      <Head>
      	<title>Draco Suplementos - Faça seu Login</title>
      </Head>
      
      <main className={styles.container}>
        <Image className={styles.logoImg} src={logoImg} alt="logo draco suplementos" />
        <div className={styles.logoName}>
          <h1>
            Draco
          </h1>
          <h2>Suplementos</h2>
        </div>
        <div className={styles.login}>

            <form className={styles.formLogin} onSubmit={handleLogin}>
              <Input 
                placeholder="Digite seu email"
                type="text"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
              <Input
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
              <Button
                type="submit"
                loading={loading}
              >
                Acessar
              </Button>
            </form>

            
        </div>
        <p className={styles.textCatching}>Não possui uma conta? <Link href="/cadastro">cadastre-se</Link> aqui! </p>
      </main>
    </>
  );
}


export const getServerSideProps=canSSRGuest(async (ctx)=>{
  return{
    props:{}
  }
})