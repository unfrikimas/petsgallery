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
    idPublico: "petsgallery/backs/back3_gmufkg.jpg",
    idPublicoModificado: "petsgallery:backs:back3_gmufkg.jpg",
  },
  rosa: {
    nombre: "rosa",
    urlLocal: "/images/backs/back4.jpg",
    archivoConExtension: "back4_a8jt5i.jpg",
    archivoSinExtension: "back4_a8jt5i",
    idPublico: "petsgallery/backs/back4_a8jt5i.jpg",
    idPublicoModificado: "petsgallery:backs:back4_a8jt5i.jpg",
  },
  gris: {
    nombre: "gris",
    urlLocal: "/images/backs/back5.jpg",
    archivoConExtension: "back5_n3rsiu.jpg",
    archivoSinExtension: "back5_n3rsiu",
    idPublico: "petsgallery/backs/back5_n3rsiu.jpg",
    idPublicoModificado: "petsgallery:backs:back5_n3rsiu.jpg",
  },
};

const ContenedorFondos = (props) => {
  const { nombre, handleBack } = props;

  return (
    <>
    <div className="mt-6 section-overflow-x">
      <div className="relative pl-6 py-3 horizontal-frame-list">
        <figure className={`rounded-2xl ${nombre === 'amarillo' ? "sombra" : ""}`}>
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
        </figure>
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
