import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFondos from '../../components/layout/ContenedorFondos'
import Paginacion from "../../components/layout/Paginacion"
import AlertaNoPng from '../../components/layout/AlertaNoPng'

const ElegirBackground = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, filtro, creditos, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarFiltro, asignarBackground, asignarFrame, asignarNombreMascota } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [filtroImagen, setFiltroImagen] = useState(filtro)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [frame, setFrame] = useState(tieneFrame)
    const [texto, setTexto] = useState(nombreMascota)
    const [freeCredit, setFreeCredit] = useState(creditos)

    useEffect(() => {
      const backgroundInicial = JSON.parse(window.localStorage.getItem('urlBackground'))
      if(backgroundInicial){
        setUrlBackground(backgroundInicial)
        asignarBackground(backgroundInicial)
      }
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      if(idInicial){
        setPublicId(idInicial)
        guardarIdPublico(idInicial)
      }
      const filtroInicial = JSON.parse(window.localStorage.getItem('pets-filter'))
      if(filtroInicial){
        setFiltroImagen(filtroInicial)
        asignarFiltro(filtroInicial)
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
      const freeRbInicial = JSON.parse(window.localStorage.getItem('pet-rb'))
      if(freeRbInicial){
        setFreeCredit(freeRbInicial)
      } 
    }, [])

    useEffect(() => {
      if(urlBackground){
        window.localStorage.setItem('urlBackground', JSON.stringify(urlBackground))
      }
    },[urlBackground])

    const handleBack = (e) => {
        asignarBackground(e)
        setUrlBackground(e)
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Background"}
        />

        {publicId.format !== "png" && 
          <AlertaNoPng 
            creditos={creditos}
          />
        }

        <ContenedorImagen 
            background={publicId.format === "png" ? urlBackground.urlLocal : "none"}
            imagen={publicId}
            filtro={filtroImagen || "none"}
            colorFrame={frame.colorFrame || "none"}
            nombreMascota={texto || ""}
        />

        <ContenedorFondos 
            handleBack={e => handleBack(e)}
            nombre={urlBackground.nombre}
        />

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/filter"}
          pantallaAnterior={"Filter"}
          adelantar={true}
          rutaSiguiente={"/createart/frame"}
          pantallaSiguiente={"Frame"}
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

export default ElegirBackground;
