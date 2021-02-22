import React from "react";
import IconEditar from '../icons/Edit'

const Arte = ({data}) => {

  const {url} = data

  return (
    <li className="w-full mb-6">
      <div className="flex items-center space-x-4 bg-white sombra p-5 rounded-2xl border-2 border-gray-800">
        <div className="w-40 h-40">
          <img src={url} />
        </div>
        <div className="flex justify-center flex-col items-center">
          <button className="flex items-center justify-center text-xs text-gray-800 bg-gray-100 rounded-2xl mb-2 font-normal py-2 px-4 border-2 border-gray-800">
            <IconEditar className="mr-1" width={20} height={20} stroke={"#1f2937"} />
            Edit art
          </button>
          <p className="w-full text-xs text-gray-600 text-center font-normal">
            28 March, 2020
          </p>
        </div>
      </div>
      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
        `}
      </style>
    </li>
  );
};

export default Arte;
