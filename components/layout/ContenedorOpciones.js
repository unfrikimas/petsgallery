import React, { useState } from "react"
import IconClose from '../icons/edicion/Close'

const ContenedorOpciones = ({ mostrarOpciones, handleCerrarOpciones, children }) => {

    // const [mostrarOpciones, setMostrarOpciones] = useState(mostrarVentana)

  return (
    <>
      <section
        className={`z-20 opciones h-full pb-8 ${mostrarOpciones.activo ? "opciones-activo" : ""} rounded-t-2xl`}
      >
        <button
          // className="flex items-center justify-center w-8 h-8 bg-white p-1 mt-4 ml-3 border border-gray-800 rounded-full sombra"
          className="bg-gray-800 w-12 h-1 mt-5 rounded-full block mx-auto"
          onClick={() => handleCerrarOpciones(false)}
        >
          {/* <IconClose width={20} heigth={20} stroke={"#1f2937"} /> */}
        </button>
        <div>
            {children}
        </div>
      </section>
      <style jsx>
        {`
        .opciones {
            position: fixed;
            bottom: -100%;
            background-color: white;
            width: 360px;
            height: 250px;
            margin: 0 auto;
            left: 0;
            right: 0;
            box-shadow: 0px -4px 0px #18191f;
            transition: all .4s ease-in-out;
            padding-left: 0rem;
            border-bottom: 1px solid black
        }
        .opciones-activo {
            bottom: 0;
        }
        .sombra {
            box-shadow: 0px 2px 0px #18191f;
          }
        `}
      </style>
    </>
  );
};

export default ContenedorOpciones;
