import React, { useEffect, useState, useContext } from 'react';
import Header from '../components/layouts/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

//importando firebase
import { FirebaseContext } from '../firebase';

const VerificacionCuenta = () => {

    //context de usuario
    const { usuario, firebase } = useContext(FirebaseContext);

    const [ alertarReenvioVerificacion, setAlertarReenvioVerificacion ] = useState(false)

    const router = useRouter();

    useEffect(() => {
        if(usuario && usuario.emailVerified) {
            router.replace("/dashboard")
        } else if (!usuario) {
            router.replace("/crearcuenta")
        }
    }, [usuario])

    //reenvia la verificacion de la cuenta por correo
    const reenviarVerificacion = () => {
        try {
            const user = firebase.auth.currentUser 
            firebase.verificar(user)
            setAlertarReenvioVerificacion(true)
            setTimeout(() => {
                setAlertarReenvioVerificacion(false)
            }, 5000);
        } catch (error) {
            console.log(error)
        }
    }

    return (  

        
        <div className="max-w-lg mx-auto">
            <div className="mx-auto px-4">
            
            { usuario && !usuario.emailVerified ? (
              
                <>
                <Header />

                <section className="flex-1">
                    <div className="px-4">
                        <div className="mt-16 p-4 bg-red-200 text-lg text-gray-600 text-center">
                            { alertarReenvioVerificacion ?
                            <p className="text-principal font-bold">El correo de verificación fue reenviado.</p>
                            :
                            <p>Te hemos enviado un correo para verificar tu cuenta. Revisa en tu bandeja de entrada o en la carpeta de Spam.</p>
                            }
                        </div>
                        { !alertarReenvioVerificacion && (
                        <>
                        <div className="flex justify-center mt-4 text-gray-600">
                            <p>No he recibido el correo.</p>
                            <button
                            className="hover:underline pl-1 focus:outline-none"
                            type="button"
                            onClick={() => reenviarVerificacion()}
                            >Reenviar</button>
                        </div>
                        <div className="w-full flex items-center justify-center mt-8">
                            <Link href="/iniciarsesion">
                            <a 
                                className="w-full text-center mb-4 pt-3 pb-3.5 text-lg focus:outline-none text-principal border border-principal">
                                Ya verifiqué mi cuenta
                            </a>
                            </Link>                        
                        </div>
                        </>
                        )}
                    </div>
                </section>  
                
                </>
                
            ) :  
            
                <section className="flex-1">
                    <p className="text-center pt-48">Cargando...</p>
                </section>
            
            }
 
            </div>
        </div>     

    );
}
 
export default VerificacionCuenta;