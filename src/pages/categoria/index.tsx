import Header from '@/src/components/Header'
import Head from 'next/head'
import React, { FormEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { useState } from 'react'
import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'
import { FiTrash2 } from 'react-icons/fi'
import { FiUpload } from 'react-icons/fi'

export default function Categoria() {
    const [name,setName]=useState('')
    const [categorias,setCategorias]=useState([])

    async function loadCategorias(){
        const apiClient= setupAPIClient()
        try{
            const response = await apiClient.get('/categorias')
            setCategorias(response.data)
        }catch(error){
            toast.error("Error ao carregar as categorias")
            console.error("Error ao carregar as categorias: " , error)
        }
        
    }

    async function handleRegister(event:FormEvent){
        event.preventDefault()
        if (name===''){
            toast.warn("Por favor,insira um nome para a categoria.")
            return; 
        }
        const apiClient = setupAPIClient()
        try {
            await apiClient.post('/categoria',{
                name:name
            })
            loadCategorias(); 
            toast.success('Cadastro realizado com sucesso')
            setName('')
        } catch (error) {
            toast.error(error.response.data.error)
            console.log('Erro ao cadastrar categoria:',error.response.data.error)
        }
    }

    useEffect(()=>{
        loadCategorias()
    },[])
  return (
    
    <>
        <Head>
            <title>Categorias</title>
        </Head>
        <Header/>
        <main >
            
            <div className={styles.container}>
                <h2>Nova categoria</h2>
                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type='text'
                        placeholder='Digite o nome da categoria'
                        className={styles.input}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />
                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
            <div className={styles.container}>
                <h2>Categorias</h2>
                {categorias?.map((categoria)=>{
                    return (
                        <div className={styles.content} key={categoria.id}>
                            
                            <span>{categoria.name}</span>
                            <div className={styles.left}><FiTrash2 color='#ff3f4b'/></div>
                        </div>
                    )
                })}
            </div>
            
        </main>    
    </>
  )
}

