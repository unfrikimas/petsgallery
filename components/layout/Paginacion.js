import React from 'react'
import Link from 'next/link'
import IconFlechaAdelante from '../icons/FlechaAdelante'
import IconFlechaAtras from '../icons/FlechaAtras'

const Paginacion = ({retroceder, rutaAnterior, adelantar, rutaSiguiente}) => {
    return (  
        <>
        <div className="flex mt-8">
            <div className="w-1/2 flex items-center justify-center">
                { retroceder === "true" &&
                    <Link href={rutaAnterior}>
                        <a className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 sombra">
                            <IconFlechaAtras />
                        </a>
                    </Link>
                }
            </div>
            <div className="w-1/2 flex items-center justify-center">
                { adelantar === "true" && 
                    <Link href={rutaSiguiente}>
                        <a className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 sombra">
                            <IconFlechaAdelante />
                        </a>
                    </Link>
                }
            </div>
        </div>
        <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
        `}
        </style>
        </>
    );
}
 
export default Paginacion;