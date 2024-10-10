import { GetServerSideProps,GetServerSidePropsContext,GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

//Função para paginas de visitantes!

export function canSSRGuest<P>(fn:GetServerSideProps<P>){
    return async(context:GetServerSidePropsContext):Promise<GetServerSidePropsResult <P>>=>{

        const cookies = parseCookies(context)
        //se o usuário tentar acessar a página porem tendo já um login salvo , redirecionamos
        if (cookies['@nextauth.token']){
            return {
                redirect:{
                    destination:'/',
                    permanent:false
                }
            }
        }
        return await fn(context)
    }
}