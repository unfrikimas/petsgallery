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
};

const ContenedorFondos = (props) => {
  const { nombre, handleBack } = props;

  return (
    <div className="mt-8 h-28">
      <ul className="flex h-full space-x-2 items-center justify-center">
        <li className={`rounded-2xl overflow-hidden ${nombre === 'amarillo' ? "p-1 border-4 border-amarillo" : ""}`}>
          <img
            src="/images/backs/back1.jpg"
            className="h-24 w-24 cursor-pointer rounded-2xl"
            onClick={() => handleBack(BACKS.amarillo)}
          />
        </li>
        <li className={`rounded-2xl overflow-hidden ${nombre === 'azul' ? "p-1 border-4 border-amarillo" : ""}`}>
          <img
            src="/images/backs/back2.jpg"
            className="h-24 w-24 cursor-pointer rounded-2xl"
            onClick={() => handleBack(BACKS.azul)}
          />
        </li>
        <li className={`rounded-2xl overflow-hidden ${nombre === 'negro' ? "p-1 border-4 border-amarillo" : ""}`}>
          <img
            src="/images/backs/back3.jpg"
            className="h-24 w-24 cursor-pointer rounded-2xl"
            onClick={() => handleBack(BACKS.negro)}
          />
        </li>
      </ul>
    </div>
  );
};

export default ContenedorFondos;
