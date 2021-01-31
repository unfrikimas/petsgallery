import Head from 'next/head'
import '../styles/globals.css'
import ImageState from '../context/image/imageState'
import firebase, { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

function MyApp({ Component, pageProps }) {

  //hook de autenticion de usuario
  const usuario = useAutenticacion();
  
  return (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <meta httpEquiv="x-ua-compatible" content="ie=edge"></meta>
        <meta name="description" content=""></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <title>PetsGallery</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        {/* <link rel="mask-icon" href="logo-brevi.svg" color="#5bbad5"/> */}
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@700;900&family=Leckerli+One&display=swap" rel="stylesheet"/>
      </Head>

      <FirebaseContext.Provider
        value={{ firebase, usuario }}
      >
        <ImageState>  
          <Component {...pageProps} />
        </ImageState>
      </FirebaseContext.Provider>
    
    </>
  )

}

export default MyApp
