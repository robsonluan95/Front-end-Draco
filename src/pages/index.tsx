import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import banner from '../../public/0f32e77c-648b-4ad6-aad2-be1311c59ca8___56e7ffad21e805044b14e758c8ebf202.webp'


import { GoChevronLeft,GoChevronRight } from "react-icons/go";
import styles from "../styles/Home.module.scss";
import Card from '../components/Card/index'
import { setupAPIClient } from "../services/api";
import Link from "next/link";
import { AuthContext } from "../contexts/AuthContext";
import whey from '../../public/100-whey-protein-909g-optimum-nutrition-sabor-banana-com-morango_0.png'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import HeaderDash from "../components/HeaderDash";
import { CircleCategoria } from "../components/CircleCategoria";


type ProdutoProps={
    id: string;
    name: string;
    foto: string;
    tabela:string;
    valor: string;
    desconto: string;
    sabor: string;
    descricao: string;
    beneficio: string;
    uso: string;
    created_at: Date;
    updated_at: Date;
    categoria_id:string;
    marca_id:string;
}

type ObjetivoProps={
  id:string;
  name:string;
}
type CategoriasProps={
  id:string;
  name:string;
}

type MarcaProps={
  id:string;
  name:string;
}

interface HomeProps{
  objetivos:ObjetivoProps[];
  marcas:MarcaProps[]
  produtos:ProdutoProps[];
  categorias:CategoriasProps[];
}


export default function Home({objetivos,marcas,produtos,categorias}:HomeProps) {

  const [maxItens,setMaxItens]= useState(5)
  
  const hasProductWithDiscount = produtos.some((produto)=>{
    return Number(produto.desconto)
  })


  const chamadas = ['A melhor loja de suplementos de Belmonte','Use o Cupom ANGELO','Use o Cupom NOGUEIRA']
  const [num,setNum]=useState(0)
  const [hidden,setHidden]=useState(false)

  
  useEffect(()=>{
    const handleResize = () =>{
      setMaxItens(window.innerWidth<= 900 ?3:5)
    }

    handleResize();

    window.addEventListener('resize',handleResize)

    return ()=> window.removeEventListener('resize',handleResize)
  })
  useEffect(()=>{
    const interval = setInterval(()=>{
      const newNum =(Math.floor(Math.random()* chamadas.length))
      setHidden(true) //Escondendo o Texto antes de mudar
      setTimeout(()=>{
        setNum(newNum)
        setHidden(false)
      },500)
    },3000)
    return()=>clearInterval(interval)
  },[])




  return (
    
    <>
      <Head>
      	<title>Draco Suplementos - A sua loa de Suplementos</title>
      </Head>
      <main>
        <section className={styles.container}>
          {/** Área Anúncios e Cupons */}
          <div className={styles.containerCoupon}>
            <GoChevronLeft color="#F2B21A"  />
            <h6 className={`${styles['text-animation']} ${hidden ? styles['hidden'] : ''}`}>{chamadas[num]}</h6>
            <GoChevronRight color="#F2B21A" />
          </div>
          <HeaderDash/>

          {/** Área Banner */}
          <section className={styles.divBanner}>
            <Image className={styles.image}
              src={banner}
              alt="FotoBanner"
              layout="responsive"
              width={1000}
              height={500}
              objectFit="cover"  />
          </section>

          {/** Área de Objetivo */}

          <section className={styles.containerGoals}>
            <h4>Compre por seu objetivo:</h4>

              <div className={styles.contentGoals}>
                {objetivos && objetivos.length>0?(
                  objetivos?.map((objetivo)=>{
                    return(
                       <Link href='/' className={styles.buttonObjetivo} key={objetivo.id}><p>{objetivo.name}</p></Link>
                     )
                   })
                ):(
                  <p>Objetivos não encontrados</p>
                )}
                
              </div>
           
          </section>
          {/** Área de Produtos com Ofertas */}
          <section>
            {hasProductWithDiscount? (
              <section className={styles.containerOffers}>
                <h2>Nossas <span>Ofertas</span></h2>
                <div className={styles.produtoDestaqueOfertas}>
                {produtos.slice(0, 5).map((produto, index) => (
                  Number(produto.desconto) > 0 ? (
                    <Card 
                      key={index} 
                      valor={Number(produto.valor)} 
                      desconto={Number(produto.desconto)} 
                      nome={produto.name}
                      children=''
                    />
                  ) : null
                ))}
                </div>
                <Link href='/page' className={styles.buttonLink}><p>Ver mais ...</p></Link>
              </section>
            ):(
              <h2>Calma, daqui a pouco temos novidades e <span>Ofertas</span></h2>
            )}
          </section>
          
          {/** Area de Principais Categorias */}
          <section className={styles.containerCategoriasPrincipais}>
            <h4>Principais categorias:</h4>
            <div className={styles.contentCategorias}>
              {categorias && categorias.length > 0 ? ( 
                  
                  categorias.slice(0,maxItens).map((categoria)=> (
                    <div key={categoria.id} className={styles.contentCategoria}> 
                      <CircleCategoria/>
                      <p>{categoria.name}</p>
                    </div>
                  )) 
                ):(
                  <p>Categorias não encontradas</p>
                )}
            </div>
            
            
          </section>

        </section>
        <footer>
          teste
        </footer>
      </main>
      
      

      
    </>
  );
}


export const getServerSideProps = (async(ctx)=>{
  const apiClient =  setupAPIClient(ctx)
  const [objetivosResponse,produtosResponse,categoriasResponse]= await Promise.all([  
    apiClient.get('/objetivos'),
    apiClient.get('/listprodutos'),
    apiClient.get('/categorias')
      
  ])
  
  return {
      props:{
        objetivos:objetivosResponse.data,
        produtos:produtosResponse.data,
        categorias:categoriasResponse.data
      }
  }
})  