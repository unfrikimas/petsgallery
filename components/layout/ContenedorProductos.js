import React from 'react';
import {Image, Transformation} from 'cloudinary-react'

const ContenedorProductos = (props) => {

    const {background, colorFrame, imagen, nombreMascota} = props

    function isUpperCase(str) {
        return str == str.toUpperCase() && str != str.toLowerCase();
    }

    return (  
        <>

        <div className="w-72 sombra border-2 border-gray-800 rounded-2xl bg-white mx-auto mt-6 overflow-hidden">

            <div 
                className="z-0 relative flex items-center justify-center mx-auto w-full h-52 overflow-hidden bg-cover"
                style={{backgroundImage: "url(https://res.cloudinary.com/petportrait/image/upload/v1612776017/petsgallery/mockups/mockup_room_djxxbs.jpg)"}}>

            <div 
                className="z-1 shadow-md relative flex justify-center -top-12 -left-6 w-20 h-20 overflow-hidden bg-cover" 
                style={ { backgroundImage: `url(${background})` } }
            >

                { colorFrame === "white" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-white">
                    </div>
                )}
                { colorFrame === "black" && (
                    <div 
                    className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-black">
                    </div>
                )}
                { colorFrame === "red" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-red-600">
                    </div>
                )}
                { colorFrame === "pink" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-pink-600">
                    </div>
                )}
                { colorFrame === "yellow" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-yellow-500">
                    </div>
                )}
                { colorFrame === "blue" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-blue-600">
                    </div>
                )}
                { colorFrame === "indigo" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-indigo-600">
                    </div>
                )}
                { colorFrame === "purple" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-purple-600">
                    </div>
                )}
                { colorFrame === "green" && (
                    <div 
                        className="z-1 absolute bottom-2 w-16 h-16 bg-transparent border-4 border-green-600">
                    </div>
                )}

                <Image 
                    className="z-10 pt-1"
                    cloudName="petportrait" 
                    publicId={imagen}
                    >
                    <Transformation effect="vectorize" />
                    <Transformation effect="trim:10" />
                    <Transformation width="78" height="78" crop="fit" />
                </Image>


                { nombreMascota.textoMascota && nombreMascota.fuente === "Kanit" &&
                    <p 
                    className={`z-20 absolute bottom-0 leading-2 font-extrabold text-center ${nombreMascota.colorTexto === "white" && "text-white borde-negro"} ${nombreMascota.colorTexto === "black" && "text-black"} ${nombreMascota.colorTexto === "red" && "text-red-600"} ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${nombreMascota.colorTexto === "yellow" && "text-yellow-500"} ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${nombreMascota.colorTexto === "indigo" && "text-indigo-600"} ${nombreMascota.colorTexto === "purple" && "text-purple-600"} ${nombreMascota.colorTexto === "green" && "text-green-600"} fuente_kanit ${nombreMascota.textoMascota.length <= 5 & isUpperCase(nombreMascota.textoMascota) ? "text-xl" : nombreMascota.textoMascota.length < 7 && isUpperCase(nombreMascota.textoMascota) ? "text-lg" : nombreMascota.textoMascota.length <= 7 ? "text-xl" : nombreMascota.textoMascota.length >= 8 ? "text-sm" : "text-md"}`}>
                        {nombreMascota.textoMascota}
                    </p>
                }

                { nombreMascota.textoMascota && nombreMascota.fuente === "Leckerli%20One" &&
                    <p 
                    className={`z-20 absolute leading-12 bottom-4 tracking-wider text-center ${nombreMascota.colorTexto === "white" && "text-white borde-negro"} ${nombreMascota.colorTexto === "black" && "text-black"} ${nombreMascota.colorTexto === "red" && "text-red-600"} ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${nombreMascota.colorTexto === "yellow" && "text-yellow-500"} ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${nombreMascota.colorTexto === "indigo" && "text-indigo-600"} ${nombreMascota.colorTexto === "purple" && "text-purple-600"} ${nombreMascota.colorTexto === "green" && "text-green-600"} fuente_leckerli ${nombreMascota.textoMascota.length <= 5 & isUpperCase(nombreMascota.textoMascota) ? "text-6xl" : nombreMascota.textoMascota.length <= 7 ? "text-6xl" : "text-2xl"}`}>
                        {nombreMascota.textoMascota}
                    </p>
                }
                </div>
            </div>
            
            <div className="p-6">
                <p className="text-gray-700 text-xl font-bold ">
                    Canvas 40x40 inchs
                </p>
                <p className="text-gray-700 text-md">
                    Free shipping
                </p>
                <div className="flex items-center justify-between ">
                    <p className="text-gray-800 font-bold text-2xl">
                        $47.00
                    </p>
                    <button type="button" className="w-10 h-10 text-base font-medium rounded-full text-gray-800 bg-amarillo border-2 border-gray-800 sombra">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fill="black" viewBox="0 0 1792 1792">
                            <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div className="w-72 sombra border-2 border-gray-800 rounded-2xl bg-white mx-auto mt-6 overflow-hidden">
            
            <div className="p-6">
                <p className="text-gray-700 text-xl font-bold ">
                    High Quality Image 
                </p>
                <p className="text-gray-700 text-md">
                    Instant download
                </p>
                <div className="flex items-center justify-between ">
                    <p className="text-gray-800 font-bold text-2xl">
                        $37.00
                    </p>
                    <button type="button" className="w-10 h-10 text-base font-medium rounded-full text-gray-800 bg-amarillo border-2 border-gray-800 sombra">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mx-auto" fill="black" viewBox="0 0 1792 1792">
                            <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>        

        <style jsx>{`
            .sombra {
                box-shadow: 0px 4px 0px #18191F;
            }
            .fuente_kanit {
                font-family: 'Kanit', serif;
                -webkit-text-stroke: 1px white;
            }
            .fuente_leckerli {
                font-family: 'Leckerli One', serif;
                font-weight: black;
                -webkit-text-stroke: 1px white;
            }
            .borde-negro {
                -webkit-text-stroke: 1px black;
            }
            .medida-frame {
                width: 82px;
                height: 82px;
            }
        `}
        </style>
        </>
    );
}
 
export default ContenedorProductos;