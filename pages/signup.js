import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
// import IconUser from '../components/icons/form/user';
import HeaderLogo from '../components/layout/HeaderLogo'

//importando firebase
import { FirebaseContext } from '../firebase';

//validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../utils/validacion/validarCrearCuenta";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const CrearCuenta = () => {

  //context de usuario
  const { usuario, firebase } = useContext(FirebaseContext);

  const [error, guardarError] = useState(false);

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarCrearCuenta,
    crearCuenta
  );

  //extraer datos del objeto valores
  const { nombre, email, password } = valores;

  const router = useRouter();

  //Si hay usuario logueado, se redirecciona al dashboard
  // useEffect(() => {
  //   if(usuario) {
  //     router.replace("/createart/imageupload")
  //   }
  // }, [usuario])

  async function crearCuenta() {
    await firebase.registrar(nombre, email, password)
      .then(function() {
        // console.log(user)
        const user = firebase.auth.currentUser 
        firebase.verificar(user)
        router.replace("/verification");
      })
      .catch(error => {
          console.error("There was an error creating the user", error);
          if(error.code === "auth/email-already-in-use") {
            guardarError("This email is already registered");
          }
      })
  }

  return (
    <>

    <div className="">
      <div className="max-w-lg mx-auto">

        <HeaderLogo />
    
        <div className="w-80 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 pt-8 pb-2">
            Sign up
          </h1>
          <p className="text-gray-700">You have chance to create new account if you really want to</p>
          {/* { mensaje && <Alerta /> } */}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mb-5">
                  <input
                    className="w-full py-3 px-3 border-2 border-gray-800 text-gray-700 text-xl focus:outline-none rounded-2xl"
                    type="text"
                    id="nombre"
                    placeholder="Full name"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </div>
                {errores.nombre && <p className="error">{errores.nombre}</p>}
                <div className="mb-5">
                  <input
                    className="w-full py-3 px-3 border-2 border-gray-800 text-gray-700 text-xl focus:outline-none rounded-2xl"
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </div>
                {errores.email && <p className="error">{errores.email}</p>}
                <div className="mb-5">
                  <input
                    className="w-full py-3 px-3 border-2 border-gray-800 text-gray-700 text-xl focus:outline-none rounded-2xl"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </div>
                {errores.password && <p className="error">{errores.password}</p>}
                {error && <p className="error">{error}</p>}
                <button
                  className="w-full py-3 flex items-center justify-center bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer"
                  type="submit"
                >
                  {/* <IconUser width={30} heigth={30} stroke={"#fff"}/> */}
                  <span>Sign up</span>
                </button>
                <p className="block text-gray-700 mt-5 text-md">Already have account?
                  <Link href="/login">
                    <a className="text-red-600"> Go here</a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <style jsx>
      {`
        .error {
          font-weight: 500;
          font-size: 1rem;
          color: red;
          text-align: center;
          margin-bottom: 1rem;
        }
        .sombra {
            box-shadow: 0px 4px 0px #18191f;
        }
      `}
    </style>
    </>
  );
};

export default CrearCuenta;
