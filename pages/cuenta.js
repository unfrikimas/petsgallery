import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import useTimeAgo from "../hooks/useTimeAgo"
// import useDateTimeFormat from "../hooks/useDateTimeFormat"
import { FirebaseContext } from "../firebase";
import formatearFecha from "../utils/formatearFecha";
import Layout from "../components/layouts/Layout";
import IconUserItem from "../components/icons/form/useritem";
import IconCheckTrue from "../components/icons/form/checktrue";
import IconFechaCreada from "../components/icons/form/fechacreada";
import IconFechaEntrada from "../components/icons/form/fechaentrada";
import IconEditar from '../components/icons/form/edit';


const Cuenta = () => {

  //context de usuario
  const { usuario, firebase } = useContext(FirebaseContext);
  
  const [ usuarioVerificado, setUsuarioVerificado ] = useState(false);
  const [ error, guardarError ] = useState(false);
  const [ nombreUsuario, setNombreUsuario ] = useState("");
  const [ alertaNombreVacio, guardarAlertaNombreVacio ] = useState(false);
  const [ alertaCambioNombre, guardarAlertaCambioNombre ] = useState(false);
  
  //timestamp
  const fechaCreacionCuenta = usuario?.metadata.creationTime;
  const fechaUltimoIngreso = usuario?.metadata.lastSignInTime;
  const cuentaCreada = formatearFecha(fechaCreacionCuenta);
  const ultimoIngreso = formatearFecha(fechaUltimoIngreso);
  
  useEffect(() => {
    if (usuario && usuario.emailVerified) {
      setNombreUsuario(usuario.displayName)
      setUsuarioVerificado(true);
    }
  }, [usuario]);

  const handleClick = (e) => {
    e.preventDefault(); 
    console.log("nombre", nombreUsuario)
    if(nombreUsuario.trim() === "") {
      guardarAlertaNombreVacio(true);
    } else if(nombreUsuario) {
      actualizarNombreUsuario();
    }
    // } else if(nombreUsuario.trim() !== "") {
    //   console.log("ejecuta funcion")
    //   actualizarNombreUsuario();
    // }
  }

  async function actualizarNombreUsuario() {
    if(nombreUsuario) {
      const user = await firebase.auth.currentUser;
      await user
          .updateProfile({
              displayName: nombreUsuario,
          })
          .then(function () {
              // Update successful.
              guardarAlertaCambioNombre(true)
          })
          .catch(error => {
              // An error happened.
              console.error(
                  "Hubo un error al actualizar el nombre de usuario",
                  error.message
              );
              guardarError(error.message);
          });
    }
  }

  return (
    <>
      <Layout>
        <div className="mx-auto">
          { usuario && usuarioVerificado ? (
            <div className="w-full px-4">
              <h1 className="text-xl font-sans font-bold text-gray-600 text-center pt-8">
                Tu cuenta
              </h1>

              <div className="w-full flex justify-center mt-5">
                <div className="w-full sm:max-w-lg px-4">
                  <div className="flex items-center py-1 text-gray-400">
                    <IconUserItem width={20} height={20} />
                    <p className="pl-1">{usuario.email}</p>
                  </div>
                  <div className="flex items-center py-1 text-gray-400">
                    <IconCheckTrue width={20} height={20} stroke={"#01cc00"} />
                    <p className="pl-1">Email verificado</p>
                  </div>
                  <div className="flex items-center py-1 text-gray-400">
                    <IconFechaCreada width={20} height={20} />
                    <p className="pl-1">Cuenta creada: {cuentaCreada}</p>
                  </div>
                  <div className="flex items-center py-1 text-gray-400">
                    <IconFechaEntrada width={20} height={20} />
                    <p className="pl-1">Último ingreso: {ultimoIngreso}</p>
                  </div>
                  <div className="my-2">
                    <label className="text-sm text-gray-400">
                      Nombre:
                    </label>
                    <input
                      className="text-lg appearance-none border w-full py-4 px-2 text-gray-500 leading-tight focus:outline-none focus:bg-gray-100"
                      type="text"
                      placeholder="Escribe el nuevo nombre"
                      value={nombreUsuario}
                      onChange={e => setNombreUsuario(e.target.value)}
                    />
                  </div>
                  {alertaNombreVacio && <p className="text-center text-red-600 pb-2">El nombre no puede estar vacío</p>}
                  {alertaCambioNombre && <p className="text-center text-green-600 pb-2">El nombre de usuario ha sido actualizado</p>}
                  {error && <p className="text-center text-red-600 pb-2">{error}</p>}
                  <button
                    className="flex space-x-1 items-center justify-center text-lg bg-principal hover:bg-principal-hover w-full py-4 text-white mb-5 focus:outline-none cursor-pointer"
                    type="button"
                    onClick={handleClick}
                  >
                    <IconEditar width={30} heigth={30} stroke={"#fff"}/>
                    <span>Actualizar nombre</span>
                  </button>
                  <Link href="/resetpassword">
                    <a className="block text-gray-400 text-right mt-2">
                      Cambiar contraseña
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <section className="flex-1">
              <p className="text-center pt-48">Cargando...</p>
            </section>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Cuenta;
