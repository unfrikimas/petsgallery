import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import IconFlechaAdelante from '../icons/FlechaAdelante'
import IconFlechaAtras from '../icons/FlechaAtras'
import Toggle from '../layout/Toggle'

const Paginacion = ({retroceder, rutaAnterior, pantallaAnterior, adelantar, rutaSiguiente, pantallaSiguiente, tienda=false}) => {
    
    const router = useRouter()
    
    return (  
        <>
        <div className="flex mt-8 w-80 mx-auto">
            <div className="w-1/2 flex flex-col items-center justify-center">
                { retroceder &&
                    <>
                    <Link href={rutaAnterior} passHref>
                        <a className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 sombra">
                            <IconFlechaAtras />
                        </a>
                    </Link>
                    <p className="pt-2 text-sm text-gray-700">{pantallaAnterior}</p>
                    </>
                }
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
                { adelantar && 
                    <>
                    <Link href={rutaSiguiente} passHref>
                        <a className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-gray-800 sombra">
                            <IconFlechaAdelante />
                        </a>
                    </Link>
                    <p className="pt-2 text-sm text-gray-700">{pantallaSiguiente}</p>
                    </>
                }
                { tienda && 
                    <Link href="/createart/shop">
                        <a className="">
                            <p className="text-white text-4xl font-bold borde-negro">Premium</p>
                            <p className="text-gray-800 text-3xl font-black">products</p>
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
          .borde-negro {
                -webkit-text-stroke: 1px black;
            }
        `}
        </style>
        </>
    );
}
 
export default Paginacion;