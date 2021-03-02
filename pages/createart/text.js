import React, { useState, useContext, useEffect } from "react"
import { FirebaseContext } from '../../firebase'
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorTexto from '../../components/layout/ContenedorTexto'
import Paginacion from "../../components/layout/Paginacion"

const AgregarTexto = () => {

    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, filtro, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarFiltro, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarColorFuente, asignarColorBordeFuente } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [filtroImagen, setFiltroImagen] = useState(filtro)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [frame, setFrame] = useState({
        anchoFrame: 810,
        gruesoBordeFrame: 40,
        colorFrame: tieneFrame.colorFrame
    })
    const [texto, setTexto] = useState(nombreMascota)
    const [alertaLimiteTexto, setAlertaLimiteTexto] = useState(false)

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

    useEffect(() => {
        if(texto) {
            window.localStorage.setItem('petsgallery-texto', JSON.stringify(texto))
        }
    },[texto])

    const handleTexto = e => {
      if(e.target.value.length >= 12) {
        setAlertaLimiteTexto(true)
      } else {
        setAlertaLimiteTexto(false)
      }
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
      if(e.target.value === "white") {
        asignarColorFuente(e.target.value)
        asignarColorBordeFuente("black")
        setTexto({
          ...texto,
          colorTexto: e.target.value,
          colorBorde: "black"
        })
      } else {
        asignarColorFuente(e.target.value)
        asignarColorBordeFuente("white")
        setTexto({
          ...texto,
          colorTexto: e.target.value,
          colorBorde: "white"
        })
      }
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Pet Name"}
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

        {alertaLimiteTexto &&
          <p className="text-red-600 text-lg font-bold text-center pt-3 -mb-3">12 character limit reached</p>
        }

        <ContenedorTexto 
            handleTexto={handleTexto}
            handleFuente={handleFuente}
            handleColorFuente={handleColorFuente}
            nombreMascota={texto.textoMascota || ""}
            fuente={texto.fuente || "Kanit"}
            colorFuente={texto.colorTexto || "black"}
        />

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/frame"}
          pantallaAnterior={"Frame"}
          adelantar={true}
          rutaSiguiente={"/createart/download"}
          pantallaSiguiente={"Download"}
        />
      </div>
    </>
  );
};

export default AgregarTexto;