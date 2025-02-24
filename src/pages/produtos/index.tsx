import Header from '@/src/components/Header'
import Head from 'next/head'
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import styles from './styles.module.scss'
import { useState } from 'react'
import { setupAPIClient } from '@/src/services/api'
import { toast } from 'react-toastify'
import { FiTrash2 } from 'react-icons/fi'
import { canSSRAuth } from '@/src/utils/canSSRAuth'
import { useRouter } from 'next/router'
import { FiUpload } from 'react-icons/fi'

type ClienteProps={
    id: string;
    name: string;
    email: string;
    admin: boolean,
    created_at: string;
    updated_at: string;
}
type ItemProps={
    id: string;
    name: string;
}
type MarcasProps={
    id: string;
    name: string;
}
type ObjetivosProps={
    id: string;
    name: string;
}
type CategoriaProps = {
    cliente: ClienteProps; // ajuste o tipo conforme necessário
    categorias: ItemProps[];
    marcas: MarcasProps[];
    objetivos:ObjetivosProps[];
  };



export default function Categoria({cliente,categorias,marcas,objetivos}:CategoriaProps) {
    const apiClient= setupAPIClient()
    //State da imagem do Produto!
    const [avatarProdutoURL,setAvatarProdutoURL]=useState("")
    const [imageAvatarProdutoURL,setImageAvatarProdutoURL]=useState(null)

    //State da imagem da Tabela
    const [avatarMarcaURL,setAvatarMarcaURL]=useState('')
    const [imageAvatarMarcaURL,setImageAvatarMarcaURL]=useState(null)

    const [nomeProduto,setNomeProduto]=useState('')
    const [categoriaSelecionada,setCategoriaSelecionada] = useState(0)
    const [marcaSelecionada,setMarcaSelecionada]= useState(0)
    const [objetivoSelecionada,setObjetivoaSelecionada]= useState(0)
    const [valor,setValor]=useState('')
    const [desconto,setDesconto]=useState('')
    const [sabor,setSabor]=useState('')
    const [descricaoProduto,setDescricaoProduto]=useState('')
    const [beneficios,setBeneficios]=useState('')
    const [uso,setUso]=useState('')
    const [listprodutos,setListProdutos]=useState([])
    const router = useRouter()

    function handleChangeCategoria(event){
        setCategoriaSelecionada(event.target.value)
    }

    function handleChangeMarca(event){
        setMarcaSelecionada(event.target.value)
    }
    function handleChangeObjetivo(event){
        setObjetivoaSelecionada(event.target.value)
    }
    

    function HandleFileProduto(event:ChangeEvent<HTMLInputElement>){

        if(!event.target.files){
            return
        }
        const image = event.target.files[0] 

        if(!image){
            return
        }
        if(image.type==='image/png'||image.type==='image/jpeg'){
            setImageAvatarProdutoURL(image)
            setAvatarProdutoURL(URL.createObjectURL(event.target.files[0]))
        }

    }

    function HandleFileTabela(event:ChangeEvent<HTMLInputElement>){
        if(!event.target.files){
            return
        }

        const image = event.target.files[0]

        if(!image){
            return
        }

        if(image.type==='image/png'||image.type==='image/jpeg'){
            setImageAvatarMarcaURL(image)
            setAvatarMarcaURL(URL.createObjectURL(event.target.files[0]))
        }
    }

    async function loadMarcas(){
        const response = await apiClient.get('/listprodutos')
        setListProdutos(response.data)
    }

    async function handleRegister(event:FormEvent){
        event.preventDefault()
        
        try{
            const data = new FormData()

            if (nomeProduto===''||valor===''||categoriaSelecionada===null||marcaSelecionada===null){
                toast.error('Preencha os campos, nome e valor!')
                return
            }

            data.append('file',imageAvatarProdutoURL)
            if(imageAvatarMarcaURL){
                data.append('fileTabela',imageAvatarMarcaURL)
            }
            
            data.append('name', nomeProduto)
            data.append('valor', valor)
            data.append('desconto',desconto)
            data.append('sabor',sabor)
            data.append('descricao', descricaoProduto)
            data.append('beneficio',beneficios)
            data.append('uso',uso)
            data.append('marca_id',marcas[marcaSelecionada].id)
            data.append('categoria_id',categorias[categoriaSelecionada].id)
            data.append('objetivo_id',objetivos[objetivoSelecionada].id)

            await apiClient.post('/produto',data)
            loadMarcas(); 
            toast.success('Cadastro realizado com sucesso')
        }catch(error){
            console.log(error)
        }

         
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
            <title>Draco Suplementos - Produtos</title>
        </Head>
        <Header/>
        <main >
            
            <div className={styles.container}>
                <h2>Novo Produto</h2>
                <form className={styles.form} onSubmit={handleRegister}>

                  
                    <input
                        type='text'
                        placeholder='Nome do Produto'
                        className={styles.input}
                        value={nomeProduto}
                        onChange={(e)=>setNomeProduto(e.target.value)}
                    />
                    <div className={styles.inputUpload}>

                        <label className={styles.labelAvatarProduto}>
                            <span>
                                <FiUpload size={25}  color={'#F2B21A'}/>
                            </span>
                            
                            <input
                                type="file"
                                accept='image/png, image/jpeg'
                                onChange={HandleFileProduto}
                            />
                            {avatarProdutoURL&&(
                                <img 
                                    className={styles.preview} 
                                    src={avatarProdutoURL} 
                                    alt='Foto do Produto' 
                                    width={250} 
                                    height={250} 
                                />
                            )}
                            

                        </label>

                        <label className={styles.labelAvatarTabela}>
                            <span> 
                                <FiUpload size={25}  color={'#F2B21A'}/>
                            </span>

                            <input
                                type="file"
                                accept='image/png, image/jpeg'
                                onChange={HandleFileTabela}
                            />
                            {avatarMarcaURL&&(
                                <img
                                    className={styles.preview}
                                    src={avatarMarcaURL}
                                    alt='Foto da Tabela'
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>


                    </div>
                    
                    
                    {(categorias.length<=0||marcas.length<=0)?(
                            
                            <div className={styles.spanText}>
                                <span>Cadastre categorias e marcas!</span>
                            </div>
                            
                        ):(
                            <div className={styles.containerSelect} >

                                <select className={styles.select} onChange={handleChangeCategoria} value={categoriaSelecionada}>
                                    {categorias.map((categoria,index) => (
                                        <option key={categoria.id} value={index}>{categoria.name}</option>
                                    ))}
                                </select>


                                <select className={styles.select} onChange={handleChangeMarca} value={marcaSelecionada}>
                                    {marcas.map((marca,index) => (
                                        <option key={marca.id}  value={index}>{marca.name}</option>
                                    ))}
                                </select>

                                <select className={styles.select} onChange={handleChangeObjetivo} value={objetivoSelecionada}>
                                    {objetivos.map((objetivo,index) => (
                                        <option key={objetivo.id}  value={index}>{objetivo.name}</option>
                                    ))}
                                </select>

                            </div>   
                        )
                    }
                   
                    
                        
                    
                    
                    <div className={styles.formOption}>
                        <input
                            type='text'
                            placeholder='Valor'
                            className={styles.input}
                            value={valor}
                            onChange={(e)=>setValor(e.target.value)}
                        />

                        <input
                            type='text'
                            placeholder='Desconto'
                            className={styles.input}
                            value={desconto}
                            onChange={(e)=>setDesconto(e.target.value)}
                        />

                        <input
                            type='text'
                            placeholder='Sabor'
                            className={styles.input}
                            value={sabor}
                            onChange={(e)=>setSabor(e.target.value)}
                        />

                    </div>
                    <textarea
                        placeholder='Descrição'
                        value={descricaoProduto}  
                        onChange={(e)=>setDescricaoProduto(e.target.value)}
                    >
                    </textarea>
                    <textarea
                        placeholder='Benefícios'
                        value={beneficios}  
                        onChange={(e)=>setBeneficios(e.target.value)}
                    >
                    </textarea>
                    <textarea
                        placeholder='Modo de uso'
                        value={uso}  
                        onChange={(e)=>setUso(e.target.value)}
                    >
                    </textarea>
                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </div>
            <div className={styles.container}>
                <h2>Produtos</h2>
                {listprodutos?.map((produto)=>{
                    return (
                        <div className={styles.content} key={produto.id}>
                            
                            <span>{produto.name}</span>
                            <div className={styles.left}><FiTrash2 color='#ff3f4b'/></div>
                        </div>
                    )
                })}
            </div>
            
        </main>    
    </>
  )
}

export const getServerSideProps = canSSRAuth(async(ctx)=>{
    const apiClient =  setupAPIClient(ctx)
    const [userDetalhesResponse,categoriasResponse,marcasResponses,objetivosResponses]= await Promise.all([
        apiClient.get('/userdetalhes'),
        apiClient.get('/categorias'),
        apiClient.get('/marcas'),
        apiClient.get('/objetivos')
    ])
    return {
        props:{cliente:userDetalhesResponse.data,categorias:categoriasResponse.data,marcas:marcasResponses.data,objetivos:objetivosResponses.data}
    }
})