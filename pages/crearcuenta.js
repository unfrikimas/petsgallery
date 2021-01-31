import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { Error } from "../components/ui/Formulario";
import Link from 'next/link';
import Header from '../components/layouts/Header';
import IconUser from '../components/icons/form/user';

//importando firebase
import { FirebaseContext } from '../firebase';

//validaciones
import useValidacion from "../hooks/useValidacion";
import validarCrearCuenta from "../validacion/validarCrearCuenta";

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
  useEffect(() => {
    if(usuario) {
      router.replace("/dashboard")
    }
  }, [usuario])

  async function crearCuenta() {
    await firebase.registrar(nombre, email, password)
      .then(function() {
        // console.log(user)
        const user = firebase.auth.currentUser 
        firebase.verificar(user)
        router.replace("/verificacion");
      })
      .catch(error => {
          console.error("Hubo un error al crear el usuario", error);
          if(error.code === "auth/email-already-in-use") {
            guardarError("Este email ya está registrado, usa otro");
          }
      })
  }

  return (
    <>

    <div className="">
      <div className="container mx-auto px-4">

        <Header />
    
        <div className="md:w-4/5 mx-auto">
          <h1 className="text-xl font-sans font-bold text-gray-600 text-center pt-8">
            Crea tu cuenta
          </h1>
          {/* { mensaje && <Alerta /> } */}
          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              <form
                className="px-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mb-4">
                  <input
                    className="text-lg appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </div>
                {errores.nombre && <Error>{errores.nombre}</Error>}
                <div className="mb-4">
                  <input
                    className="text-lg  appearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                    type="email"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </div>
                {errores.email && <Error>{errores.email}</Error>}
                <div className="mb-4">
                  <input
                    className="text-lg gappearance-none border w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-gray-100"
                    type="password"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    // onBlur={handleBlur}
                  />
                </div>
                {errores.password && <Error>{errores.password}</Error>}
                {error && <Error>{error}</Error>}
                <button
                  className="flex space-x-1 items-center justify-center text-lg bg-principal hover:bg-principal-hover w-full p-4 text-white mb-5 cursor-pointer focus:outline-none"
                  type="submit"
                >
                  <IconUser width={30} heigth={30} stroke={"#fff"}/>
                  <span>Crear cuenta</span>
                </button>
                <Link href="/iniciarsesion">
                  <a className="block text-gray-400 text-right mt-4">¿Ya tienes cuenta?</a>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CrearCuenta;
