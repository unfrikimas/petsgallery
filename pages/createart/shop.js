import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import Paginacion from "../../components/layout/Paginacion"
import ContenedorProductos from "../../components/layout/ContenedorProductos"

const Shop = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarColorFuente } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [frame, setFrame] = useState(tieneFrame)
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

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Premium products"}
        />

        <ContenedorProductos
            background={urlBackground.urlLocal ? urlBackground.urlLocal : ""}
            imagen={publicId.publicid}
            colorFrame={frame.colorFrame ? frame.colorFrame : "none"}
            nombreMascota={texto ? texto : ""}
        />

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/download"}
          adelantar={false}
          rutaSiguiente={""}
          tienda={false}
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

export default Shop;