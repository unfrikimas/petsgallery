import React, { useState } from "react";

const AlertaNoPng = () => {

    const [flag, setFlag] = useState(true);

  return (
    <div
      className={
        flag
          ? "z-20 mx-auto w-9/12 shadow-md rounded-2xl border-2 border-gray-800 flex pr-4 absolute left-0 right-0 mt-16 mb-6 color-bg"
          : "hidden"
      }
    >
      <div
        role="alert"
        aria-label="Close"
        className="cursor-pointer absolute right-0 mr-2 mt-2 text-gray-800 transition duration-150 ease-in-out"
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
        <p className="pt-2 text-lg text-gray-800 font-bold">Attention</p>
        <p className="text-sm text-gray-600 font-normal">
          To use a layout, you need to upload an image without background
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
          .color-bg {
          background-color: #fff4cc;
          }
        `}
      </style>{" "}
    </div>
  );
};

export default AlertaNoPng;
