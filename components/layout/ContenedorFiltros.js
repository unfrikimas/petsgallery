import React from "react";
import { Image, Transformation } from "cloudinary-react";

const ContenedorFiltros = ({ handleFilter, imagen, nombre }) => {
  return (
    <>
      <div className="w-80 mt-6 mx-auto">
          <div className="relative flex items-center justify-center space-x-4">
            <figure
              className={`rounded-2xl ${nombre === "none" ? "sombra" : ""}`}
            >
              <picture
                className="z-10 flex flex-col rounded-2xl border-2 border-gray-800"
                onClick={() => handleFilter("none")}
              >
                <Image
                  className="z-10"
                  cloudName="petportrait"
                  secure="true"
                  publicId={imagen}
                  dpr="auto"
                  width="auto"
                >
                  {/* <Transformation effect="trim:10" /> */}
                  <Transformation effect="sharpen" />
                  <Transformation width="100" height="100" crop="fill" />
                </Image>
                <figcaption className="z-20 w-full py-1 text-white text-xs text-center bg-gray-800 ">
                  None
                </figcaption>
              </picture>
            </figure>
            <figure
              className={`rounded-2xl ${nombre === "grayscale" ? "sombra" : ""}`}
            >
              <picture
                className="z-10 flex flex-col rounded-2xl border-2 border-gray-800"
                onClick={() => handleFilter("grayscale")}
              >
                <Image
                  className="z-10 imagen"
                  cloudName="petportrait"
                  secure="true"
                  publicId={imagen}
                  dpr="auto"
                  width="auto"
                >
                  {/* <Transformation effect="trim:10" /> */}
                  <Transformation effect="grayscale" />
                  <Transformation effect="sharpen" />
                  <Transformation width="100" height="100" crop="fill" />
                </Image>
                <figcaption className="z-20 w-full py-1 text-white text-xs text-center bg-gray-800 ">
                  Grayscale
                </figcaption>
              </picture>
            </figure>
            <figure
              className={`rounded-2xl ${nombre === "vectorize" ? "sombra" : ""}`}
            >
              <picture
                className="z-10 rounded-2xl border-2 border-gray-800 flex flex-col"
                onClick={() => handleFilter("vectorize")}
              >
                <Image
                  cloudName="petportrait"
                  secure="true"
                  publicId={imagen}
                  dpr="auto"
                  width="auto"
                >
                  {/* <Transformation effect="trim:10" /> */}
                  <Transformation effect="vectorize" />
                  <Transformation effect="sharpen" />
                  <Transformation width="100" height="100" crop="fill" />
                </Image>
                <figcaption className="z-20 w-full py-1 text-white text-xs text-center bg-gray-800 ">
                  Vectorize
                </figcaption>
              </picture>
            </figure>
          </div>
      </div>
      <style jsx>
        {`
          figure {
            cursor: pointer;
            margin: 0;
            user-select: none;
            transition: transform 0.2s ease-in-out;
            overflow: hidden;
          }
          .sombra {
            box-shadow: 0px 4px 0px #ffbd12;
            transform: scale(1.1);
          }
        `}
      </style>
    </>
  );
};

export default ContenedorFiltros;
