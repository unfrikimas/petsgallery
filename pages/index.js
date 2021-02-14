import React, { useState, useContext, useEffect } from "react"
import {useRouter} from 'next/router'
import HeaderUser from "../components/layout/HeaderUser"
import { FirebaseContext } from "../firebase"
import imageContext from "../context/image/imageContext"
import ContenedorImagen from "../components/layout/ContenedorImagen"
import Paginacion from "../components/layout/Paginacion"
import AnimacionCircle from "../components/icons/AnimacionCircle"
import Toggle from "../components/layout/Toggle"
import { subirACloudinary, subirACloudinaryConFondo } from "../utils/helper"

const Home = () => {
  
    const ImageContext = useContext(imageContext)
  const { guardarIdPublico } = ImageContext

  const [publicId, setPublicId] = useState("");
  const [mostrarCargandoImagen, setMostrarCargadoImagen] = useState(false);

  const router = useRouter()

  useEffect(() => {
    if(publicId) {
        guardarIdPublico(publicId)
        window.localStorage.setItem('publicId', JSON.stringify(publicId))
        setMostrarCargadoImagen(false);
        router.push("/createart/bgremove")
    }
      // eslint-disable-next-line
  }, [publicId]);

  //funcion para subir la imagen a Cloudinary
  const subirPetConFondo = e => {
    setMostrarCargadoImagen(true)
    subirACloudinaryConFondo(e)
      .then((imagen) => {
          console.log(imagen)
        setPublicId(imagen.public_id)
      })
      .catch((error) => console.log(error))
  }

  //REALTIME GET FUNCTION
  const esperarImagen = async (assetId) => {
    // console.log("assetid", assetId)
    const ref = firebase.db.collection("mascotas")
    await ref
      .where("imagen_sin_background.asset_id", "==", assetId)
      .onSnapshot((querySnapshot) => {
        const pets = [];
        querySnapshot.forEach((doc) => {
          pets.push(doc.data())
        });
        // setMascotas(pets[0])
        setPublicId(pets[0]?.imagen_sin_background.public_id)
      })
  }

  return (
    <div className="max-w-lg mx-auto mt-32">
      <div className="w-80 h-16 mx-auto mt-8">
        <label className="w-full h-full flex items-center justify-center bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer">
          <input
            className="hidden"
            type="file"
            name="inputImagen"
            accept="image/*"
            onChange={e => subirPetConFondo(e)}
          />
          {mostrarCargandoImagen && (
            <AnimacionCircle
              className="animate-spin"
              width={30}
              heigth={30}
              stroke={"#1f2937"}
            />
          )}
          {mostrarCargandoImagen ? "Uploading" : "Upload image"}
        </label>
      </div>
    </div>
  );
};

export default Home;
