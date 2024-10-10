import { ReactNode,ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    loading?:boolean,
    children:ReactNode,
    

}

import { FaSpinner } from 'react-icons/fa'

const Button = ({loading,children,...rest}:ButtonProps) => {
  return (
    <button 
        className={styles.button}
        disabled={loading}
        {...rest}


    >
        {loading ?(
            <FaSpinner color='21201E' fontSize={16}/>
        ):(
            <a className={styles.buttonText}>{children}</a>
        )}
        
    </button>
  )
}

export default Button