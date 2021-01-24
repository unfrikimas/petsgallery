import Rect, { useState, useEffect } from 'react'
import axios from 'axios'
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react'
import { MdPets } from 'react-icons/md';

export const BACKS = {
  amarillo: "https://res.cloudinary.com/petportrait/image/upload/v1611472554/petsgallery/backs/back1_vakpsa.jpg"
}

export const DOGS = {
  uno: "https://res.cloudinary.com/petportrait/image/upload/v1611472119/petsgallery/matf6gbxivrkba806njo.png"
}

export const IMAGEN_VECTOR = {
  uno: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:15:despeckle:0.2:corners:100:detail:500/v1611472119/petsgallery/matf6gbxivrkba806njo.svg",
  dos: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:15:despeckle:0.2:corners:100:detail:500/v1611487750/petsgallery/l8j7xxbytezemay2nwaj.svg"
}

export default function Home() {

  const [ urlImagen, setUrlImagen ] = useState("")
  const [ background, setBackground ] = useState(BACKS.amarillo)
  const [ nombre, setNombre ] = useState("")

  useEffect(() => {
      document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
      });
  })


  //Guardar imagen en Cloudinary
  const subirACloudinary = async (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "petsgallery");
    // setCargando(true);

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/petportrait/upload", formData);
      setUrlImagen(res.data.secure_url);
      console.log("paso")
      // setCargando(false);
    } catch (error) {
      console.log(error);
      // setCargando(false);
    }
  };

  return (
    <>
    <div className="flex flex-col min-h-screen max-w-lg mx-auto">
      <header className="bg-green-200 h-16 flex items-center justify-center">
        Barra de navegación
      </header>
      <main className="flex flex-grow bg-red-200">
        <div className="flex flex-col w-full">
          <div className="h-1/5 flex items-center justify-center">
            Titulo
          </div>
          <div className="w-full flex items-center justify-center h-3/4 bg-white">
            <div 
              className="relative bg-transparent w-80 h-80 flex items-center justify-center bg-cover bg-center"
              style={ { backgroundImage: `url(${background})` } }
            >
              <label className="absolute top-0 right-0 -mt-5 mr-2 cursor-pointer">
                <MdPets className="h-10 w-10 text-red-500 bg-white p-1 rounded-md border border-red-300" />
                {/* { cargando
                  ? <span className="mt-2 text-gray-700">Subiendo foto...</span>
                  : <span className="mt-2 text-gray-700">Sube una foto</span> 
                } */}
                <input
                  className="hidden"
                  type="file" 
                  name="fotografia"
                  onChange={subirACloudinary}
                />
              </label>
              <div className="z-0 absolute w-4/5 h-4/5  bg-transparent border-12 border-white">
                  
              </div>
              <div className="z-10 p-1">
                <Image 
                  cloudName="petportrait" 
                  secure="true"
                  publicId={IMAGEN_VECTOR.dos}
                  dpr="auto"
                  responsive
                  width="auto"
                >
                  <Transformation effect="cartoonify" />
                  {/* <Transformation effect="vectorize:3:0.5" /> */}
                  {/* <Transformation width="250" height="250" gravity="faces" crop="fill" /> */}
                </Image>
              </div>
              
              <p className="z-20 text-center nombre-pet -mb-3">ROCCO</p>
            </div>
          </div>
          <div className="w-full px-5 py-2">
            <input 
              className="w-full px-2 py-2 border border-gray-300 text-gray-500 text-lg font-medium focus:outline-none"
              type="text"
              name="nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="h-1/5">
            <ul className="flex h-full space-x-4 items-center justify-center">
              <li>
                <img 
                  src="/images/backs/back1.jpg"
                  className="h-16 w-16 border border-gray-500 cursor-pointer"
                  onClick={() => setBackground("/images/backs/back1.jpg")}
                />
              </li>
              <li>
                <img 
                  src="/images/backs/back2.jpg"
                  className="h-16 w-16 border border-gray-500 cursor-pointer"
                  onClick={() => setBackground("/images/backs/back2.jpg")}
                />
              </li>
            </ul>
          </div>
        </div>
      </main>
      <footer className="bg-blue-200 h-16 flex items-center justify-center">
        Footer
      </footer>
    </div>

    <style jsx>{`
    
      .nombre-pet {
        font-family: 'Alfa Slab One', serif;
        position: absolute;
        padding: 0px;
        bottom: 0;
        font-size: 4rem;
        font-weight: 900;
        -webkit-text-fill-color: orange;
        -webkit-text-stroke: 3px white;
      }
    
    `}
    </style>

    </>
  )
}
