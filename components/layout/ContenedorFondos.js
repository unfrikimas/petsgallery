import React, { useState } from "react";

export const BACKS = {
  amarillo: {
    nombre: "amarillo",
    urlLocal: "/images/backs/back1.jpg",
    archivoConExtension: "back1_hlttte.jpg",
    archivoSinExtension: "back1_hlttte",
    idPublico: "petsgallery/backs/back1_hlttte",
    idPublicoModificado: "petsgallery:backs:back1_hlttte",
  },
  azul: {
    nombre: "azul",
    archivoConExtension: "back2_ug5tjb.jpg",
    urlLocal: "/images/backs/back2.jpg",
    archivoSinExtension: "back2_ug5tjb",
    idPublico: "petsgallery/backs/back2_ug5tjb",
    idPublicoModificado: "petsgallery:backs:back2_ug5tjb",
  },
  negro: {
    nombre: "negro",
    urlLocal: "/images/backs/back3.jpg",
    archivoConExtension: "back3_gmufkg.jpg",
    archivoSinExtension: "back3_gmufkg",
    idPublico: "petsgallery/backs/back3_gmufkg",
    idPublicoModificado: "petsgallery:backs:back3_gmufkg",
  },
  rosa: {
    nombre: "rosa",
    urlLocal: "/images/backs/back4.jpg",
    archivoConExtension: "back4_a8jt5i.jpg",
    archivoSinExtension: "back4_a8jt5i",
    idPublico: "petsgallery/backs/back4_a8jt5i",
    idPublicoModificado: "petsgallery:backs:back4_a8jt5i",
  },
  gris: {
    nombre: "gris",
    urlLocal: "/images/backs/back5.jpg",
    archivoConExtension: "back5_n3rsiu.jpg",
    archivoSinExtension: "back5_n3rsiu",
    idPublico: "petsgallery/backs/back5_n3rsiu",
    idPublicoModificado: "petsgallery:backs:back5_n3rsiu",
  },
  rayos: {
    nombre: "rayos",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-06_hjgnzg.jpg",
    archivoConExtension: "fondos_pets-06_hjgnzg.jpg",
    archivoSinExtension: "fondos_pets-06_hjgnzg",
    idPublico: "petsgallery/backs/fondos_pets-06_hjgnzg",
    idPublicoModificado: "petsgallery:backs:fondos_pets-06_hjgnzg",
  },
  sandias: {
    nombre: "sandias",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-07_dnvzpq.jpg",
    archivoConExtension: "fondos_pets-07_dnvzpq.jpg",
    archivoSinExtension: "fondos_pets-07_dnvzpq",
    idPublico: "petsgallery/backs/fondos_pets-07_dnvzpq",
    idPublicoModificado: "petsgallery:backs:fondos_pets-07_dnvzpq",
  },
  bananas: {
    nombre: "bananas",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-01_amnvd4.jpg",
    archivoConExtension: "fondos_pets-01_amnvd4.jpg",
    archivoSinExtension: "fondos_pets-01_amnvd4",
    idPublico: "petsgallery/backs/fondos_pets-01_amnvd4",
    idPublicoModificado: "petsgallery:backs:fondos_pets-01_amnvd4",
  },
  lazos: {
    nombre: "lazos",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-08_iux5b6.jpg",
    archivoConExtension: "fondos_pets-08_iux5b6.jpg",
    archivoSinExtension: "fondos_pets-08_iux5b6",
    idPublico: "petsgallery/backs/fondos_pets-08_iux5b6",
    idPublicoModificado: "petsgallery:backs:fondos_pets-08_iux5b6",
  },
  huesos: {
    nombre: "huesos",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-03_fa2dl0.jpg",
    archivoConExtension: "fondos_pets-03_fa2dl0.jpg",
    archivoSinExtension: "fondos_pets-03_fa2dl0",
    idPublico: "petsgallery/backs/fondos_pets-03_fa2dl0",
    idPublicoModificado: "petsgallery:backs:fondos_pets-03_fa2dl0",
  },
  manzanas: {
    nombre: "manzanas",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-02_zeq5ia.jpg",
    archivoConExtension: "fondos_pets-02_zeq5ia.jpg",
    archivoSinExtension: "fondos_pets-02_zeq5ia",
    idPublico: "petsgallery/backs/fondos_pets-02_zeq5ia",
    idPublicoModificado: "petsgallery:backs:fondos_pets-02_zeq5ia",
  },
  peras: {
    nombre: "peras",
    urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-05_nmk1so.jpg",
    archivoConExtension: "fondos_pets-05_nmk1so.jpg",
    archivoSinExtension: "fondos_pets-05_nmk1so",
    idPublico: "petsgallery/backs/fondos_pets-05_nmk1so",
    idPublicoModificado: "petsgallery:backs:fondos_pets-05_nmk1so",
  },
};

