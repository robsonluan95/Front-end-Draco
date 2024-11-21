import Image from 'next/image'
import whey from '../../../public/100-whey-protein-909g-optimum-nutrition-sabor-banana-com-morango_0.png'
import styles from './styles.module.scss'

export const CircleCategoria = () => {
  return (
    <section className={styles.container}>
        <section className={styles.containerCategorias}>
          <Image src={whey} alt='Teste' width={100} height={100}/>
        </section>
    </section>
   
  )
}
