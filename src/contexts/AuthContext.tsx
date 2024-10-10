
'useClient'

import { api } from '../services/apiClient';
import {createContext,ReactNode,useEffect,useState} from 'react'
import { destroyCookie,setCookie,parseCookies } from 'nookies'
import  Router  from 'next/router';
import path from 'path';
import { toast } from 'react-toastify';



type AuthContextData = {
    user:UserProps;
    isAuthenticated:boolean;
    signIn:(credentials:SignInProps)=>Promise<void>;
    signOut:()=>void;
    signUp:(credentials:SignUpProps)=>Promise<void>

}
type UserProps={
    id:string;
	name: string;
	email: string,
	admin: boolean,
}

type SignInProps ={
    email: string;
    password:string;
}
type AuthProviderProps={
    children :ReactNode
}
type SignUpProps={
    name: string;
    email: string;
    password:string;

}
export const AuthContext =createContext({}as AuthContextData)

export function signOut() {
    // Use o hook useRouter para obter a instância do router
   
  
    try {
      // Destrua o cookie
      destroyCookie(undefined, '@nextauth.token');
      // Se estiver no lado do cliente, redirecione para '/login'
      if (typeof window !== 'undefined') {
        Router.push('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

export function AuthProvider({children}:AuthProviderProps){

    const [user,setUser]=useState<UserProps>()
    const isAuthenticated = !!user;
    
    useEffect(()=>{
        //buscar token
        const {'@nextauth.token':token}=parseCookies()
        if(token){
            api.get('/userdetalhes').then(response=>{
                const {id,name,email,admin}=response.data
                setUser({
                    id,name,email,admin
                })
            }).catch(()=>{
                signOut()
            })
            
        }
    },[])

    async function signIn({email,password}:SignInProps){
        console.log(email,password)
        try {
            const response = await api.post('/login', {
                email,
                password
            })
            const {id,name,admin,token}=response.data
            setCookie(undefined,'@nextauth.token',token,{
                maxAge:60*60*24*30,
                path:'/'
            })
            setUser({
                id,
                name,
                email,
                admin
            })
            //Passar para as proxima req o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`
            toast.success('Bem-vindo')
            if (admin === true){
                Router.push('/marca')
            } else{
                Router.push('/')
            }
            
        } catch (error) {
            toast.error('Error ao acessar')
            console.log("erro ao acessar",error)
        }
    }
    async function signUp({name,email,password}:SignUpProps) {
        try {
            const response = await api.post('/users',{
                name,
                email,
                password
            })

            const {id,admin,token}=response.data

            //setando os valores que ficaram em cookies -token e quanto tempo
            setCookie(undefined,'@nextauth.token',token,{
                maxAge:60*60*24*30,path:'/'
            })
            //enviando as informações
            setUser({
                id,
                name,
                email,
                admin
            })

            //passando para nossas requisições o token
            api.defaults.headers['Authorization']= `Bearer ${token}`
            Router.push('/')

        }catch(error){
            console.log('error',error)
        }
    }



    return(
        <AuthContext.Provider value={{user,isAuthenticated,signIn,signOut,signUp}}>
            {children}
        </AuthContext.Provider>
    )
}