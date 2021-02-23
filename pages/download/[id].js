import React, { useState, useContext, useEffect } from "react"
import {useRouter} from 'next/router'
import { FirebaseContext } from '../../firebase'
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import Paginacion from "../../components/layout/Paginacion"
import IconLoader from '../../components/icons/Loader'
import IconDownload from '../../components/icons/Download'
import { descargarArte } from '../../utils/helper'

const EditarArte = () => {

    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)  

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { guardarIdPublico, asignarFiltro, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarColorFuente } = ImageContext

    //states
    const [arte, setArte] = useState("")
    const [animacion, setAnimacion] = useState(false)
    const [consultarDB, setConsultarDB] = useState(true)

    // Routing para obtener el slug del arte
    const router = useRouter()
    const { query: { id } } = router

    useEffect(() => {
      if (id && consultarDB) {
        const obtenerArte = async () => {
          const arteQuery = await firebase.db.collection("artes").doc(id)
          const arteItem = await arteQuery.get()
          if (arteItem.exists) {
            setArte(arteItem.data())
            setConsultarDB(false)
          } else {
            setError(true)
            setConsultarDB(false)
          }
        };
        return obtenerArte()
      }
    }, [id]);

    useEffect(() => {
      if(arte){
        window.localStorage.setItem('urlBackground', JSON.stringify(arte.props.urlBackground))
        asignarBackground(arte.props.urlBackground)
        
        window.localStorage.setItem('publicId', JSON.stringify(arte.props.publicId))
        guardarIdPublico(arte.props.publicId)
        
        window.localStorage.setItem('pets-filter', JSON.stringify(arte.props.filtro))
        asignarFiltro(arte.props.filtro)
        
        window.localStorage.setItem('frame', JSON.stringify(arte.props.frame))
        asignarFrame(arte.props.frame)
        
        window.localStorage.setItem('petsgallery-texto', JSON.stringify(arte.props.texto))
        asignarNombreMascota(arte.props.texto.textoMascota)
        asignarFuente(arte.props.texto.fuente)
        asignarColorFuente(arte.props.texto.colorTexto)
      }
    }, [arte])

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Download Art"}
            usuario={usuario}
            firebase={firebase}
        />

        {arte ?
          <ContenedorImagen 
              background={arte.props.urlBackground.urlLocal || ""}
              imagen={arte.props.publicId}
              filtro={arte.props.filtro || "none"}
              colorFrame={arte.props.frame.colorFrame || "none"}
              nombreMascota={arte.props.texto || ""}
          />
          :
          <div className="z-10 w-80 h-80 bg-gray-200 animate-pulse mt-4 flex items-center justify-center mx-auto rounded-2xl">
          </div>
        }

        <div className="w-80 mt-8 flex items-center justify-center mx-auto">
          <button
              className="flex items-center justify-center px-4 py-3 bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none tracking-tight"
              onClick={() => {
                setAnimacion(true)
                descargarArte(arte.props.publicId, arte.props.filtro, arte.props.urlBackground, arte.props.frame, arte.props.texto, usuario)
                  .then(() => {
                    setAnimacion(false)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }}
          >
            { animacion ? 
              <IconLoader className="animate-spin" width={30} heigth={30} stroke={"#1f2937"} />
              :
              <IconDownload className="mr-2" width={25} heigth={25} stroke={"#1f2937"}/>
            }
            {animacion ? "Downloading" : "Free download"}
          </button>
        </div>

        <Paginacion
          retroceder={true}
          rutaAnterior={"/createart/text"}
          pantallaAnterior={"Text"}
          adelantar={false}
          rutaSiguiente={""}
          tienda={true}
        />

        <style jsx>{`
            .sombra {
                box-shadow: 0px 4px 0px #18191F;
            }
        `}
        </style>
      </div>
    </>
  )
}

export default EditarArte;