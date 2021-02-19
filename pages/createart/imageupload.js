import React, { useState, useContext, useEffect, useRef } from "react"
import Link from 'next/link'
import {useRouter} from 'next/router'
import HeaderUser from "../../components/layout/HeaderUser"
import { FirebaseContext } from '../../firebase'
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import Paginacion from "../../components/layout/Paginacion"
import IconLoader from '../../components/icons/Loader'
import IconUpload from '../../components/icons/Upload'
import Toggle from '../../components/layout/Toggle'
import { subirACloudinaryRemoverFondo, subirACloudinaryConFondo, subirACloudinaryPng } from '../../utils/helper'

export const CREDITOS = 1

const SubirImagen = () => {
  
    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)
    
    const ImageContext = useContext(imageContext)
    const {public_Id, creditos, guardarIdPublico, asignarCredito} = ImageContext

    const [publicId, setPublicId] = useState(public_Id)
    const [mostrarCargandoImagen, setMostrarCargadoImagen] = useState(false)
    const [freeCredit, setFreeCredit] = useState(creditos)

    const router = useRouter()
    const ruta = router.pathname

    useEffect(() => {
      const sesionInicial = JSON.parse(window.localStorage.getItem('pets-isLogged'))
      if(sesionInicial){
        setUsuarioLogueado(true)
      }
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      if(idInicial){
        setPublicId(idInicial)
      } 
      const freeRbInicial = JSON.parse(window.localStorage.getItem('pet-rb'))
      if(freeRbInicial !== ""){
        setFreeCredit(freeRbInicial)
      } 
    }, [])

    useEffect(() => {
      if(usuario && !freeCredit){
        obtenerFreeBr(usuario)
          .then((data) => {
            console.log("freebr", data)
            if(data) {
              setFreeCredit(data.creditos)
            } else {
              asignarFreeBr(usuario)
              window.localStorage.setItem('pet-rb', JSON.stringify(CREDITOS))
            }
          })
      }
    }, [usuario])

    useEffect(() => {
      if(freeCredit !== "") {
        asignarCredito(freeCredit) //context
        window.localStorage.setItem('pet-rb', JSON.stringify(freeCredit))
      }
        // eslint-disable-next-line
    }, [freeCredit]);

    useEffect(() => {
      if(publicId) {
        setMostrarCargadoImagen(false)
        guardarIdPublico(publicId) //context
        window.localStorage.setItem('publicId', JSON.stringify(publicId))
      } 
        // eslint-disable-next-line
    }, [publicId]);
    
    //funcion para definir a que preset subir la imagen
    const definirPreset = (e) => {
      const file = e.target.value
      const file_splitted = file.split('.')
      const extension = file_splitted.pop()
      if(extension === "png") {
        subirPetPng(e)
      } else {
        subirPetConFondo(e)
      }
    }

    //funcion para subir la imagen a Cloudinary
    const subirPetRemoverFondo = () => {
      setMostrarCargadoImagen(true)
      subirACloudinaryRemoverFondo(publicId.publicid)
        .then(idImagen => {
            esperarImagen(idImagen)
        })
        .catch(error => console.log(error))
    }

    //funcion para subir la imagen a Cloudinary
    const subirPetConFondo = (e) => {
      setPublicId("")
      setMostrarCargadoImagen(true)
      subirACloudinaryConFondo(e)
        .then((imagen) => {
          setPublicId({
            publicid: imagen.public_id,
            format: imagen.format
          })
        })
        .catch((error) => console.log(error))
    }

    //funcion para subir la imagen a Cloudinary
    const subirPetPng = (e) => {
      setPublicId("")
      setMostrarCargadoImagen(true)
      subirACloudinaryPng(e)
        .then((imagen) => {
          setPublicId({
            publicid: imagen.public_id,
            format: imagen.format
          })
        })
        .catch((error) => console.log(error))
    }

    const obtenerFreeBr = async (usuario) => {
      return await firebase.db
        .collection('free_br')
        .where('idUsuario', '==', usuario.uid)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
              console.log('usuario no existe')
              return
            }
            const datosUsuario = snapshot.docs.map(doc => {
                const data = doc.data()
                console.log("data", data)
                return {
                  id: doc.id,
                  ...data,
                }
            })
            return datosUsuario[0]
        })
        .catch(err => {
            console.log('Error', err)
        })
    }

  //asignar un free br si es un usuario nuevo
  const asignarFreeBr = async (usuario) => {
    const freeBr = {
      primeraSesion: Date.now(),
      ultimaSesion: Date.now(),
      idUsuario: usuario.uid,
      nombre: usuario.displayName,
      creditos: CREDITOS
    }
    try {      
      //insertar productos en la base de datos
      const freeBrRef = await firebase.db.collection('creditos')
      await freeBrRef.add(freeBr);
    } catch (error) {
      console.log(error)
    }
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
        // setPublicId(pets[0]?.imagen_sin_background.public_id)
        setPublicId({
          publicid: pets[0]?.imagen_sin_background.public_id,
          format: pets[0]?.imagen_sin_background.format
        })
      });
  }

    const noExiste = publicId.publicid === ""
    const mensaje = noExiste ? 
    `<div className="w-80 h-80 bg-gray-200 animate-pulse mt-4 flex items-center justify-center mx-auto rounded-2xl">
    </div>`
    :
    ""

    return (
    <>
      <div className="relative max-w-lg mx-auto">

        <HeaderUser 
          titulo={"New Art"}
          usuario={usuario}
          firebase={firebase}
        />

        {publicId.publicid !== "none" &&
          <ContenedorImagen 
              background={""}
              colorFrame={"none"}
              imagen={publicId}
              mostrarCargandoImagen={mostrarCargandoImagen}
              nombreMascota={""}
          />
        }

        {/* {console.log(public_Id, publicId.publicid)}
        {public_Id.publicid === "none" &&
          <div className="w-80 h-80 bg-gray-200 animate-pulse mt-4 flex items-center justify-center mx-auto rounded-2xl">
          </div>
        } */}
        {public_Id.publicid === "none" && publicId.publicid === "none" && 
          <div className="w-80 h-80 mt-4 flex items-center justify-center mx-auto">
            <p 
              className="text-5xl font-bold text-gray-700 text-center leading-snug">
                Upload<br></br>an image<br></br>to Start
            </p>
          </div>
        }

        <div className="w-80 h-16 mx-auto mt-8">
          <label
            className={`w-full h-full flex items-center justify-center bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer ${mostrarCargandoImagen ? "animate-pulse" : ""}`}
          >
            <input
                className="hidden"
                type="file" 
                accept="image/*"
                name="inputImagen"
                onChange={e => definirPreset(e)}
                // onChange={e => subirPetConFondo(e)}
            />
              { mostrarCargandoImagen ? 
                <IconLoader className="animate-spin" width={30} heigth={30} stroke={"#1f2937"} />
                :
                <IconUpload className="mr-2" width={25} heigth={25} stroke={"#1f2937"}/>
              }
            {mostrarCargandoImagen ? "Uploading" : "Upload image"}
            {/* {publicId.publicid && !mostrarCargandoImagen ? "Upload another image" : "Upload image"} */}
          </label>
        </div>

        {/* <Toggle /> */}

        {publicId.publicid !== "none" && freeCredit > 0 &&
          <div  className="w-80 mx-auto mt-4">
            <p 
              className="text-xl font-bold text-gray-600 text-center ">You have 1 credit to remove the background.
              {usuario ?
                <button 
                  className="text-amarillo font-bold pl-1"
                  onClick={subirPetRemoverFondo}
                >
                  Use it
                </button>              
              :
                <Link href={{pathname: '/login', query: {path: `${ruta}`} }} passHref>
                  <a className="text-amarillo"> Sign up</a>
                </Link>
              } 
            </p>
          </div>
        }

        {publicId.publicid && 
          <Paginacion
            retroceder={false}
            rutaAnterior={"/"}
            adelantar={true}
            rutaSiguiente={"/createart/filter"}
            pantallaSiguiente={"Filter"}
          />
        }

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
