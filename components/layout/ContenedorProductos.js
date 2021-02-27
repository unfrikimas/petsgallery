import React, {useState, useEffect} from "react";
import {crearUrlArte} from "../../utils/helper";

const ContenedorProductos = (props) => {

  const [url, setUrl] = useState("")

  useEffect(() => {
    crearUrlArte(props.imagen, props.filtro, props.background, props.frame, props.texto)
      .then(urlArte => {
        setUrl(urlArte)
      })
      .catch(error => {
        console.log(error)
      })
  })

  return (
    <>
      <div className="w-72 sombra border-2 border-gray-800 rounded-2xl bg-white mx-auto mt-6 overflow-hidden">
        <div
          className="z-0 relative flex items-center justify-center mx-auto w-full h-52 overflow-hidden bg-cover"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/petportrait/image/upload/v1612776017/petsgallery/mockups/mockup_room_djxxbs.jpg)",
          }}
        >
          {url ?
          <div className="w-20 h-20 z-1 relative  -top-12 -left-6">
            <img className="shadow-md" src={url} />
          </div>
          :
            <div className="w-20 h-20 z-1 relative shadow-md -top-12 -left-6 bg-gray-200 animate-pulse"></div>
          }
        </div>

        <div className="p-6">
          <p className="text-gray-700 text-xl font-bold ">Canvas 40x40 inchs</p>
          <p className="text-gray-700 text-md">Free shipping</p>
          <div className="flex items-center justify-between ">
            <p className="text-gray-800 font-bold text-2xl"></p>
            <button
              type="button"
              className="w-12 h-12 text-base font-medium rounded-full text-gray-800 bg-amarillo border-2 border-gray-800 sombra"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                className="mx-auto"
                fill="black"
                viewBox="0 0 1792 1792"
              >
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-72 sombra border-2 border-gray-800 rounded-2xl bg-white mx-auto mt-6 overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700 text-xl font-bold ">High Quality Image</p>
          <p className="text-gray-700 text-md">Instant download</p>
          <div className="flex items-center justify-between ">
            <p className="text-gray-800 font-bold text-2xl"></p>
            <button
              type="button"
              className="w-12 h-12 text-base font-medium rounded-full text-gray-800 bg-amarillo border-2 border-gray-800 sombra"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                className="mx-auto"
                fill="black"
                viewBox="0 0 1792 1792"
              >
                <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
          .fuente_kanit {
            font-family: "Kanit", serif;
          }
          .fuente_Suez {
            font-family: "Suez One", serif;
            font-weight: black;
          }
          .borde-negro {
            -webkit-text-stroke: 2px black;
          }
          .borde-minimo {
            -webkit-text-stroke: 1px white;
          }
          .borde-maximo {
            -webkit-text-stroke: 1px white;
          }
          .medida-frame {
            width: 60px;
            height: 60px;
          }
        `}
      </style>

    </>
  );
};

export default ContenedorProductos;
