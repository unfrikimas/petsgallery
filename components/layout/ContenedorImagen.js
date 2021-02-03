import React from 'react';
import {Image, Transformation} from 'cloudinary-react'

const ContenedorImagen = ({background="", imagen, children}) => {
    return (  
        <>
        <div 
            className="z-10 flex items-center justify-center mx-auto w-80 h-80 mt-4 border-2 border-gray-800 rounded-2xl sombra pt-2 overflow-hidden bg-cover"
            style={ { backgroundImage: `url(${background})` } }
        >
            <Image 
                cloudName="petportrait" 
                secure="true"
                publicId={imagen && imagen}
                dpr="auto"
                width="auto"
            >
                <Transformation effect="vectorize" />
                <Transformation effect="trim:10" />
                <Transformation width="310" height="310" crop="fit" />
            </Image>
            {children}
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