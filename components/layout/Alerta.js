import React, { useEffect, useState } from "react"
import IconDelete from "../icons/Delete"

const ModalAlerta = ({ id, handleClose, handleDelete }) => {

  return (
    <div>
      <div
        className="py-12 bg-gray-700 bg-opacity-80 z-10 fixed top-0 right-0 bottom-0 left-0"
        // style={{top: `${posicionY}`}}
        id="modal"
      >
        <div
          role="alert"
          className="relative h-screen mt-32 mx-auto w-10/12 max-w-lg"
        >
          <div className="py-8 px-8 color-bg shadow-md rounded-2xl border-2 border-gray-800">
            {/* <div className="w-full flex justify-center text-green-400 mb-4">
              <IconDelete width={50} height={50} stroke={"#ef4444"} />
            </div> */}
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 text-xl">
              Are you sure
            </h1>
            <p className="mb-5 text-base text-gray-600 font-normal">
              Once you are delete this you are not allowed to restore.
            </p>
            <div className="flex items-center justify-center w-full space-x-4">
              <button
                className="w-1/2 focus:outline-none bg-white text-gray-800 rounded-xl py-2 text-sm border-2 border-gray-800 font-bold"
                onClick={() => handleClose(false)}
              >
                Cancel
              </button>
              <button 
                className="w-1/2 focus:outline-none rounded-xl bg-gray-800 text-white py-2 text-sm border-2 border-gray-800 font-bold"
                onClick={() => handleDelete(id)}
              >
                Delete
              </button>
            </div>
            <div
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-800 transition duration-150 ease-in-out"
              onClick={() => handleClose(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Close"
                className="icon icon-tabler icon-tabler-x"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={18} y1={6} x2={6} y2={18} />
                <line x1={6} y1={6} x2={18} y2={18} />
              </svg>
            </div>
          </div>
        </div>
      </div>
        <style jsx>
      {`
        .sombra {
          box-shadow: 0px 4px 0px #18191f;
        }
        .color-bg {
          background-color: #fff4cc;
        }
      `}
    </style>
    </div>
  );
};
export default ModalAlerta;
