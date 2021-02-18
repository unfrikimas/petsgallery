import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from '../../firebase'
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFrames from '../../components/layout/ContenedorFrames'
import Paginacion from "../../components/layout/Paginacion"

const ElegirFrame = () => {

    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, filtro, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarFiltro, asignarBackground, asignarFrame, asignarNombreMascota } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [filtroImagen, setFiltroImagen] = useState(filtro)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [ frame, setFrame ] = useState(tieneFrame)
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

        <ContenedorFrames 
            handleFrame={e => handleFrame(e)}
            colorFrame={frame.colorFrame || "none"}
        />

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/background"}
          pantallaAnterior={"Background"}
          adelantar={true}
          rutaSiguiente={"/createart/text"}
          pantallaSiguiente={"Text"}
        />
      </div>
    </>
  );
};

export default ElegirFrame;