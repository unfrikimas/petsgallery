import React, { useState } from "react";

const AlertaNoPng = ({creditos}) => {

    const [flag, setFlag] = useState(true);

  return (
    <div
      className={
        flag
          ? "z-20 xl:w-5/12 mx-auto sm:mx-0 sm:w-6/12 md:w-6/12 w-10/12 bg-white shadow-lg rounded flex pr-4 absolute left-0 sm:left-auto right-0 sm:top-0 sm:mr-6 mt-16 sm:mt-6 mb-6 sm:mb-0 transition duration-150 ease-in-out translate-show"
          : "hidden"
      }
    >
      <div
        role="alert"
        aria-label="Close"
        className="cursor-pointer absolute right-0 mr-2 mt-2 text-gray-500 hover:text-gray-600 transition duration-150 ease-in-out"
        onClick={() => setFlag(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width={30}
          height={30}
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
      <div className="px-5 border-r border-gray-300 flex items-center justify-center text-amarillo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={40}
          height={40}
          fill="currentColor"
        >
          <path
            className="heroicon-ui"
            d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 9a1 1 0 0 1-1-1V8a1 1 0 0 1 2 0v4a1 1 0 0 1-1 1zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center pl-4 py-4">
        <p className="pt-2 text-sm text-gray-800 font-semibold">Attention</p>
        <p className="text-xs text-gray-600 font-normal">
          To use these designs, you need to upload an image without background
          on png format!
        </p>
      </div>
      <style jsx>
        {`
          .translate-show {
            transform: translateX(0%);
          }
          .translate-hide {
            transform: translateX(150%);
          }
        `}
      </style>{" "}
    </div>
  );
};

export default AlertaNoPng;