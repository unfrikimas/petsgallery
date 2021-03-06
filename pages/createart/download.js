import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from '../../firebase'
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import Paginacion from "../../components/layout/Paginacion"
import IconLoader from '../../components/icons/Loader'
import IconDownload from '../../components/icons/Download'
import { descargarArte, guardarArteDB } from '../../utils/helper'

const Download = () => {

    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)  

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, filtro, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarFiltro, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarColorFuente } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [filtroImagen, setFiltroImagen] = useState(filtro)
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
      const filtroInicial = JSON.parse(window.localStorage.getItem('pets-filter'))
      if(filtroInicial){
        setFiltroImagen(filtroInicial)
        asignarFiltro(filtroInicial)
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

    // useEffect(() => {
    //   return () => setAnimacion(false)
    // }, [animacion])


    const handleClick = () => {
      setAnimacion(true)
      descargarArte(publicId, filtroImagen, urlBackground, frame, texto)
        .then((res) => {
          if(usuario) {
            guardarArteDB(res.urlCompleta, usuario, res.publicId, res.filtro, res.urlBackground, res.frame, res.texto)
          }
          setAnimacion(false)
        })
        .catch((error) => {
          console.log(error)
          setAnimacion(false)
        })
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Download Art"}
            usuario={usuario}
            firebase={firebase}
        />

        <ContenedorImagen 
            background={urlBackground.urlLocal || ""}
            imagen={publicId}
            filtro={filtroImagen || "none"}
            colorFrame={frame.colorFrame || "none"}
            nombreMascota={texto || ""}
        />

        <div className="w-80 mt-8 flex items-center justify-center mx-auto">
          <button
              className="flex items-center justify-center px-4 py-3 bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none tracking-tight"
              onClick={handleClick}
          >
            { animacion ? 
              <IconLoader className="animate-spin" width={30} heigth={30} stroke={"#1f2937"} />
              :
              <IconDownload className="mr-2" width={25} heigth={25} stroke={"#1f2937"}/>
            }
            {animacion ? "Downloading" : "Download"}
          </button>
        </div>

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/text"}
          pantallaAnterior={"Text"}
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