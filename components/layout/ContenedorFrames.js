import React from 'react';

const ContenedorFrames = ({handleFrame, colorFrame}) => {
    return (  

        <div className="w-80 mx-auto mt-8">

            <select
                className={`w-full px-4 py-3 focus:outline-none sombra flex items-center justify-center border-2 border-gray-800 rounded-2xl overflow-hidden text-xl font-bold ${colorFrame !== "white" && colorFrame !== "none" ? "text-white" : "text-gray-800"} cursor-pointer ${colorFrame === "none" && "text-gray-800"} ${colorFrame === "white" && "bg-white"} ${colorFrame === "black" && "bg-black"} ${colorFrame === "red" && "bg-red-600"} ${colorFrame === "pink" && "bg-pink-600"} ${colorFrame === "yellow" && "bg-yellow-400"} ${colorFrame === "blue" && "bg-blue-600"} ${colorFrame === "indigo" && "bg-indigo-600"} ${colorFrame === "purple" && "bg-purple-600"} ${colorFrame === "green" && "bg-green-600"} ${colorFrame === "none" && "bg-gray-100"}`}
                type="select" 
                name="frame" 
                value={colorFrame}
                onChange={e => handleFrame(e)}
            >
                <option value="none">None</option>
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
}
 
export default ContenedorFrames;