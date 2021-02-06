import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorTexto from '../../components/layout/ContenedorTexto'
import Paginacion from "../../components/layout/Paginacion"

const AgregarTexto = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarColorFuente } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [frame, setFrame] = useState({
        anchoFrame: 810,
        gruesoBordeFrame: 40,
        colorFrame: tieneFrame.colorFrame
    })
    const [texto, setTexto] = useState(nombreMascota)

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

    useEffect(() => {
        if(texto) {
            window.localStorage.setItem('petsgallery-texto', JSON.stringify(texto))
        }
    },[texto])

    const handleTexto = e => {
        asignarNombreMascota(e.target.value)
        setTexto({
            ...texto,
            textoMascota: e.target.value
        })
    }

    const handleFuente = e => {
        asignarFuente(e.target.value)
        setTexto({
            ...texto,
            fuente: e.target.value
        })
    }

    const handleColorFuente = e => {
        asignarColorFuente(e.target.value)
        setTexto({
            ...texto,
            colorTexto: e.target.value
        })
    }

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

        <ContenedorTexto 
            handleTexto={handleTexto}
            handleFuente={handleFuente}
            handleColorFuente={handleColorFuente}
            nombreMascota={texto.textoMascota ? texto.textoMascota : ""}
            fuente={texto.fuente ? texto.fuente : "Kanit"}
            colorFuente={texto.colorTexto ? texto.colorTexto : "black"}
        />

        <Paginacion
          retroceder={"true"}
          rutaAnterior={"/createart/frame"}
          adelantar={"true"}
          rutaSiguiente={"/createart/download"}
        />
      </div>
    </>
  );
};

export default AgregarTexto;