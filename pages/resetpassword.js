import React, { useState, useContext } from "react";
import Router from "next/router";
import { Error } from "../components/ui/Formulario";
import Link from 'next/link';
import HeaderUser from '../components/layouts/HeaderUser';
import Header from '../components/layouts/Header';
import IconLink from '../components/icons/form/link';

//importando firebase
import { FirebaseContext } from '../firebase';

//validaciones
import useValidacion from "../hooks/useValidacion";
import validarResetPassword from "../validacion/validarResetPassword";

const STATE_INICIAL = {
  email: ""
};

const ResetPassword = () => {

  //context de usuario
  const { usuario, firebase } = useContext(FirebaseContext);

  const [error, guardarError] = useState(false);
  const [ mensajeCambioPassword, setMensajeCambioPassword ] = useState(false)

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarResetPassword,
    ResetPassword
  );

  //extraer datos del objeto valores
  const { email } = valores;

  async function ResetPassword() {
    // const usuario = firebase.auth.currentUser;
    await firebase.auth.sendPasswordResetEmail(email)
      .then(function() {
        // Email sent.
        setMensajeCambioPassword(true)
      }).catch(function(error) {
        // An error happened.
        // console.error("Hubo un error", error);
        // guardarError(error.message);
        setMensajeCambioPassword(true)
      });
  }

  return (
    <>

    <div className="min-h-screen">
      <div className="mx-auto">

        { usuario ?
            <HeaderUser
              usuario={usuario}
              firebase={firebase}  
            /> 
          :
            <Header />
        }

        { mensajeCambioPassword 
        ? 
            <>
            <h1 className="font-sans text-gray-600 pt-12 px-8">
                Si el correo existe en nuestra base de datos, recibirás un enlace para cambiar tu contraseña. Revisa en tu bandeja de entrada o en la carpeta de Spam.
            </h1>
            <Link href="/iniciarsesion">
                <a className="block text-center text-gray-600 hover:underline mt-8">
                    Regresar-{">"}
                </a>
            </Link>
            </>
        : 
            <div className="sm:w-lg mx-auto px-4">
            <h1 className={`text-xl font-sans font-bold text-gray-600 text-center ${usuario ? "pt-16" : "pt-8"}`}>
                Cambiar contraseña
            </h1>
            {/* { mensaje && <Alerta /> } */}
            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                <form
                    className="px-4"
                    onSubmit={handleSubmit}
                    noValidate
                >
                    { usuario 
                    ? <p className="text-gray-500 mb-4">Te enviaremos un enlace por correo para cambiar tu contraseña.</p>
                    : <p className="text-gray-500 mb-4">Escribe el email que usaste cuando creaste tu cuenta y te enviaremos un enlace para cambiar tu contraseña.</p> }
                    <div className="mb-4">
                    <input
                        className="text-lg appearance-none border w-full py-4 px-3 text-gray-500 leading-tight focus:outline-none focus:bg-gray-100"
                        type="email"
                        id="email"
                        placeholder="Escribe el email"
                        name="email"
                        // defaultValue={ usuario ? usuario.email : email}
                        value={email}
                        onChange={handleChange}
                    />
                    </div>
                    {errores.email && <Error>{errores.email}</Error>}
                    {error && <Error>{error}</Error>}
                    <button
                      className="flex items-center justify-center text-lg bg-principal hover:bg-principal-hover w-full py-4 text-white cursor-pointer mb-5 focus:outline-none"
                      type="submit"
                    >
                      <IconLink width={30} heigth={30} stroke={"#fff"}/>
                      Enviar enlace
                    </button>
                    { !usuario && 
                    <Link href="/crearcuenta">
                      <a className="block text-gray-400 text-right mt-4">¿No tienes cuenta?</a>
                    </Link>
                    }
                </form>
                </div>
            </div>
            </div>

        }

      </div>
    </div>
    </>
  );
};

export default ResetPassword;
