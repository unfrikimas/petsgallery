import React from 'react';
import {Image, Transformation} from 'cloudinary-react'
import { calculoFuenteCotenedorImagen } from '../../utils/helper'

const ContenedorImagen = (props) => {

    const {background, colorFrame, imagen, mostrarCargandoImagen=false, nombreMascota} = props

    function isUpperCase(str) {
        return str == str.toUpperCase() && str != str.toLowerCase();
    }

    return (  
        <>
        <div 
            className="z-0 relative flex items-center justify-center mx-auto w-80 h-80 mt-4 border-2 border-gray-800 rounded-2xl sombra pt-2 overflow-hidden bg-cover"
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

            <Image 
                className="z-10"
                cloudName="petportrait" 
                secure="true"
                publicId={imagen}
                dpr="auto"
                width="auto"
                >
                <Transformation effect="vectorize" />
                <Transformation effect="trim:10" />
                <Transformation width="310" height="310" crop="fit" />
            </Image>

            { !imagen && mostrarCargandoImagen &&
                <div className="h-full w-full flex items-center justify-center">
                    <p className="px-4 py-2 bg-white font-bold border-2 border-gray-800 rounded-xl">Uploading...</p>
                </div>
            }

            { nombreMascota.textoMascota && nombreMascota.fuente === "Kanit" &&
                <p 
                  className={`z-20 absolute leading-12 font-extrabold bottom-6 text-center ${nombreMascota.colorTexto === "white" && "text-white borde-negro"} ${nombreMascota.colorTexto === "black" && "text-black"} ${nombreMascota.colorTexto === "red" && "text-red-600"} ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${nombreMascota.colorTexto === "yellow" && "text-yellow-500"} ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${nombreMascota.colorTexto === "indigo" && "text-indigo-600"} ${nombreMascota.colorTexto === "purple" && "text-purple-600"} ${nombreMascota.colorTexto === "green" && "text-green-600"} fuente_kanit ${calculoFuenteCotenedorImagen(nombreMascota.textoMascota, nombreMascota.fuente)}`}>
                    {nombreMascota.textoMascota}
                </p>
            }

            { nombreMascota.textoMascota && nombreMascota.fuente === "Leckerli%20One" &&
                <p 
                  className={`z-20 absolute leading-12 bottom-7 tracking-wider text-center ${nombreMascota.colorTexto === "white" && "text-white borde-negro"} ${nombreMascota.colorTexto === "black" && "text-black"} ${nombreMascota.colorTexto === "red" && "text-red-600"} ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${nombreMascota.colorTexto === "yellow" && "text-yellow-500"} ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${nombreMascota.colorTexto === "indigo" && "text-indigo-600"} ${nombreMascota.colorTexto === "purple" && "text-purple-600"} ${nombreMascota.colorTexto === "green" && "text-green-600"} fuente_leckerli ${nombreMascota.textoMascota.length <= 5 & isUpperCase(nombreMascota.textoMascota) ? "text-7xl" : nombreMascota.textoMascota.length <= 7 ? "text-7xl" : "text-6xl"}`}>
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
            .fuente_leckerli {
                font-family: 'Leckerli One', serif;
                font-weight: black;
                -webkit-text-stroke: 3px white;
            }
            .borde-negro {
                -webkit-text-stroke: 4px black;
            }
            .borde-minimo {
                -webkit-text-stroke: 2px white;
            }
            .borde-maximo {
                -webkit-text-stroke: 3px white;
            }
        `}
        </style>
        </>
    );
}
 
export default ContenedorImagen;