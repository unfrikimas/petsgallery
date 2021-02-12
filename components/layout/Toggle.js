import React from "react";
const Toggle = () => {
  return (
    <div className="mx-auto flex flex-col items-center">
      {/* Code block starts */}
      <div className="cursor-pointer rounded-full relative">
        <input
          type="checkbox"
          name="toggle"
          id="toggle1"
          className="focus:outline-none checkbox w-8 h-8 rounded-full bg-gray-800 absolute m-2 shadow-sm appearance-none cursor-pointer"
        />
        <label
          htmlFor="toggle1"
          className="toggle-label bg-white block w-24 h-12 overflow-hidden rounded-full cursor-pointer border-2 border-gray-800 sombra"
        />
      </div>
        <p className="pt-2 text-base text-gray-800 font-medium">Free background remover</p>
        <p className="-mt-1 text-base text-gray-600 font-base">{"(One use per user)"}</p>
      {/* Code block ends */}
      <style jsx>
        {`
            .checkbox:checked {
                right: 0;
            }
            .checkbox:checked + .toggle-label {
                background-color: #ffbd12;
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