const ContenedorFondos = (props) => {
  const { nombre, handleBack } = props;

  return (
    <>
    <div className={`mt-6 section-overflow-x`}>
      <div className={`relative pl-6 py-3 horizontal-frame-list`}>
        <figure className={`rounded-2xl ${nombre === 'rayos' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.rayos.urlLocal}
              onClick={() => handleBack(BACKS.rayos)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'sandias' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.sandias.urlLocal}
              onClick={() => handleBack(BACKS.sandias)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'bananas' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.bananas.urlLocal}
              onClick={() => handleBack(BACKS.bananas)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'lazos' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.lazos.urlLocal}
              onClick={() => handleBack(BACKS.lazos)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'huesos' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.huesos.urlLocal}
              onClick={() => handleBack(BACKS.huesos)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'manzanas' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.manzanas.urlLocal}
              onClick={() => handleBack(BACKS.manzanas)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'peras' ? "sombra" : ""}`}>
          <picture>
            <img
              src={BACKS.peras.urlLocal}
              onClick={() => handleBack(BACKS.peras)}
            />
          </picture>
        </figure>


        {/* <figure className={`rounded-2xl ${nombre === 'amarillo' ? "sombra" : ""}`}>
          <picture>
            <img
              src="/images/backs/back1.jpg"
              onClick={() => handleBack(BACKS.amarillo)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'azul' ? "sombra" : ""}`}>
          <picture>
            <img
              src="/images/backs/back2.jpg"
              onClick={() => handleBack(BACKS.azul)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'negro' ? "sombra" : ""}`}>
          <picture>
            <img
              src="/images/backs/back3.jpg"
              onClick={() => handleBack(BACKS.negro)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'rosa' ? "sombra" : ""}`}>
          <picture>
            <img
              src="/images/backs/back4.jpg"
              onClick={() => handleBack(BACKS.rosa)}
            />
          </picture>
        </figure>
        <figure className={`rounded-2xl ${nombre === 'gris' ? "sombra" : ""}`}>
          <picture>
            <img
              src="/images/backs/back5.jpg"
              onClick={() => handleBack(BACKS.gris)}
            />
          </picture>
        </figure> */}

      </div>
    </div>
      <style jsx>
      {`
        .section-overflow-x {
          overflow-x: auto;
          overscroll-behavior-x: contain;
        }
        .horizontal-frame-list {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 10ch;
          gap: 1rem;
        }
        .horizontal-frame-list:last-child::after {
          content: "";
          width: 1rem;
          height: 100%;
          right: -1rem;
          inline-size: 1rem;
          block-size: 100%;
          inset-end: -1rem;
        }
        figure {
          display: grid;
          cursor: pointer;
          margin: 0;
          user-select: none;
          transition: transform .2s ease-in-out;
        }
        figure:hover {
          transform: scale(1.1);
        }
        picture {
          display: inline-block;
          inline-size: 10ch;
          block-size: 10ch;
        }
        img {
          display: block;
          inline-size: 100%;
          block-size: 100%;
          object-fit: cover;
          border-radius: 16px;

        }
        .sombra {
          box-shadow: 0px 4px 0px #18191F;
          transform: scale(1.1);
        }
      `}
    </style>
    </>
  );
};

export default ContenedorFondos;
