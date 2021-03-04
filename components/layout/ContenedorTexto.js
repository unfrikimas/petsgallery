import React from "react";

const ContenedorTexto = (props) => {
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
    <div className="w-80 mx-auto mt-6">
      <div className="relative">
        <div className="absolute text-gray-800 flex items-center pl-2 border-r-2 border-gray-800 h-full pr-1">
          <select 
            className="text-xl font-bold focus:outline-none py-2 z-20 relative bg-transparent"
            name="posicion"
            value={posicion}
            onChange={(e) => handlePosicionTexto(e)}
        >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <input
          className="w-full inline-block espacio-texto px-2 py-2 border-2 border-gray-800 text-gray-800 text-2xl font-bold focus:outline-none rounded-2xl sombra"
          type="text"
          name="nombre"
          value={nombreMascota}
          placeholder="Pet name"
          onChange={(e) => handleTexto(e)}
          autoComplete="off"
          maxLength={"12"}
        />
      </div>

      <div className="w-full mt-4 space-x-4 flex items-center justify-center">
        <select
          className={`w-1/2 px-2 py-2 border-2 bg-gray-100 border-gray-800 text-center text-gray-800 text-xl font-bold focus:outline-none rounded-2xl sombra`}
          type="select"
          name="fuente"
          value={fuente}
          onChange={(e) => handleFuente(e)}
        >
          <option value="Kanit">Kanit</option>
          <option value="Suez%20One">Suez One</option>
          <option value="Gochi%20Hand">Gochi Hand</option>
        </select>

        <select
          className={`w-1/2 px-2 py-2 border-2 border-gray-800 text-center text-xl font-bold focus:outline-none rounded-2xl sombra ${
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
      </div>

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

export default ContenedorTexto;
