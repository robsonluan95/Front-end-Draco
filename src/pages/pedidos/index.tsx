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

type PedidoProps={
    id:string;
    status: boolean;
    rascunho: boolean;
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    user_id:string;
    created_at: string;
    updated_at: string;
}
type ClienteProps={
    id: string;
    name: string;
    email: string;
    admin: boolean,
    created_at: string;
    updated_at: string;
}
type PedidosProps={
    pedidos: PedidoProps[];
}

export default function Categoria({cliente}) {
    const [user,setUser]=useState()
    const [pedidos,setPedidos]=useState<PedidoProps[]>([])
    const router = useRouter()


    async function loadPedidos(){
        try {
            const apiClient= setupAPIClient()
            const response = await apiClient.get('/pedidos')
            setPedidos(response.data)
        } catch (error) {
            toast.error("Error ao carregar aos pedidos!")
            console.error(error.response.data)
        }
        
        
    }

    async function handleShowUser(id:string) {
        toast.success(id)
        try{
            const apiClient= setupAPIClient()
            const response = await apiClient.post(`/usuariodetalhes`,{user_id:id});
            console.log(response.data)//4454f36f-742c-4dd0-b7f6-b7d4b6612bc4   417da463-c5ea-4de2-8c55-5f22a477d48c
            setUser(response.data)
            
        }catch(error){
            console.log(error)
        }
        
        
        
    }


    async function handleDelete(id:string) {
        try{
            const apiClient= setupAPIClient()
            const response = await apiClient.delete(`/pedido?pedido_id=${id}`)
            toast.success('Pedido excluída com sucesso')
            loadPedidos()
        }catch(error){
            console.log(error)
            toast.error('Erro ao excluir pedido')
        }
        
    }
    async function handleUpdate(){
        toast.success('Pedido atualizadas sucesso')
        loadPedidos()
    }

    useEffect(()=>{

        loadPedidos()
    },[])
   
    useEffect(()=>{
        if (!cliente.admin){
            router.push('/dashboard')
        }
        
    },[cliente.admin])
   
  return (
    
    <>
        <Head>
            <title>Draco Suplementos - Pedidos</title>
        </Head>
        <Header/>
        <main >
            

            {pedidos&&(
                <div className={styles.container}>

                    <div className={styles.attButton}>
                        <h2>Pedidos</h2>
                        <div onClick={handleUpdate} className={styles.rotate}> <BsArrowRepeat size={20} color='#F2B21A' /></div>             
                    </div>      

                    {pedidos?.map((pedido)=>{
                        return (
                            <div className={styles.content} key={pedido.id} onClick={()=>handleShowUser(pedido.user_id)}>
                                <span>{pedido.id}</span>
                                <div className={styles.left} onClick={()=>handleDelete(pedido.id)}><FiTrash2 size={20} color='#ff3f4b'/></div>
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