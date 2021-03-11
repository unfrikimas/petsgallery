import React from "react";
const Toggle = ({posicion, handlePosicionTexto}) => {
  return (
    <div className="mx-auto mt-4 flex items-center justify-center space-x-2">
      {/* Code block starts */}
      <p className="text-base text-gray-800 font-normal">Top</p>
      <div className="cursor-pointer rounded-2xl relative">
        <input
          type="checkbox"
          name="toggle"
          id="toggle1"
          // value={posicion}
          checked={posicion === "bottom" ? true : false}
          onChange={e => handlePosicionTexto(e)}
          className="focus:outline-none checkbox w-8 h-8 rounded-2xl bg-amarillo absolute m-1 appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle1"
          className="toggle-label bg-white block w-20 h-10 overflow-hidden rounded-2xl cursor-pointer border border-gray-800"
        />
      </div>
        <p className="text-base text-gray-800 font-normal">Bottom</p>
      {/* Code block ends */}
      <style jsx>
        {`
            .checkbox:checked {
                right: 0;
            }
            .checkbox:checked + .toggle-label {
                background-color: white;
            }
            .sombra {
            box-shadow: 0px 4px 0px #18191f;
            }
            .removeh {
                -webkit-tap-highlight-color: transparent;
            }
            
        `}
      </style>
    </div>
  );
};
export default Toggle;
