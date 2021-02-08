import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import { FirebaseContext } from '../../firebase'
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import Paginacion from "../../components/layout/Paginacion"
import { subirACloudinary } from '../../utils/helper'

const SubirImagen = () => {
  
    //context de firebase
    const { firebase } = useContext(FirebaseContext)
    
    const ImageContext = useContext(imageContext)
    const {public_Id, guardarIdPublico} = ImageContext

    const [publicId, setPublicId] = useState(public_Id)
    const [mostrarCargandoImagen, setMostrarCargadoImagen] = useState(false)
    
    useEffect(() => {
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      if(idInicial){
        setPublicId(idInicial)
      }
    }, [])
    
    useEffect(() => {
      if(publicId) {
        setMostrarCargadoImagen(false);
        guardarIdPublico(publicId)
        window.localStorage.setItem('publicId', JSON.stringify(publicId))
      }
        // eslint-disable-next-line
    }, [publicId]);
    
    //funcion para subir la imagen a Cloudinary
    const subirPet = async e => {
        setMostrarCargadoImagen(true)
        setPublicId("")
        await subirACloudinary(e)
            .then(idImagen => {
                esperarImagen(idImagen)
            })
            .catch(error => console.log(error))
    }

    //REALTIME GET FUNCTION
    const esperarImagen = async (assetId) => {
        // console.log("assetid", assetId)
        const ref = firebase.db.collection("mascotas");
        await ref
            .where('imagen_sin_background.asset_id', '==', assetId)
            .onSnapshot((querySnapshot) => {
                const pets = [];
                querySnapshot.forEach((doc) => {
                    pets.push(doc.data());
                });
                // setMascotas(pets[0]);
                setPublicId(pets[0]?.imagen_sin_background.public_id)
            });
    }


    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
          titulo={"New Art"}
        />

        <ContenedorImagen 
            background={""}
            colorFrame={"none"}
            imagen={publicId}
            mostrarCargandoImagen={mostrarCargandoImagen}
            nombreMascota={""}
        />

        <div className="w-80 h-16 mx-auto mt-8">
          <label
            className="w-full h-full flex items-center justify-center bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer"
          >
            <input
                className="hidden"
                type="file" 
                name="inputImagen"
                onChange={e => subirPet(e)}
            />
            Upload image
          </label>
        </div>

        <Paginacion
          retroceder={false}
          rutaAnterior={"/"}
          adelantar={true}
          rutaSiguiente={"/createart/background"}
        />
      </div>
      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
        `}
      </style>
    </>
  );
};

export default SubirImagen;
