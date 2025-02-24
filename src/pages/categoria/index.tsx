import Header from '@/src/components/Header'
import Head from 'next/head'
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { useState } from 'react'
import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'
import { FiTrash2 } from 'react-icons/fi'
import { FiUpload } from 'react-icons/fi'
import {BsArrowRepeat} from 'react-icons/bs'
import { canSSRAuth } from '@/src/utils/canSSRAuth'

export default function Categoria() {
    const [name,setName]=useState('')
    const [categorias,setCategorias]=useState([])

    const [avatarFile,setAvatarFile]=useState('')
    const [file,setFile]=useState(null)

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
    async function handleUpdate(){
        toast.success('Categorias atualizados com sucesso')
        loadCategorias()

    }
    async function handleDelete(id:string){
        const apiClient = setupAPIClient()
        try{
            const response = await apiClient.delete(`categoriasdelete?categoria_id=${id}`)
            toast.success('Sucesso ao deletar categoria!')
            loadCategorias()
        }catch(error){
            toast.error("Erro ao deletar categoria! ")
            console.log(error)
           
        }
    }

    function handleFileCategory(event:ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return
        }

        const image = event.target.files[0]
        
        if(!image){
            return
        }

        if(image.type==='image/png'||image.type==='image/jpeg'){
            setFile(image)
            setAvatarFile(URL.createObjectURL(event.target.files[0]))
            console.log(avatarFile)
        }
        

    }

    async function handleRegister(event:FormEvent){
        event.preventDefault()

        try {
            const data = new FormData()
            const apiClient = setupAPIClient()
            if (name===''){
                toast.warn("Por favor,insira um nome para a categoria.")
                return; 
            }
            
            
            
            data.append("name",name)
            if (file){
                data.append('fileCategoria',file)
            }    

            await apiClient.post('/categoria',data)
            loadCategorias(); 
            toast.success('Cadastro realizado com sucesso')
            setName('')
            setFile(null)
            setAvatarFile('')
        } catch (error) {
            toast.error(error.response.data.error||"Error ao cadastrar categoria")
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
                    {/*IMAGE CATEGORIA*/}
                    <label className={styles.labelAvatarCategory}>
                        <span>
                            <FiUpload size={25} color={'#F2B21A'}/>
                        </span>

                        <input
                            type="file"
                            accept='image/png, image/jpeg'
                            onChange={handleFileCategory}
                        />
                        {avatarFile &&(
                            <img
                                className={styles.preview}
                                src={avatarFile}
                                alt="Foto da Categoria"
                                width={250}
                                height={250}
                            />
                        )}
                    </label> 
                    
                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
            <div className={styles.container}>
                <div className={styles.box}>
                    <h2>Categorias</h2>
                    <div onClick={handleUpdate} className={styles.rotate}> <BsArrowRepeat size={20} color='#F2B21A' /></div>  
                </div>
                
                {categorias?.map((categoria)=>{
                    return (
                        <div className={styles.content} key={categoria.id}>
                            
                            <span>{categoria.name}</span>
                            <div  className={styles.left} onClick={()=>handleDelete(categoria.id)}><FiTrash2 size={20} color='#ff3f4b'/></div>
                        </div>
                    )
                })}
            </div>
            
        </main>    
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const apiClient = setupAPIClient(ctx)
    const [categoriasResponse] = await Promise.all([
        apiClient.get('categorias')
    ])
    return {
        props:{categorias:categoriasResponse.data}
    }
})