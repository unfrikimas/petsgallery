import React from "react";
import HeaderUser from "../../components/layout/HeaderUser";
import { Image, Transformation, CloudinaryContext } from "cloudinary-react";
import IconFlechaAdelante from "../../components/icons/FlechaAdelante";
import ContenedorImagen from "../../components/layout/ContenedorImagen";
import Paginacion from "../../components/layout/Paginacion";

const IMAGEN_PRUEBA = {
  uno: "petsgallery/uwdedmkdkz5jopwisha8.png",
};

const SubirImagen = () => {
  return (
    <>
      <div className="max-w-lg mx-auto">
        <HeaderUser />

        <ContenedorImagen imagen={IMAGEN_PRUEBA.uno} />

        {/* <div className="h-full w-full flex items-center justify-center">
                <p className="px-4 py-2 bg-white">Procesando imagen...</p>
            </div> */}

        <div className="w-80 h-16 mx-auto flex items-center justify-center mt-8">
          <button className="w-full h-full bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra">
            Upload image
          </button>
        </div>

        <Paginacion
          retroceder="false"
          rutaAnterior="/"
          adelantar="true"
          rutaSiguiente="/"
        />
        
      </div>
      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
        `}
      </style>
    </>
  );
};

export default SubirImagen;
