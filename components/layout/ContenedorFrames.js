import React from 'react';

const ContenedorFrames = ({handleFrame, colorFrame="none"}) => {
    return (  

        <div className="w-80 mx-auto mt-8">
            <select
                className={`appearance-none w-full px-4 py-2 focus:outline-none sombra flex items-center justify-center border-2 border-gray-800 rounded-2xl overflow-hidden text-xl font-bold ${colorFrame !== "white" && colorFrame !== "none" ? "text-white" : "text-gray-800"} cursor-pointer bg-${colorFrame}-600 ${colorFrame === "black" && "bg-black"}`}
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