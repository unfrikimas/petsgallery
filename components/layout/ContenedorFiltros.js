import React from "react";
import {Image, Transformation} from 'cloudinary-react'

const ContenedorFiltros = ({ handleFilter, imagen, nombre }) => {
  return (
    <>
      <div className="mt-6 section-overflow-x">
        <div className="relative pl-6 py-3 horizontal-frame-list items-center justify-center">
          <figure
            className={`rounded-2xl ${nombre === "none" ? "sombra" : ""}`}
          >
            <picture
                className="z-10 flex flex-col imagen overflow-hidden border-2 border-gray-800"
                onClick={() => handleFilter("none")}
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
                    <Transformation effect="sharpen" />
                    <Transformation width="100" height="100" crop="fill" />
                </Image>
                <figcaption className="z-20 w-full pb-1 text-white text-xs text-center bg-gray-800 ">None</figcaption>
            </picture>
          </figure>
          <figure
            className={`rounded-2xl ${nombre === "grayscale" ? "sombra" : ""}`}
          >
            <picture
                className="z-10 imagen flex flex-col overflow-hidden border-2 border-gray-800"
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
                <figcaption className="z-20 w-full pb-1 text-white text-xs text-center bg-gray-800 ">Grayscale</figcaption>
            </picture>
          </figure>
          <figure
            className={`rounded-2xl ${nombre === "vectorize" ? "sombra" : ""}`}
          >
            <picture
                className="z-10 imagen border-2 border-gray-800 flex flex-col overflow-hidden"
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
                <figcaption className="z-20 w-full pb-1 text-white text-xs text-center bg-gray-800 ">Vectorize</figcaption>
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
            display: flex;
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
            display: flex;
            cursor: pointer;
            margin: 0;
            user-select: none;
            transition: transform 0.2s ease-in-out;
            overflow: hidden;
          }
          figure:hover {
            transform: scale(1.1);
          }
          picture {
            display: inline-block;
            inline-size: 10ch;
            block-size: 10ch;
          }
          .imagen {
            display: block;
            inline-size: 100%;
            block-size: 100%;
            object-fit: cover;
            border-radius: 16px;
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
