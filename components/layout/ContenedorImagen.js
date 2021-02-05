import React from 'react';
import {Image, Transformation} from 'cloudinary-react'

const ContenedorImagen = ({background, colorFrame, imagen, mostrarCargandoImagen=false}) => {
    return (  
        <>
        <div 
            className="z-0 relative flex items-center justify-center mx-auto w-80 h-80 mt-4 border-2 border-gray-800 rounded-2xl sombra pt-2 overflow-hidden bg-cover"
            style={ { backgroundImage: `url(${background})` } }
        >
            { console.log(colorFrame) }
            {/* { colorFrame !== "none" && colorFrame !== "white" && colorFrame !== "black" && (
                <div 
                    className={`z-1 absolute w-60 h-60 bg-transparent border-12 border-${colorFrame}-600`}>
                </div>
            )} */}
            { colorFrame === "white" && (
                <div 
                    className="z-1 absolute w-60 h-60 bg-transparent border-12 border-white">
                </div>
            )}
            { colorFrame === "red" && (
                <div 
                    className="z-1 absolute w-60 h-60 bg-transparent border-12 border-red-600">
                </div>
            )}
            { colorFrame === "black" && (
                <div 
                    className="z-1 absolute w-60 h-60 bg-transparent border-12 border-black">
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

        </div>

        <style jsx>{`
            .sombra {
                box-shadow: 0px 4px 0px #18191F;
            }
        `}
        </style>
        </>
    );
}
 
export default ContenedorImagen;