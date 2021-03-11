import React from "react";
import Toggle from "../layout/Toggle";

const ContenedorOpcionesTexto = (props) => {
  const {
    nombreMascota,
    fuente,
    posicion,
    colorFuente,
    handleTexto,
    handleFuente,
    handlePosicionTexto,
    handleColorFuente,
  } = props;

  return (
    <div className="mx-auto mt-6 px-4">
      <div className="relative">
        <input
          className="w-full text-center px-2 py-2 border border-gray-800 text-gray-800 text-2xl font-medium focus:outline-none rounded-2xl"
          type="text"
          name="nombre"
          value={nombreMascota}
          placeholder="Pet name"
          onChange={(e) => handleTexto(e)}
          autoComplete="off"
          maxLength={"12"}
        />
      </div>

      <div className="w-full mt-4 flex space-x-2 items-center justify-center">

        <div className="relative w-1/2">
          <select
            className={`w-full appearance-none bg-transparent pl-2 py-2 focus:outline-none flex items-center justify-center border border-gray-800 rounded-2xl overflow-hidden text-lg font-medium`}
            type="select"
            name="fuente"
            value={fuente}
            onChange={(e) => handleFuente(e)}
          >
            <option value="Kanit">Kanit font</option>
            <option value="Suez%20One">Suez font</option>
            <option value="Gochi%20Hand">Gochi font</option>
          </select>
          <div className={`mx-2 absolute right-0 top-0 my-4 z-10`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-down"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        <div className="relative w-1/2">
          <select
            className={`w-full appearance-none bg-transparent pl-2 py-2 focus:outline-none flex items-center justify-center border border-gray-800 rounded-2xl overflow-hidden text-lg font-medium ${
              colorFuente === "white" ? "text-gray-800" : "text-white"
            } ${colorFuente === "white" && "bg-white"} ${
              colorFuente === "black" && "bg-black"
            } ${colorFuente === "red" && "bg-red-600"} ${
              colorFuente === "pink" && "bg-pink-600"
            } ${colorFuente === "yellow" && "bg-yellow-400"} ${
              colorFuente === "blue" && "bg-blue-600"
            } ${colorFuente === "indigo" && "bg-indigo-600"} ${
              colorFuente === "purple" && "bg-purple-600"
            } ${colorFuente === "green" && "bg-green-600"}`}
            type="select"
            name="colorFuente"
            value={colorFuente}
            onChange={(e) => handleColorFuente(e)}
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
          <div className={`mx-2 absolute right-0 top-0 my-4 z-10 ${colorFuente !== "white" && colorFuente !== "none" ? "text-white" : "text-gray-800"} ${colorFuente === "none" && "text-gray-800"}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-down"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      <Toggle 
        posicion={posicion}
        handlePosicionTexto={(e) => handlePosicionTexto(e)}
      />
{/* 
      <div className=" text-gray-800 flex items-center pl-2 border-r-2 border-gray-800 h-full pr-1">
        <select
          className="text-xl font-bold focus:outline-none py-2 z-20 relative bg-transparent"
          name="posicion"
          value={posicion}
          onChange={(e) => handlePosicionTexto(e)}
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div> */}

      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
          .espacio-texto {
            padding-left: 7.25rem;
          }
          .abajo {
            bottom: 0;
          }
          .arriba {
            top: 0;
          }
        `}
      </style>
    </div>
  );
};

export default ContenedorOpcionesTexto;
