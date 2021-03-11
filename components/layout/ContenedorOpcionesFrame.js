import React from "react";

const ContenedorOpcionesFrame = ({ handleFrame, colorFrame }) => {
  return (
    <div className="relative w-60 mx-auto mt-4">
      {/* <label className="block pb-1 text-sm text-gray-800 text-center">Frame</label> */}
      <select
        className={`absolute w-full appearance-none bg-transparent px-4 py-2 focus:outline-none flex items-center justify-center border border-gray-800 rounded-2xl overflow-hidden text-lg font-medium ${
          colorFrame !== "white" && colorFrame !== "none"
            ? "text-white"
            : "text-gray-800"
        } cursor-pointer ${colorFrame === "none" && "text-gray-800 bg-white"} ${
          colorFrame === "white" && "bg-white"
        } ${colorFrame === "black" && "bg-black"} ${
          colorFrame === "red" && "bg-red-600"
        } ${colorFrame === "pink" && "bg-pink-600"} ${
          colorFrame === "yellow" && "bg-yellow-400"
        } ${colorFrame === "blue" && "bg-blue-600"} ${
          colorFrame === "indigo" && "bg-indigo-600"
        } ${colorFrame === "purple" && "bg-purple-600"} ${
          colorFrame === "green" && "bg-green-600"
        }`}
        type="select"
        name="frame"
        value={colorFrame}
        onChange={(e) => handleFrame(e)}
      >
        <option value="none">None</option>
        <option value="white">White frame</option>
        <option value="black">Black frame</option>
        <option value="red">Red frame</option>
        <option value="pink">Pink frame</option>
        <option value="yellow">Yellow frame</option>
        <option value="blue">Blue frame</option>
        <option value="indigo">Indigo frame</option>
        <option value="purple">Purple frame</option>
        <option value="green">Green frame</option>
      </select>
      <div 
        className={`mx-2 absolute right-0 my-4 z-10 ${colorFrame !== "white" && colorFrame !== "none" ? "text-white" : "text-gray-800"} ${colorFrame === "none" && "text-gray-800"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-down"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
          .ninguno {
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default ContenedorOpcionesFrame;
