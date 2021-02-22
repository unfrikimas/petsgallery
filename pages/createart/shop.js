import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import HeaderUser from "../../components/layout/HeaderUser";
import imageContext from "../../context/image/imageContext";
import Paginacion from "../../components/layout/Paginacion";
import ContenedorProductos from "../../components/layout/ContenedorProductos";

const Shop = () => {
  //context de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  //context de la imagen
  const ImageContext = useContext(imageContext);
  const {
    public_Id,
    filtro,
    rutaBackground,
    tieneFrame,
    nombreMascota,
    guardarIdPublico,
    asignarFiltro,
    asignarBackground,
    asignarFrame,
    asignarNombreMascota,
    asignarFuente,
    asignarColorFuente,
  } = ImageContext;

  //states
  const [publicId, setPublicId] = useState(public_Id);
  const [filtroImagen, setFiltroImagen] = useState(filtro);
  const [urlBackground, setUrlBackground] = useState(rutaBackground);
  const [frame, setFrame] = useState(tieneFrame);
  const [texto, setTexto] = useState(nombreMascota);

  useEffect(() => {
    const backgroundInicial = JSON.parse(
      window.localStorage.getItem("urlBackground")
    );
    if (backgroundInicial) {
      setUrlBackground(backgroundInicial);
      asignarBackground(backgroundInicial);
    }
    const idInicial = JSON.parse(window.localStorage.getItem("publicId"));
    if (idInicial) {
      setPublicId(idInicial);
      guardarIdPublico(idInicial);
    }
    const filtroInicial = JSON.parse(
      window.localStorage.getItem("pets-filter")
    );
    if (filtroInicial) {
      setFiltroImagen(filtroInicial);
      asignarFiltro(filtroInicial);
    }
    const frameInicial = JSON.parse(window.localStorage.getItem("frame"));
    if (frameInicial) {
      setFrame(frameInicial);
      asignarFrame(frameInicial.colorFrame);
    }
    const textoInicial = JSON.parse(
      window.localStorage.getItem("petsgallery-texto")
    );
    if (textoInicial) {
      setTexto(textoInicial);
      asignarNombreMascota(textoInicial.textoMascota);
      asignarFuente(textoInicial.fuente);
      asignarColorFuente(textoInicial.colorTexto);
    }
  }, []);

  return (
    <>
      <div className="max-w-lg mx-auto">
        <HeaderUser
          titulo={"Premium products"}
          usuario={usuario}
          firebase={firebase}
        />

        <ContenedorProductos
          background={urlBackground.urlLocal || ""}
          imagen={publicId}
          filtro={filtroImagen || "none"}
          colorFrame={frame.colorFrame || "none"}
          nombreMascota={texto || ""}
        />

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/download"}
          pantallaAnterior={"Download"}
          adelantar={false}
          rutaSiguiente={""}
          tienda={false}
        />

        <style jsx>
          {`
            .sombra {
              box-shadow: 0px 4px 0px #18191f;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Shop;
