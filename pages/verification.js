import React, { useEffect, useState, useContext } from 'react';
import HeaderLogo from '../components/layout/HeaderLogo';
import Link from 'next/link';
import { useRouter } from 'next/router';

//importando firebase
import { FirebaseContext } from '../firebase';

const VerificacionCuenta = () => {

    //context de usuario
    const { usuario, firebase } = useContext(FirebaseContext);

    const [ alertarReenvioVerificacion, setAlertarReenvioVerificacion ] = useState(false)

    const router = useRouter();

    // useEffect(() => {
    //     if(usuario && usuario.emailVerified) {
    //         router.replace("/createart/imageupload")
    //     } else if (!usuario) {
    //         router.replace("/signup")
    //     }
    // }, [usuario])

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
                <HeaderLogo />

                <section className="w-80 mx-auto">
                    <div className="">
                        <div className="mt-8 p-4 bg-red-200 text-lg text-gray-600 text-center">
                            { alertarReenvioVerificacion ?
                            <p className="text-principal font-bold">The verification email was forwarded.</p>
                            :
                            <p>We have sent you an email to verify your account. Check your inbox or spam folder.</p>
                            }
                        </div>
                        { !alertarReenvioVerificacion && (
                        <>
                        <div className="flex justify-center mt-4 text-gray-600">
                            <p>I have not received the mail.</p>
                            <button
                            className="text-red-500 hover:underline pl-1 focus:outline-none"
                            type="button"
                            onClick={() => reenviarVerificacion()}
                            >Resend</button>
                        </div>
                        <div className="w-full flex items-center justify-center mt-8">
                            <Link href="/iniciarsesion">
                            <a 
                                className="w-full text-center mb-4 pt-3 pb-3.5 text-lg focus:outline-none text-principal border border-principal">
                                I already verified my account
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
                    <p className="text-center pt-48">Loading...</p>
                </section>
            
            }
 
            </div>
        </div>     

    );
}
 
export default VerificacionCuenta;