import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFrames from '../../components/layout/ContenedorFrames'
import Paginacion from "../../components/layout/Paginacion"

const ElegirFrame = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarBackground, asignarFrame, asignarNombreMascota } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [ frame, setFrame ] = useState({
        anchoFrame: 810,
        gruesoBordeFrame: 40,
        colorFrame: tieneFrame.colorFrame
    })
    const [ texto, setTexto ] = useState(nombreMascota)

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
      }
    }, [])

    useEffect(() => {
        if(frame.colorFrame) {
            window.localStorage.setItem('frame', JSON.stringify(frame))
        }
    },[frame])

    const handleFrame = (e) => {
        asignarFrame(e.target.value)
        setFrame({
            ...frame,
            colorFrame: e.target.value
        })
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Frame"}
        />

        <ContenedorImagen 
            background={urlBackground.urlLocal ? urlBackground.urlLocal : ""}
            imagen={publicId}
            colorFrame={frame.colorFrame ? frame.colorFrame : "none"}
            nombreMascota={texto ? texto : ""}
        />

        <ContenedorFrames 
            handleFrame={e => handleFrame(e)}
            colorFrame={frame.colorFrame ? frame.colorFrame : "none"}
        />

        <Paginacion
          retroceder={"true"}
          rutaAnterior={"/createart/background"}
          adelantar={"true"}
          rutaSiguiente={"/createart/text"}
        />
      </div>
    </>
  );
};

export default ElegirFrame;