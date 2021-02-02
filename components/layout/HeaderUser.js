import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Transition } from '@headlessui/react'
import IconUsuario from '../icons/user'
import IconUserItem from '../icons/useritem';

// const Logo = styled.a`
//   font-family: 'Playfair Display', serif;
//   color: #fe2c55;
//   font-size: 2rem;
//   font-weight: 700;
//   cursor: pointer;
// `;

const HeaderUser = () => {

    //Estado para el dropdown
    const [ menuDropDown, setMenuDropDown ] = useState(false)

    const router = useRouter();
    const { pathname } = router;

    const cerrarSesion = () => {
      firebase.cerrarSesion();
      limpiarDatosTarjeta();
    }

    return (
      <>        
        
        <header className="h-16 px-4 border-b-2 border-gray-800">
          <div className="h-full flex justify-between items-center">

            <Link href="/">
              <h2 className="text-gray-800 font-bold text-xl">P</h2>
            </Link>

            <p className="font-bold text-xl text-gray-800">New Art</p>
            
            <div className="text-gray-500">
              <div className="relative inline-block text-left">
                <div>
                  <button 
                    type="button" 
                    className="inline-flex items-center justify-center w-full mt-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-principal-hover" 
                    id="options-menu"
                    aria-haspopup="true" 
                    aria-expanded="true"
                    onClick={ () => setMenuDropDown(!menuDropDown) }
                    onBlur={ () => setMenuDropDown(false) }
                  >
                    {/* { usuario.displayName.replace(/\b\w/g, l => l.toUpperCase()) } */}

                    <IconUsuario width={30} height={30} stroke={"#2a2e3b"}/>
                    
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
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

                      <div ref={ref} className="z-40 origin-top-right absolute right-0 mt-2 w-48 shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <div className="flex items-center px-4">
                            <IconUserItem width={15} height={15} />
                            <p 
                              className="block truncate pl-1 py-2 text-sm text-gray-400 border-b border-gray-100">
                                  Usuario
                              {/* { usuario.displayName.replace(/\b\w/g, l => l.toUpperCase()) } */}
                            </p>
                          </div>
                          { pathname === "/cuenta" ? "" 
                          :  
                            <Link href="/cuenta">
                              <a
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Cuenta
                              </a>
                            </Link>
                          }
                          { pathname === "/dashboard" ? "" 
                          :                          
                            <Link href="/dashboard">
                              <a 
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Tablero
                              </a>
                            </Link>
                          }
                          { pathname === "/precios" ? "" 
                          :                          
                            <Link href="/precios">
                              <a 
                                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                                Precios
                              </a>
                            </Link>
                          }
                          <a
                            href="https://api.whatsapp.com/send?phone=+34682811728&text=Hola, me interesa una tarjeta web personalizada"
                            target="_blank"
                            className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Contactar
                          </a>
                          <button 
                            type="button" 
                            className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" 
                            role="menuitem"
                            onClick={ () => cerrarSesion() }
                          >
                            Cerrar sesión
                          </button>

                        </div>
                      </div>

                    )}
                  </Transition>           
                </div>  

                
            </div>
          </div>
        </header>

      </>            
    );
}
 
export default HeaderUser;