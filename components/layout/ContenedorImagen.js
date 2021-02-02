import React from 'react';
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react'

const ContenedorImagen = ({imagen}) => {
    return (  
        <>
        <div className="relative z-10 flex items-center justify-center mx-auto w-80 h-80 mt-4 border-2 border-gray-800 rounded-2xl sombra pt-2">
            <Image 
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