import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import IconUsuario from "../icons/user";
import IconEditar from '../icons/Edit'

const HeaderUser = ({ titulo, usuario, firebase }) => {
  //Estado para el dropdown
  const [menuDropDown, setMenuDropDown] = useState(false)

  const router = useRouter()
  const { pathname } = router

  const cerrarSesion = () => {
    firebase.cerrarSesion();
  };

  return (
    <>
      <header className="h-16 contenedor-imagen-w mx-auto px-4 border-b border-gray-300">
        <div className="h-full w-full flex justify-between items-center">
          <Link href="/createart/new">
            <h2 className="text-gray-800 font-bold text-xl cursor-pointer">P</h2>
          </Link>

          <p className="font-bold text-xl text-gray-800">{titulo}</p>

          <div className="text-gray-500">
            {usuario ? (
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center w-full mt-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                    onClick={() => setMenuDropDown(!menuDropDown)}
                    onBlur={() => setMenuDropDown(false)}
                  >
                    {usuario.photoURL ?                    
                      <img
                        className="rounded-full"
                        src={usuario.photoURL}
                        width={30}
                        height={30}
                      />
                    :
                      <IconUsuario width={30} height={30} stroke={"#2a2e3b"}/>
                    }
                    {/* <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg> */}
                  </button>
                </div>

                <Transition
                  show={menuDropDown}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {(ref) => (
                    <div
                      ref={ref}
                      className="z-40 origin-top-right absolute right-0 mt-2 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                    >
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="flex items-center px-4">
                          {/* <img src={usuario?.photoURL} width={20} height={20}/> */}
                          {/* <IconUserItem width={15} height={15} /> */}
                          <p className="w-full flex items-center justify-between truncate py-2 text-sm text-gray-400 border-b border-gray-100">
                            {usuario.displayName.replace(/\b\w/g, (l) => l.toUpperCase())}
                            {/* <button>
                              <IconEditar width={20} height={20} stroke={"#1f2937"} />
                            </button> */}
                          </p>
                        </div>
                        {pathname === "/dashboard" ? (
                          ""
                        ) : (
                          <Link href="/dashboard">
                            <a
                              className="block px-4 py-3 text-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                              role="menuitem"
                            >
                              Art dashboard
                            </a>
                          </Link>
                        )}
                        <a
                          href="https://api.whatsapp.com/send?phone=+34682811728&text=Hola, me interesa una tarjeta web personalizada"
                          target="_blank"
                          className="block px-4 py-2 text-md text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          Contact us
                        </a>
                        <button
                          type="button"
                          className="block w-full text-left px-4 py-3 text-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                          role="menuitem"
                          onClick={() => cerrarSesion()}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </Transition>
              </div>
            )
            :
              <Link href={{pathname: '/login', query: {path: `${pathname}`} }} passHref>
                <a><IconUsuario width={30} height={30} stroke={"#2a2e3b"}/></a>
              </Link>
            }
          </div>
        </div>
      </header>
      <style jsx>
        {`
          .contenedor-imagen-w {
            width: 360px;
          }
        `}
      </style>
    </>
  );
};

export default HeaderUser;
