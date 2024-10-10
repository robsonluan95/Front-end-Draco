
const hasProductWithDiscount = produtos.some((produto)=>{
    return Number(produto.desconto)
  })
        <main className={styles.container}>
        

        
      
       {/** Área Navegação e Carrinho */}

        <HeaderDash/>

        {/** Área de Banner */}

        <article>
          

       

          {/** Área de Produtos com Ofertas */}

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
              <Link href='/page' className={styles.contenteP}>Ver mais...</Link>
            </section>
          ):(
            <h2>Calma, daqui a pouco temos novidades e <span>Ofertas</span></h2>
          )}
          
            
          <section className={styles.containerCategories}>

            <h4>Principais categorias:</h4>

            <section className={styles.containerImage}>
              
              <Link href='/page' className={styles.divImage}>
                <Image className={styles.image}  src={whey} alt="Foto do produto" width={125} height={125}/>
                <h5>Proteína</h5>
              </Link>

              <Link href='/page' className={styles.divImage}>
                <Image className={styles.image}  src={whey} alt="Foto do produto"  width={125} height={125}/>
                <h5>Proteína</h5>
              </Link>
              
              <Link href='/page' className={styles.divImage}>
                <Image className={styles.image} src={whey} alt="Foto do produto"  width={125} height={125}/>
                <h5>Proteína</h5>
              </Link>
              
              <Link href='/page' className={styles.divImage}>
                <Image className={styles.image} src={whey} alt="Foto do produto"  width={125} height={125}/>
                <h5>Proteína</h5>
              </Link>

              <div className={styles.divImage}>
                <Image className={styles.image} src={whey} alt="Foto do produto" width={125} height={125}/>
                <h5>Proteína</h5>
              </div>
              
            </section>

            <div className={styles.sectionMarca}>
              <h4>Marcas que trabalhamos</h4>
              <div className={styles.contentMarcas}>
                <Swiper
                className={styles.contentSlider}
                modules={[Navigation, Pagination, Scrollbar]} // Importe módulos necessários
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                  // Configurações de breakpoints para ajustar o número de slides por vez em diferentes larguras de tela
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  770: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                  },
                  500: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
              }}
                >
                  {marcas.map((marca) => (
                    <SwiperSlide key={marca.id} className={styles.swiperSlideContent} >
                      <div >
                        <p>{marca.name}</p>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <section   >
              <div className={styles.containerSliderProdutos}>
                  <div className={styles.contentTextoProdutos} >
                    <h3>Todos os <span> Produtos: </span></h3>
                  </div>
                
                
                <div>
                    <Swiper
                      
                      modules={[Navigation, Pagination, Scrollbar]} // Importe módulos necessários
                      spaceBetween={0}
                      slidesPerView={1} // Mostra 3 slides por vez em telas maiores
                      navigation
                      pagination={{ clickable: true }}
                      scrollbar={{ draggable: true }}
                      breakpoints={{
                          // Configurações de breakpoints para ajustar o número de slides por vez em diferentes larguras de tela
                          1000: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                          },
                          770: {
                              slidesPerView: 3,
                              spaceBetween: 10,
                          },
                          500: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                      }}
                      style={{ display: 'flex', justifyContent: 'center' }} 
                    >
                        {produtos.map((produto) => (
                          <SwiperSlide key={produto.id} style={{ display: 'flex', justifyContent: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                              <Card valor={Number(produto.valor)} desconto={Number(produto.desconto)} children={''} nome={produto.name}></Card>
                          </div>
                      </SwiperSlide>
                          ))}
                      </Swiper>
                </div>
              </div>
            </section>
            




          </section> 
        </article>
      </main>
export const getServerSideProps = (async(ctx)=>{
    const apiClient =  setupAPIClient(ctx)
    const [objetivosResponse,marcasResponse,produtosResponse]= await Promise.all([
        
        apiClient.get('/objetivos'),
        apiClient.get('/marcas'),
        apiClient.get('/listprodutos')
    ])
    
    return {
        props:{
          objetivos:objetivosResponse.data,
          marcas:marcasResponse.data,
          produtos:produtosResponse.data
        }
    }
  })  