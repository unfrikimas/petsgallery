import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFondos from '../../components/layout/ContenedorFondos'
import Paginacion from "../../components/layout/Paginacion"

const ElegirBackground = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, tieneFrame, guardarIdPublico, asignarBackground, asignarFrame } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [ frame, setFrame ] = useState({
      anchoFrame: 810,
      gruesoBordeFrame: 40,
      colorFrame: ""
    })

    useEffect(() => {
      const backgroundInicial = JSON.parse(window.localStorage.getItem('urlBackground'))
      setUrlBackground(backgroundInicial)
      asignarBackground(backgroundInicial)
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      setPublicId(idInicial)
      guardarIdPublico(idInicial)
      const frameInicial = JSON.parse(window.localStorage.getItem('frame'))
      setFrame(frameInicial)
      asignarFrame(frameInicial.colorFrame)
    }, [])

    useEffect(() => {
      const unsubscribe = window.localStorage.setItem('urlBackground', JSON.stringify(urlBackground))
      return unsubscribe
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

        <ContenedorImagen 
            background={urlBackground?.urlLocal || rutaBackground?.urlLocal}
            imagen={publicId}
            colorFrame={frame.colorFrame || tieneFrame.colorFrame}
        >
        </ContenedorImagen>

        <ContenedorFondos 
            handleBack={e => handleBack(e)}
            nombre={urlBackground.nombre}
        />

        <Paginacion
          retroceder={"true"}
          rutaAnterior={"/createart/imageupload"}
          adelantar={"true"}
          rutaSiguiente={"/createart/frame"}
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
