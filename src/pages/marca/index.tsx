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
    const [marcas,setMarcas]=useState([])
    const router = useRouter()


    async function loadMarcas(){
        try {
            const apiClient= setupAPIClient()
            const response = await apiClient.get('/marcas')
            setMarcas(response.data)  
        } catch (error) {
            toast.error("Error ao carregar as categorias")
            console.error(error.response)
            
        }
        
    }

    async function handleRegister(event:FormEvent){
        event.preventDefault()
        if (name===''){
            toast.warn('Por favor, cadastre um nome a marca')
            return
        }
        const apiClient = setupAPIClient()

        try {
            await apiClient.post('/marca',{
                name:name
            })
            loadMarcas();
            toast.success('Cadastro realizado com sucesso')
            setName('')
        } catch (error) {
            toast.error(error.response.data.error)
            console.log(error.response.data.error)
        }
       
        
    }

    async function handleDelete(id:string) {
        try{
            const apiClient= setupAPIClient()
            const response = await apiClient.delete(`/marcadelete?marca_id=${id}`)
            toast.success('Marca excluída com sucesso')
            loadMarcas()
        }catch(error){
            console.log(error)
            toast.error('Erro ao excluir marca')
        }
        
    }
    async function handleUpdate(){
        toast.success('Marca atualizadas sucesso')
        loadMarcas()
    }

    useEffect(()=>{

        loadMarcas()
    },[])
   
    useEffect(()=>{
        if (!cliente.admin){
            router.push('/dashboard')
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
                <h2>Nova Marca</h2>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type='text'
                        placeholder='Digite o nome da marca'
                        className={styles.input}
                        value={name}
                        onChange={(e)=>setName(e.target.value)} 
                    />
                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
            {marcas&&(
                <div className={styles.container}>

                    <div className={styles.attButton}>
                        <h2>Marcas</h2>
                        <div onClick={handleUpdate} className={styles.rotate}> <BsArrowRepeat size={20} color='#F2B21A' /></div>             
                    </div>      

                    {marcas?.map((marca)=>{
                        return (
                            <div className={styles.content} key={marca.id}>
                                <span>{marca.name}</span>
                                <div className={styles.left} onClick={()=>handleDelete(marca.id)}><FiTrash2 size={20} color='#ff3f4b'/></div>
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