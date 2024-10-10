import {ReactNode} from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import imageProduto from '../../../public/creatina-titanium-300g-max-titanium_0.png'
interface CardProps{
    children:ReactNode;
    valor: number;
    desconto: number;
    nome:string;
}
//
function formatarParaReal(valor:number):string{
  return valor.toLocaleString('pt-BR',{
    style:'currency',
    currency:'BRL'
  })
}
function valorDividido(valor){
  let cont = 0
  while (valor/cont>=50){
    cont++
    if (cont>12){
      break
    }
  }
  
  return( cont )
}


function Card({children,valor,desconto,nome}:CardProps) {
  const valorFinal = desconto>0?valor-(valor*desconto/100):valor
  const parcelas= valorDividido(valorFinal)
  return (
    <div className={styles.divCard}>
        <div className={styles.containerImage}>
            <Image  src={imageProduto} width={100} height={100} alt='foto do produto' />
        </div>
        
        
        <div className={styles.divTexto}>
            <h1 >{nome}</h1>
            {desconto>0?<p className={styles.valorDesconto}>{formatarParaReal(valor)}</p>:null}
            
            <p className={styles.valorCompleto} >Por:<span>{formatarParaReal(valorFinal)}</span></p>
            <p className={styles.avista}>à vista no PIX / CARTÃO</p>
            <p className={styles.valorDividido}>ou em até <span>{parcelas}x</span> de <span>R$ {formatarParaReal((valor/valorDividido(valor)))}</span></p>
        </div>
        

    </div>
  )
}

export default Card