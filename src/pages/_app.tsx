import "../styles/globals.scss";
import type { AppProps } from "next/app";

import { useContext } from "react";
import {ToastContainer} from 'react-toastify'
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';
import 'react-toastify/dist/ReactToastify.css';


import { AuthProvider } from "../contexts/AuthContext";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ProgressBar
        height="4px"
        color="#F2B21A"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </AuthProvider>
  ) ;
}
