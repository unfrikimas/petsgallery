import React from "react";
import { Image, Transformation } from "cloudinary-react";

const ContenedorOpcionesFiltros = ({ handleFilter, imagen, nombre }) => {
  return (
    <>
      <div className="mt-6 mx-auto">
          <div className="relative flex items-center justify-center space-x-4">
            <figure
              className={`rounded-2xl w-24 h-24 ${nombre === "none" ? "sombra" : ""}`}
            >
              <picture
                className="z-10 relative h-24 flex justify-center rounded-2xl border border-gray-800 overflow-hidden"
                onClick={() => handleFilter("none")}
              >
                {imagen.publicid && imagen.format === "png" ?
                  <Image
                      className={`z-10`}
                      cloudName="petportrait" 
                      secure="true"
                      publicId={imagen.publicid}
                      dpr="auto"
                      width="auto"
                      height="auto"
                      >
                      <Transformation effect="trim:10" />
                      <Transformation effect="sharpen" />
                      <Transformation width="360" height="360" crop="fit" />
                  </Image>
                :
                  <Image 
                      className={`z-10`}
                      cloudName="petportrait" 
                      secure="true"
                      publicId={imagen.publicid}
                      dpr="auto"
                      width="auto"
                      >
                      <Transformation effect="sharpen" />
                      <Transformation width="360" height="360" crop="fill" />
                  </Image>
                }

                <figcaption className="z-20 absolute w-full bottom-0 py-1 text-white text-xs text-center bg-gray-800 ">
                  None
                </figcaption>
              </picture>
            </figure>

            <figure
              className={`rounded-2xl w-24 h-24 ${nombre === "grayscale" ? "sombra" : ""}`}
            >
              <picture
                className="z-10 relative h-24 flex justify-center rounded-2xl border border-gray-800 overflow-hidden"
                onClick={() => handleFilter("grayscale")}
              >
                {imagen.publicid && imagen.format === "png" ?
                  <Image
                      className={`z-10`}
                      cloudName="petportrait" 
                      secure="true"
                      publicId={imagen.publicid}
                      dpr="auto"
                      width="auto"
                      height="auto"
                      >
                      <Transformation effect="trim:10" />
                      <Transformation effect="grayscale" />
                      <Transformation effect="sharpen" />
                      <Transformation width="360" height="360" crop="fit" />
                  </Image>
                :
                  <Image 
                      className={`z-10`}
                      cloudName="petportrait" 
                      secure="true"
                      publicId={imagen.publicid}
                      dpr="auto"
                      width="auto"
                      >
                      <Transformation effect="grayscale" />
                      <Transformation effect="sharpen" />
                      <Transformation width="360" height="360" crop="fill" />
                  </Image>
                }

                <figcaption className="z-20 absolute w-full bottom-0 py-1 text-white text-xs text-center bg-gray-800 ">
                  Grayscale
                </figcaption>
              </picture>
            </figure>

            <figure
              className={`rounded-2xl w-24 h-24 ${nombre === "vectorize" ? "sombra" : ""}`}
            >
              <picture
                className="z-10 relative h-24 flex justify-center rounded-2xl border border-gray-800 overflow-hidden"
                onClick={() => handleFilter("vectorize")}
              >
                {imagen.publicid && imagen.format === "png" ?
                  <Image
                      className={`z-10`}
                      cloudName="petportrait" 
                      secure="true"
                      publicId={imagen.publicid}
                      dpr="auto"
                      width="auto"
                      height="auto"
                      >
                      <Transformation effect="trim:10" />
                      <Transformation effect="vectorize" />
                      <Transformation effect="sharpen" />
                      <Transformation width="360" height="360" crop="fit" />
                  </Image>
                :
                  <Image 
                      className={`z-10`}
                      cloudName="petportrait" 
                      secure="true"
                      publicId={imagen.publicid}
                      dpr="auto"
                      width="auto"
                      >
                      <Transformation effect="vectorize" />
                      <Transformation effect="sharpen" />
                      <Transformation width="360" height="360" crop="fill" />
                  </Image>
                }

                <figcaption className="z-20 absolute w-full bottom-0 py-1 text-white text-xs text-center bg-gray-800 ">
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
            overflow: hidden;
            transition: all .2s ease-in-out;
          }
          .sombra {
            box-shadow: 0px 4px 0px #ffbd12;
          }
        `}
      </style>
    </>
  );
};

export default ContenedorOpcionesFiltros;
