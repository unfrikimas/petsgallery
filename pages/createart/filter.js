import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from '../../firebase'
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFiltros from '../../components/layout/ContenedorFiltros'
import Paginacion from "../../components/layout/Paginacion"

const ElegirFiltro = () => {

    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, filtro, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarBackground, asignarFiltro, asignarFrame, asignarNombreMascota } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [filtroImagen, setFiltroImagen] = useState(filtro)
    const [frame, setFrame] = useState(tieneFrame)
    const [texto, setTexto] = useState(nombreMascota)

    useEffect(() => {
      const backgroundInicial = JSON.parse(window.localStorage.getItem('urlBackground'))
      if(backgroundInicial){
        setUrlBackground(backgroundInicial)
        asignarBackground(backgroundInicial)
      }
      const filtroInicial = JSON.parse(window.localStorage.getItem('pets-filter'))
      if(filtroInicial){
        setFiltroImagen(filtroInicial)
        asignarFiltro(filtroInicial)
      }
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      if(idInicial){
        setPublicId(idInicial)
        guardarIdPublico(idInicial)
      }
      const frameInicial = JSON.parse(window.localStorage.getItem('frame'))
      if(frameInicial){
        setFrame(frameInicial)
        asignarFrame(frameInicial.colorFrame)
      }
      const textoInicial = JSON.parse(window.localStorage.getItem('petsgallery-texto'))
      if (textoInicial) {
        setTexto(textoInicial)
        asignarNombreMascota(textoInicial.textoMascota)
      }
    }, [])

    useEffect(() => {
      if(filtroImagen){
        window.localStorage.setItem('pets-filter', JSON.stringify(filtroImagen))
      }
    },[filtroImagen])

    const handleFilter = (e) => {
        asignarFiltro(e)
        setFiltroImagen(e)
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Filter"}
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
        { publicId.publicid ?        
            <ContenedorFiltros
                handleFilter={e => handleFilter(e)}
                imagen={publicId}
                nombre={filtro}
            />
        :
            <div className="w-80 mt-6 mx-auto flex space-x-4 animate-pulse">
                <div className="w-24 h-24 bg-gray-300 rounded-2xl"></div>
                <div className="w-24 h-24 bg-gray-300 rounded-2xl"></div>
                <div className="w-24 h-24 bg-gray-300 rounded-2xl"></div>
            </div>
        }

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/imageupload"}
          pantallaAnterior={"Upload"}
          adelantar={true}
          rutaSiguiente={"/createart/background"}
          pantallaSiguiente={"Background"}
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

export default ElegirFiltro;
