import React from 'react';

const ContenedorTexto = (props) => {

    const {nombreMascota, fuente, colorFuente, handleTexto, handleFuente, handleColorFuente} = props

    return (  

        <div className="w-80 mx-auto mt-6">

            <input 
                className="w-full px-2 py-2 border-2 border-gray-800 text-center text-gray-800 text-2xl font-bold focus:outline-none rounded-2xl sombra"
                type="text"
                name="nombre"
                value={nombreMascota}
                placeholder="Pet name"
                onChange={e => handleTexto(e)}
                autoComplete="off"
            />

            <div className="mt-4 space-x-4 flex items-center justify-center">

                <select
                    className={`w-3/5 px-2 py-2 border-2 bg-gray-100 border-gray-800 text-center text-gray-800 text-xl font-bold focus:outline-none rounded-2xl sombra`}
                    type="select" 
                    name="fuente" 
                    value={fuente}
                    onChange={e => handleFuente(e)}
                >
                    <option value="Kanit">Kanit</option>
                    <option value="Leckerli%20One">Lekerli</option>
                </select>

                <select
                    className={`w-2/5 px-2 py-2 border-2 border-gray-800 text-center text-xl font-bold focus:outline-none rounded-2xl sombra ${colorFuente === "white" ? "text-gray-800" : "text-white"} ${colorFuente === "white" && "bg-white"} ${colorFuente === "black" && "bg-black"} ${colorFuente === "red" && "bg-red-600"} ${colorFuente === "pink" && "bg-pink-600"} ${colorFuente === "yellow" && "bg-yellow-500"} ${colorFuente === "blue" && "bg-blue-600"} ${colorFuente === "indigo" && "bg-indigo-600"} ${colorFuente === "purple" && "bg-purple-600"} ${colorFuente === "green" && "bg-green-600"}`}
                    type="select" 
                    name="colorFuente" 
                    value={colorFuente}
                    onChange={e => handleColorFuente(e)}
                >
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="red">Red</option>
                    <option value="pink">Pink</option>
                    <option value="yellow">Yellow</option>
                    <option value="blue">Blue</option>
                    <option value="indigo">Indigo</option>
                    <option value="purple">Purple</option>
                    <option value="green">Green</option>
                </select>

            </div>

            <style jsx>
                {`
                .sombra {
                    box-shadow: 0px 4px 0px #18191f;
                }
                .ninguno {
                    color: red;
                }
                .fuente-kanit {
                    font-family: 'Kanit', serif;
                }
                .fuente-leckerli {
                    font-family: 'Leckerli One', serif;
                    font-weight: black;
                }
                `}
            </style>

        </div>

    );
}
 
export default ContenedorTexto;