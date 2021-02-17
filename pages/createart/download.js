import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import Paginacion from "../../components/layout/Paginacion"
import IconLoader from '../../components/icons/Loader'
import IconDownload from '../../components/icons/Download'
import { descargarArte } from '../../utils/helper'

const Download = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarColorFuente } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [frame, setFrame] = useState(tieneFrame)
    const [texto, setTexto] = useState(nombreMascota)
    const [animacion, setAnimacion] = useState(false)

    useEffect(() => {
      const backgroundInicial = JSON.parse(window.localStorage.getItem('urlBackground'))
      if(backgroundInicial){
        setUrlBackground(backgroundInicial)
        asignarBackground(backgroundInicial)
      }
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      if (idInicial) {
        setPublicId(idInicial)
        guardarIdPublico(idInicial)
      }
      const frameInicial = JSON.parse(window.localStorage.getItem('frame'))
      if (frameInicial) {
        setFrame(frameInicial)
        asignarFrame(frameInicial.colorFrame)
      }
      const textoInicial = JSON.parse(window.localStorage.getItem('petsgallery-texto'))
      if (textoInicial) {
        setTexto(textoInicial)
        asignarNombreMascota(textoInicial.textoMascota)
        asignarFuente(textoInicial.fuente)
        asignarColorFuente(textoInicial.colorTexto)
      } 
    }, [])

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Pet Name"}
        />

        <ContenedorImagen 
            background={urlBackground.urlLocal ? urlBackground.urlLocal : ""}
            imagen={publicId}
            colorFrame={frame.colorFrame ? frame.colorFrame : "none"}
            nombreMascota={texto ? texto : ""}
        />

        <div className="w-80 mt-8 flex items-center justify-center mx-auto">
          <button
              className="flex items-center justify-center px-4 py-3 bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none tracking-tight"
              onClick={() => {
                setAnimacion(true)
                descargarArte(publicId, urlBackground, frame, texto)
                  .then(() => {
                    setAnimacion(false)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }}
          >
            { animacion ? 
              <IconLoader className="animate-spin" width={30} heigth={30} stroke={"#1f2937"} />
              :
              <IconDownload className="mr-2" width={25} heigth={25} stroke={"#1f2937"}/>
            }
            {animacion ? "Downloading" : "Free download"}
          </button>
        </div>

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/text"}
          adelantar={false}
          rutaSiguiente={""}
          tienda={true}
        />

        <style jsx>{`
            .sombra {
                box-shadow: 0px 4px 0px #18191F;
            }
        `}
        </style>
      </div>
    </>
  );
};

export default Download;