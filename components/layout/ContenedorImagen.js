import React from 'react';
import {Image, Transformation} from 'cloudinary-react'
import { calculoFuenteCotenedorImagen } from '../../utils/helper'

const ContenedorImagen = (props) => {

    const {background, filtro, colorFrame, imagen, mostrarCargandoImagen=false, nombreMascota} = props

    return (  
        <>
        <div 
            className="z-0 relative flex items-center justify-center mx-auto w-80 h-80 mt-4 border-2 border-gray-800 rounded-2xl sombra overflow-hidden bg-cover"
            style={ { backgroundImage: `url(${background})` } }
        >

            { colorFrame === "white" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-white">
                </div>
            )}
            { colorFrame === "black" && (
                <div 
                className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-black">
                </div>
            )}
            { colorFrame === "red" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-red-600">
                </div>
            )}
            { colorFrame === "pink" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-pink-600">
                </div>
            )}
            { colorFrame === "yellow" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-yellow-500">
                </div>
            )}
            { colorFrame === "blue" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-blue-600">
                </div>
            )}
            { colorFrame === "indigo" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-indigo-600">
                </div>
            )}
            { colorFrame === "purple" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-purple-600">
                </div>
            )}
            { colorFrame === "green" && (
                <div 
                    className="z-1 absolute bottom-7 w-60 h-60 bg-transparent border-12 border-green-600">
                </div>
            )}

            {imagen.publicid && imagen.format === "png" ?
                <Image
                    className={`z-10 pt-2 ${mostrarCargandoImagen ? "animate-pulse" : ""}`}
                    cloudName="petportrait" 
                    secure="true"
                    publicId={imagen.publicid}
                    dpr="auto"
                    width="auto"
                    >
                    {filtro === "vectorize" && <Transformation effect="vectorize" />}
                    <Transformation effect="trim:10" />
                    {filtro === "grayscale" && <Transformation effect="grayscale" />}
                    <Transformation effect="sharpen" />
                    <Transformation width="310" height="310" crop="fit" />
                </Image>
            :
                <Image 
                    className={`z-10 ${mostrarCargandoImagen ? "animate-pulse" : ""}`}
                    cloudName="petportrait" 
                    secure="true"
                    publicId={imagen.publicid}
                    dpr="auto"
                    width="auto"
                    >
                    {filtro === "vectorize" && <Transformation effect="vectorize" />}
                    {/* <Transformation effect="trim:10" /> */}
                    {filtro === "grayscale" && <Transformation effect="grayscale" />}
                    <Transformation effect="sharpen" />
                    <Transformation width="320" height="320" crop="fill" />
                </Image>
            }

            { !imagen.publicid && mostrarCargandoImagen &&
                <div className="animate-pulse h-full w-full flex items-center justify-center">
                    <p className="px-4 py-2 bg-white font-bold border-2 border-gray-800 rounded-xl">Uploading...</p>
                </div>
            }

            { nombreMascota.textoMascota && nombreMascota.fuente === "Kanit" &&
                <p 
                  className={`z-20 absolute bottom-0 text-center font-extrabold ${nombreMascota.colorTexto === "white" && "text-white borde-negro"} ${nombreMascota.colorTexto === "black" && "text-black"} ${nombreMascota.colorTexto === "red" && "text-red-600"} ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${nombreMascota.colorTexto === "yellow" && "text-yellow-500"} ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${nombreMascota.colorTexto === "indigo" && "text-indigo-600"} ${nombreMascota.colorTexto === "purple" && "text-purple-600"} ${nombreMascota.colorTexto === "green" && "text-green-600"} fuente_kanit ${calculoFuenteCotenedorImagen(nombreMascota.textoMascota, nombreMascota.fuente, nombreMascota.colorTexto)}`}>
                    {nombreMascota.textoMascota}
                </p>
            }

            { nombreMascota.textoMascota && nombreMascota.fuente === "Suez%20One" &&
                <p 
                  className={`z-20 absolute bottom-0 tracking-normal text-center ${nombreMascota.colorTexto === "white" && "text-white borde-negro"} ${nombreMascota.colorTexto === "black" && "text-black"} ${nombreMascota.colorTexto === "red" && "text-red-600"} ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${nombreMascota.colorTexto === "yellow" && "text-yellow-500"} ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${nombreMascota.colorTexto === "indigo" && "text-indigo-600"} ${nombreMascota.colorTexto === "purple" && "text-purple-600"} ${nombreMascota.colorTexto === "green" && "text-green-600"} fuente_Suez ${calculoFuenteCotenedorImagen(nombreMascota.textoMascota, nombreMascota.fuente, nombreMascota.colorTexto)}`}>
                    {nombreMascota.textoMascota}
                </p>
            }

        </div>

        <style jsx>{`
            .sombra {
                box-shadow: 0px 4px 0px #18191F;
            }
            .fuente_kanit {
                font-family: 'Kanit', serif;
            }
            .fuente-3 {
                font-size: 1.875rem;
            }
            .fuente-4 {
                font-size: 2.25rem;
            }
            .fuente-5 {
                font-size: 3rem;
            }
            .fuente-6 {
                font-size: 3.75rem;
            }
            .fuente-7 {
                font-size: 4.5rem;
            }
            .abajo-1 {
                bottom: 0.25rem;
            }
            .abajo-2 {
                bottom: 0.5rem;
            }
            .abajo-3 {
                bottom: 0.75rem;
            }
            .abajo-4 {
                bottom: 1rem;
            }
            .fuente_Suez {
                font-family: 'Suez One', serif;
            }
            .borde-minimo-negro {
                -webkit-text-stroke: 3px black;
            }
            .borde-minimo-blanco {
                -webkit-text-stroke: 1px white;
            }
            .borde-maximo-blanco {
                -webkit-text-stroke: 3px white;
            }
            .borde-maximo-negro {
                -webkit-text-stroke: 4px black;
            }
        `}
        </style>
        </>
    );
}
 
export default ContenedorImagen;