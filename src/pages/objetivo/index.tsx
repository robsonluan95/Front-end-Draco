import Header from '@/src/components/Header'
import Head from 'next/head'
import React, { FormEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { useState } from 'react'
import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'
import { BsArrowRepeat  } from "react-icons/bs";
import { FiTrash2,FiRotateCw } from 'react-icons/fi'
import { canSSRAuth } from '@/src/utils/canSSRAuth'

import { useRouter } from 'next/router'



export default function Categoria({cliente}) {
    const [name,setName]=useState('')
    const [objetivo,setObjetivo]=useState([])
    const router = useRouter()


    async function loadObjetivo(){
        const apiClient= setupAPIClient()
        const response = await apiClient.get('/objetivos')
        setObjetivo(response.data)
    }

    async function handleRegister(event:FormEvent){
        event.preventDefault()
        if (name===''){
            return
        }
        const apiClient = setupAPIClient()
        try {
            await apiClient.post('/objetivo',{
                name:name
            })
            loadObjetivo(); 
            toast.success('Cadastro realizado com sucesso')
            setName('')
        }catch(error){
            toast.error('Erro ao cadastrar objetivo')
        }
        
        
    }

    async function handleDelete(id:string) {
        try{
            const apiClient= setupAPIClient()
            const response = await apiClient.delete(`/objetivo?objetivo_id=${id}`)
            toast.success('Objetivo excluída com sucesso')
            loadObjetivo()
        }catch(error){
            console.log(error)
            toast.error('Erro ao excluir objetivo')
        }
        
    }
    async function handleUpdate(){
        toast.success('Objetivo atualizadas sucesso')
        loadObjetivo()
    }

    useEffect(()=>{

        loadObjetivo()
    },[])
   
    useEffect(()=>{
        if (!cliente.admin){
            router.push('/')
        }
        
    },[cliente.admin])
   
  return (
    
    <>
        <Head>
            <title>Draco Suplementos - Marcas</title>
        </Head>
        <Header/>
        <main >
            
            <div className={styles.container}>
                <h2>Nova Objetivo</h2>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type='text'
                        placeholder='Digite o nome da objetivo'
                        className={styles.input}
                        value={name}
                        onChange={(e)=>setName(e.target.value)} 
                    />
                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
            {objetivo&&(
                <div className={styles.container}>

                    <div className={styles.attButton}>
                        <h2>Objetivos</h2>
                        <div onClick={handleUpdate} className={styles.rotate}> <BsArrowRepeat size={20} color='#F2B21A' /></div>             
                    </div>      

                    {objetivo?.map((objetivo)=>{
                        return (
                            <div className={styles.content} key={objetivo.id}>
                                <span>{objetivo.name}</span>
                                <div className={styles.left} onClick={()=>handleDelete(objetivo.id)}><FiTrash2 size={20} color='#ff3f4b'/></div>
                            </div> 
                        )
                    })}
                </div>
            )}
            
            
        </main>    
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const apiClient =  setupAPIClient(ctx)
    const response = await apiClient.get('/userdetalhes')
    console.log(response.data)
    return {
        props:{cliente:response.data }
    }
})