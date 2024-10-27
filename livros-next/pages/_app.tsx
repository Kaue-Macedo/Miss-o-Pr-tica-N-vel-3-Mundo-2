// pages/_app.tsx
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa o CSS do Bootstrap
import '../styles/globals.css'; // (Opcional) Seu CSS global

import { AppProps } from 'next/app'; // Tipagem para o componente de App

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;