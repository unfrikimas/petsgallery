import React, { useState, useContext } from "react"
import useLocalStorage from '../../hooks/useLocalStorage'
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFondos from '../../components/layout/ContenedorFondos'
import Paginacion from "../../components/layout/Paginacion"

const ElegirBackground = () => {
    
    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, asignarBackground } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState("")

    const handleBack = (e) => {
        asignarBackground(e)
        // setUrlBackground(e)
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Background"}
        />

        <ContenedorImagen 
            background={rutaBackground && rutaBackground.urlLocal}
            imagen={publicId && publicId}
        >
        </ContenedorImagen>

        <ContenedorFondos 
            handleBack={e => handleBack(e)}
        />

        <Paginacion
          retroceder={"true"}
          rutaAnterior={"/createart/imageupload"}
          adelantar={"true"}
          rutaSiguiente={"/"}
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
