import Head from "next/head";
import Image from "next/image";
import { FormEvent, useState } from "react";
import logoImg from '../../../public/8f07c3.png'
import styles from "./styles.module.scss";
import { Input ,TextArea} from "@/src/components/ui/Input";
import Button from "@/src/components/ui/Button/Index";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { canSSRGuest } from "@/src/utils/canSSRGuest";

export default function Cadastro() {
  const {signUp}= useContext(AuthContext)
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)

  async function handleSignUp(event:FormEvent) {
    event.preventDefault()
    
    if (name===''||email===''||password===''){
      alert('Preencha todos os campos')
      return
    }
    setLoading(true)
    try{
      
      const data={
        name,
        email,
        password
      }
      await signUp(data)
      setLoading(false)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <Head>
      	<title>Draco Suplementos - Faça seu Cadastro</title>
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
            <form onSubmit={handleSignUp} className={styles.formLogin}>
            <Input 
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                />
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
                Cadastrar
              </Button>
            </form>

            
        </div>
        <p className={styles.textCatching}>Já possui uma conta? <Link href="/login">Faça login!</Link></p>
      </main>
    </>
  );
}
export const getServerSideProps = canSSRGuest(async (ctx)=>{
  return{
    props:{

    }
  }
} )