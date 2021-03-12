import React from "react";

const EsqueletonEditor = () => {
  return (
      <>
    <div>
      <div className="h-16 contenedor-imagen-w mx-auto px-4 border-b border-gray-300">
        <div className="h-full w-full flex justify-between items-center">
          <div className="w-4 h-8 bg-gray-200 animate-pulse"></div>
          <div className="w-16 h-8 bg-gray-200 animate-pulse"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="z-10 contenedor-imagen-w contenedor-imagen-h bg-gray-200 animate-pulse flex items-center justify-center mx-auto"></div>
      <div className="w-80 flex justify-around items-center mx-auto mt-10">
        <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="w-16 h-16 bg-gray-200 rounded-2xl animate-pulse"></div>
      </div>
    </div>
    <style jsx>
        {`
          .contenedor-imagen-w {
            width: 360px;
          }
          .contenedor-imagen-h {
            height: 360px;
          }
        `}
      </style>
    </>
  );
};

export default EsqueletonEditor;
