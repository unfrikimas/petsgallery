import React, { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import IconGoogle from '../components/icons/Google'
import IconFacebook from '../components/icons/Facebook'
import HeaderLogo from '../components/layout/HeaderLogo'

//importando firebase
import { FirebaseContext } from '../firebase'

//validaciones
import useValidacion from "../hooks/useValidacion";
import validarInicioSesion from "../utils/validacion/validarInicioSesion"

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const Login = () => {

  //context de usuario
  const { firebase } = useContext(FirebaseContext)

  const [error, guardarError] = useState("")

  const { valores, errores, handleSubmit, handleChange } = useValidacion(
    STATE_INICIAL,
    validarInicioSesion,
    iniciarSesion
  );

  //extraer datos del objeto valores
  const { email, password } = valores

  const router = useRouter()
  const {query} = router

  //Si hay usuario logueado, se redirecciona al dashboard
  // useEffect(() => {
  //   if(usuario) {
  //     router.replace("/createart/imageupload")
  //   }
  // }, [usuario])

  function iniciarSesion() {
    firebase.login(email, password)
      .then(usuario => {
        console.log(query.path)
        // console.log(usuario.user)
        if(usuario.user.emailVerified){
          router.replace(`${query.path}`)
        } else {
          // firebase.cerrarSesion()
          router.replace("/verification")
        }
      })
      .catch(error => {
        console.error(error)
        guardarError(error.message)
        // if(error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        //   guardarError("El usuario no existe ó la contraseña es incorrecta, revisa tus datos");
        // }
    })
  }

  function iniciarSesionGoogle() {
    firebase.loginGoogle()
      .then(usuario => {
        if(usuario) {
          router.replace(`${query.path}`)
        }  
      })
      .catch(error => {
        console.error(error)
      })
  }

  function iniciarSesionFacebook() {
    firebase.loginFacebook()
      .then( usuario => {
        if(usuario) {
          router.replace(`${query.path}`)
        }  
      })
      .catch(error => {
        console.error(error)
      })
  }


  return (
    <>

    <div className="">
      <div className="max-w-lg mx-auto">

        <HeaderLogo />
    
        <div className="w-80 mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 pt-8 pb-2">
            Login
          </h1>
          <p className="text-gray-700">You don't think you should login first and behave like human not robot?</p>
          <div className="mt-5 flex items-center justify-center space-x-4">
            {/* <div className="w-1/2">
              <button
                className="w-full py-3 flex items-center justify-center bg-blue-500 border-2 border-gray-800 rounded-2xl text-xl font-base text-white focus:outline-none cursor-pointer"
                type="button"
                onClick={iniciarSesionFacebook}
              >
                <IconFacebook width={30} heigth={30} stroke={"#fff"}/>
                <span className="pl-2">Facebook</span>
              </button>
            </div> */}
            <div className="w-1/2">
              <button
                className="w-full py-3 flex items-center justify-center bg-red-500 border-2 border-gray-800 rounded-2xl text-xl font-base text-white focus:outline-none cursor-pointer"
                type="button"
                onClick={iniciarSesionGoogle}
              >
                <IconGoogle width={30} heigth={30} stroke={"#fff"}/>
                <span className="pl-2">Google</span>
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-lg">
              <form
                onSubmit={handleSubmit}
                noValidate
              >
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
                  />
                </div>
                {errores.password && <p className="error">{errores.password}</p>}
                {error && <p className="error">{error}</p>}
                <button
                  className="w-full py-3 flex items-center justify-center bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer"
                  type="submit"
                >
                  {/* <IconUser width={30} heigth={30} stroke={"#fff"}/> */}
                  <span>Login</span>
                </button>
              </form>
              <p className="block text-gray-700 mt-5 text-md">Are you new?
                <Link href="/signup">
                  <a className="text-red-600"> Create new</a>
                </Link>
              </p>
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

export default Login;
