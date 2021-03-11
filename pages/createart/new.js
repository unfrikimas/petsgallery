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
import AlertaUpload from '../../components/layout/AlertaUpload'
import { subirACloudinaryRemoverFondo, subirACloudinaryConFondo, subirACloudinaryPng } from '../../utils/helper'

import ContenedorImagenFull from '../../components/layout/ContenedorImagenFull'
import IconText from '../../components/icons/edicion/Text'
import IconBack from '../../components/icons/edicion/Background'
import IconFilter from '../../components/icons/edicion/Filter'
import IconDownload from '../../components/icons/Download'
import ContenedorOpciones from "../../components/layout/ContenedorOpciones"
import ContenedorOpcionesFondos from '../../components/layout/ContenedorOpcionesFondos'
import ContenedorOpcionesFrame from '../../components/layout/ContenedorOpcionesFrame'
import ContenedorOptionesFiltro from '../../components/layout/ContenedorOpcionesFiltro'
import ContenedorOptionesTexto from '../../components/layout/ContenedorOpcionesTexto'
import { descargarArte, guardarArteDB } from '../../utils/helper'


export const CREDITOS = 1

const SubirImagen = () => {
  
    //context de firebase
    const { usuario, firebase } = useContext(FirebaseContext)
    
    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, filtro, creditos, rutaBackground, tieneFrame, nombreMascota, guardarIdPublico, asignarCredito, asignarFiltro, asignarBackground, asignarFrame, asignarNombreMascota, asignarFuente, asignarPosicionTexto, asignarColorFuente, asignarColorBordeFuente } = ImageContext

    const [publicId, setPublicId] = useState(public_Id)
    const [filtroImagen, setFiltroImagen] = useState(filtro)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)
    const [frame, setFrame] = useState(tieneFrame)
    const [texto, setTexto] = useState(nombreMascota)

    const [mostrarCargandoImagen, setMostrarCargadoImagen] = useState(false)
    const [freeCredit, setFreeCredit] = useState(creditos)
    const [alerta, setAlerta] = useState(false)
    const [mensaje, setMensaje] = useState("")
    const [mostrarOpciones, setMostrarOpciones] = useState({activo: false, opcion: "fondos"})
    const [alertaLimiteTexto, setAlertaLimiteTexto] = useState(false)
    const [animacion, setAnimacion] = useState(false)

    const inputImagenNormalRef = useRef()
    const inputRef = useRef()

    const router = useRouter()
    const ruta = router.pathname

    useEffect(() => {
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      if(idInicial){
        setPublicId(idInicial)
      } 
      const backgroundInicial = JSON.parse(window.localStorage.getItem('urlBackground'))
      if(backgroundInicial){
        setUrlBackground(backgroundInicial)
        asignarBackground(backgroundInicial)
      }
      const filtroInicial = JSON.parse(window.localStorage.getItem('pets-filter'))
      if(filtroInicial){
        setFiltroImagen(filtroInicial)
        asignarFiltro(filtroInicial)
      }
      const frameInicial = JSON.parse(window.localStorage.getItem('frame'))
      if(frameInicial){
        setFrame(frameInicial)
        asignarFrame(frameInicial.colorFrame)
      }
      const textoInicial = JSON.parse(window.localStorage.getItem('petsgallery-texto'))
      if (textoInicial) {
        setTexto(textoInicial)
        asignarNombreMascota(textoInicial.textoMascota)
      }
      const creditoInicial = JSON.parse(window.localStorage.getItem('pet-rb'))
      if(creditoInicial !== "" && creditoInicial !== null){
        setFreeCredit(creditoInicial)
      } 
    }, [])

    useEffect(() => {
      if(usuario && freeCredit){
        obtenerFreeBr(usuario)
          .then((data) => {
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
      if(publicId.publicid) {
        guardarIdPublico(publicId) //context
        window.localStorage.setItem('publicId', JSON.stringify(publicId))
        setMostrarCargadoImagen(false)
        setAlerta(false)
      } 
        // eslint-disable-next-line
    }, [publicId]);

    useEffect(() => {
      if(urlBackground){
        window.localStorage.setItem('urlBackground', JSON.stringify(urlBackground))
      }
    },[urlBackground])

    useEffect(() => {
      if(frame.colorFrame) {
          window.localStorage.setItem('frame', JSON.stringify(frame))
      }
    },[frame])

    useEffect(() => {
      if(filtroImagen){
        window.localStorage.setItem('pets-filter', JSON.stringify(filtroImagen))
      }
    },[filtroImagen])

    useEffect(() => {
      if(texto) {
          window.localStorage.setItem('petsgallery-texto', JSON.stringify(texto))
      }
    },[texto])

    const handleTexto = e => {
      if(e.target.value.length >= 12) {
        setAlertaLimiteTexto(true)
      } else {
        setAlertaLimiteTexto(false)
      }
      asignarNombreMascota(e.target.value)
      setTexto({
          ...texto,
          textoMascota: e.target.value
      })
    }

    const handleFuente = e => {
      asignarFuente(e.target.value)
      setTexto({
          ...texto,
          fuente: e.target.value
      })
    }

    const handlePosicionTexto = e => {
      asignarPosicionTexto(e.target.checked === true ? "bottom" : "top")
      setTexto({
          ...texto,
          posicionTexto: e.target.checked === true ? "bottom" : "top"
      })
    }

    const handleColorFuente = e => {
      if(e.target.value === "white") {
        asignarColorFuente(e.target.value)
        asignarColorBordeFuente("black")
        setTexto({
          ...texto,
          colorTexto: e.target.value,
          colorBorde: "black"
        })
      } else {
        asignarColorFuente(e.target.value)
        asignarColorBordeFuente("white")
        setTexto({
          ...texto,
          colorTexto: e.target.value,
          colorBorde: "white"
        })
      }
    }

    const handleFilter = (e) => {
        asignarFiltro(e)
        setFiltroImagen(e)
    }

    //funcion para activar el input de imagen normal
    const handleClickInputNormal = () => {
      inputImagenNormalRef.current.click()
    }

    //funcion para activar el input de remover background
    const handleClickInputRef = () => {
      inputRef.current.click()
    }

    const handleCerrarOpciones = e => {
      setMostrarOpciones({
        ...mostrarOpciones,
        activo: e
      })
    }

    const handleBack = (e) => {
      asignarBackground(e)
      setUrlBackground(e)
    }    

    const handleFrame = (e) => {
      asignarFrame(e.target.value)
      setFrame({
          ...frame,
          colorFrame: e.target.value
      })
    }
    
    //funcion para definir a que preset subir la imagen
    // const definirPreset = (e) => {
    //   const siseFile = e.target.files[0]
    //   const file = e.target.value
    //   const file_splitted = file.split('.')
    //   const extension = file_splitted.pop()

    //   if(siseFile.size >= 5349047) {
    //     setAlerta(true)
    //     setMensaje("Upload a smaller image. Max 5Mb")
    //     return
    //   }
    //   if(extension === "png") {
    //     subirPetPng(e)
    //   } else if (extension === "jpg") {
    //     subirPetConFondo(e)      
    //   } else {
    //     setAlerta(true)
    //     setMensaje("Upload a jpg or png image")
    //   }
    // }

    const handleClickDownload = () => {
      setAnimacion(true)
      descargarArte(publicId, filtroImagen, urlBackground, frame, texto)
        .then((res) => {
          if(usuario) {
            guardarArteDB(res.urlCompleta, usuario, res.publicId, res.filtro, res.urlBackground, res.frame, res.texto)
          }
          setAnimacion(false)
        })
        .catch((error) => {
          console.log(error)
          setAnimacion(false)
        })
    }

    const handleUpload = (e) => {
      const file_splitted = e.target.value.split('.')
      const extension = file_splitted.pop()
      if(extension === "png") {
        subirPetPng(e.target.files[0])
      } else if(extension === "jpg") {
        subirPetConFondo(e.target.files[0])
      } else {
        setAlerta(true)
        setMensaje("Upload a valid jpg or png image.")
        return
      }
    }

    const handleUploadRemove = (e) => {
      const file_splitted = e.target.value.split('.')
      const extension = file_splitted.pop()
      if(extension === "png" || extension === "jpg") {
        subirPetRemoverFondo(e.target.files[0])
      } else {
        setAlerta(true)
        setMensaje("Upload a valid jpg or png image.")
        return
      }
    }

    //validar imagen sin remover background
    const validateImg = (e) => { 
      const fileUpload = e.target
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.jpeg)$");
      if (regex.test(fileUpload.value.toLowerCase())) {
          if (typeof (fileUpload.files) != "undefined") {
            const size = fileUpload.files[0].size
            const filesize = Math.round(size/1024)
            if(filesize >= 10000) {
              setAlerta(true)
              setMensaje("Upload a smaller image. Max 10Mb")
              console.log(filesize)
              return
            }
            const file_splitted = fileUpload.value.split('.')
            const extension = file_splitted.pop()
              var reader = new FileReader();
              reader.readAsDataURL(fileUpload.files[0]);
              reader.onload = function (e) {
                  var image = new Image();
                  image.src = e.target.result;
                  image.onload = function () {
                      var height = this.height
                      var width = this.width
                      if (height < 1080 || width < 1080) {
                          setAlerta(true)
                          setMensaje("Image too small. The minimum size required is 1080*1080 pixels.")
                          return
                      } else {
                        if(extension === "png") {
                          subirPetPng(fileUpload.files[0])
                        } else {
                          subirPetConFondo(fileUpload.files[0])
                        }
                        // console.log("paso la validacion")
                      }
                  };
              }
          } else {
              setAlerta(true)
              setMensaje("This browser does not support file upload.")
              return
          }
      } else {
          setAlerta(true)
          setMensaje("Upload a valid jpg or png image.")
          return
      }
      
    }

    //validar imagen y remover background
    const validarImgRemoverBackground = (e) => { 
      const fileUpload = e.target
      var regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.png|.jpeg)$");
      if (regex.test(fileUpload.value.toLowerCase())) {
          if (typeof (fileUpload.files) != "undefined") {
            const size = fileUpload.files[0].size
            const filesize = Math.round(size/1024)
            if(filesize >= 10000) {
              setAlerta(true)
              setMensaje("Upload a smaller image. Max 10Mb")
              console.log(filesize)
              return
            }
            const file_splitted = fileUpload.value.split('.')
            const extension = file_splitted.pop()
              var reader = new FileReader();
              reader.readAsDataURL(fileUpload.files[0]);
              reader.onload = function (e) {
                  var image = new Image();
                  image.src = e.target.result;
                  image.onload = function () {
                      var height = this.height
                      var width = this.width
                      if (height < 1080 || width < 1080) {
                          setAlerta(true)
                          setMensaje("Image too small. The minimum size required is 1080*1080 pixels.")
                          return
                      } else {
                        subirPetRemoverFondo(fileUpload.files[0])
                        // console.log("paso la validacion")
                      }
                  };
              }
          } else {
              setAlerta(true)
              setMensaje("This browser does not support file upload.")
              return
          }
      } else {
          setAlerta(true)
          setMensaje("Upload a valid jpg or png image.")
          return
      }
      
    }



    // //funcion para subir la imagen a Cloudinary
    // const subirPetRemoverFondo = () => {
    //   setMostrarCargadoImagen(true)
    //   subirACloudinaryRemoverFondo(publicId.publicid)
    //     .then(idImagen => {
    //         esperarImagen(idImagen)
    //     })
    //     .catch(error => console.log(error))
    // }

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
        .collection('creditos')
        .where('idUsuario', '==', usuario.uid)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
              console.log('usuario no existe')
              return
            }
            const datosUsuario = snapshot.docs.map(doc => {
                const data = doc.data()
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
  
  //funcion para subir la imagen a Cloudinary
  const subirPetRemoverFondo = (e) => {
    setMostrarCargadoImagen(true)
    subirACloudinaryRemoverFondo(e)
      .then(data => {
        esperarImagen(data)
        // setPublicId({
        //   publicid: data.public_id,
        //   format: data.format
        // })
      })
      .catch(error => console.log(error))
  }

  //REALTIME GET FUNCTION
  const esperarImagen = (data) => {
    // console.log("assetid", assetId)
    const ref = firebase.db.collection("mascotas")
    ref
      //.where('asset_id', '==', data.asset_id)
      .onSnapshot(querySnapshot => {
        //let pets = []
        querySnapshot.forEach(doc => {
          //pets.push([doc.data(), doc.uid])
          if(doc.data().asset_id === data.asset_id){
            setPublicId({
              publicid: doc.data().public_id,
              format: doc.data().format
            })
          }
        })
        // console.log({pets})
        //setFreeCredit(freeCredit - 1) descontar de la base de datos.
      });
  }
  // //REALTIME GET FUNCTION
  // const esperarImagen = async (data) => {
  //   // console.log("assetid", assetId)
  //   const ref = firebase.db.collection("mascotas")
  //   await ref
  //     .where('asset_id', '==', data.asset_id)
  //     .onSnapshot((querySnapshot) => {
  //       let pets = []
  //       querySnapshot.forEach(doc => {
  //           pets.push(doc.data())
  //       });
  //       setPublicId({
  //         publicid: pets[0]?.public_id,
  //         format: pets[0]?.format
  //       })
  //       //setFreeCredit(freeCredit - 1) descontar de la base de datos.
  //     });
  // }

    // const noExiste = publicId.publicid === ""
    // const mensaje = noExiste ? 
    // `<div className="w-80 h-80 bg-gray-200 animate-pulse mt-4 flex items-center justify-center mx-auto rounded-2xl">
    // </div>`
    // :
    // ""

    return (
    <>
      <div className="relative contenedor max-w-lg mx-auto">

        <HeaderUser 
          titulo={"New Art"}
          usuario={usuario}
          firebase={firebase}
        />

        {console.log(publicId.publicid)}

        {alerta && !mostrarCargandoImagen &&
          <AlertaUpload 
            mensaje={mensaje}
          />
        }

        <input
          className="hidden"
          ref={inputImagenNormalRef}
          type="file" 
          accept="image/*"
          name="inputImagenRef"
          onChange={e => handleUpload(e)}
        />
        {publicId.publicid && (
          <div className="z-20 relative w-80 mx-auto">
            <button 
              className="absolute right-0 bottom-0 bg-white bg-opacity-50 p-1 rounded-lg -mb-16"
              onClick={handleClickInputNormal}
            >
              <IconUpload width={30} heigth={30} stroke={"#1f2937"} />
            </button>
          </div>
        )}

        {publicId.publicid || mostrarCargandoImagen ?
          <div
            className="cursor-pointer"
            onClick={handleClickInputNormal}
          >
            <ContenedorImagenFull 
                background={urlBackground.urlLocal}
                colorFrame={frame.colorFrame}
                imagen={publicId}
                filtro={filtroImagen}
                mostrarCargandoImagen={mostrarCargandoImagen}
                nombreMascota={texto}
            >
            </ContenedorImagenFull>
          </div>
        : 
          <div className="w-80 h-80 mt-4 flex items-center justify-center mx-auto">
            <p 
              className="text-5xl font-bold text-gray-700 text-center leading-snug">
                Upload<br></br>an image<br></br>to Start
            </p>
          </div>
        }

          {/* <div className="z-10 w-80 h-80 bg-gray-200 animate-pulse mt-4 flex items-center justify-center mx-auto rounded-2xl">
          </div> */}

        {/* {alerta && !mostrarCargandoImagen &&
          <Alerta 
            mensaje={mensaje}
          />
        } */}

        {publicId.publicid && (
          <div className="w-80 flex justify-around items-center mx-auto mt-10">
            <button 
              className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-yellow-100 sombra-uno border border-yellow-700 text-yellow-700"
              onClick={() => {
                setMostrarOpciones({
                  activo: true,
                  opcion: "fondos"
                })
              }}
            >
              <span className="inline-block absolute top-0 text-xs text-gray-800 -mt-6">Layout</span>
              <IconBack width={40} heigth={40} stroke={"currentColor"} strokeWidth={1.5} />
            </button>
            <button 
              className=" relative w-16 h-16 flex items-center justify-center rounded-2xl bg-red-100 sombra-uno border border-red-800 text-red-800"
              onClick={() => {
                setMostrarOpciones({
                  activo: true,
                  opcion: "filtros"
                })
              }}  
            >
              <span className="inline-block absolute top-0 text-xs text-gray-800 -mt-6">Filter</span>
              <IconFilter width={30} heigth={30} stroke={"currentColor"} strokeWidth={1.5} />
            </button>
            <button 
              className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-green-100 sombra-uno border border-green-800 text-green-800"
              onClick={() => {
                setMostrarOpciones({
                  activo: true,
                  opcion: "texto"
                })
              }}    
            >
              <span className="inline-block absolute top-0 text-xs text-gray-800 -mt-6">Text</span>              
              <IconText width={40} heigth={40} stroke={"currentColor"} strokeWidth={1.5} />
            </button>
            <button 
              onClick={handleClickDownload}
              className="relative w-16 h-16 flex items-center justify-center rounded-2xl bg-purple-100 sombra-uno border border-purple-800 text-purple-800"
            >
              <span className="inline-block absolute top-0 text-xs text-gray-800 -mt-6">Download</span>              
            { animacion ? 
              <IconLoader className="animate-spin" width={30} heigth={30} stroke={"#1f2937"} />
              :
              <IconDownload width={30} heigth={30} stroke={"currentColor"} strokeWidth={1.5}/>
            }              
              {/* <IconDownload width={40} heigth={40} stroke={"#1f2937"} /> */}
            </button>
          </div>
        )}

        {!publicId.publicid && 
          <div className="w-80 h-16 mx-auto mt-5">
            <label
              className={`w-full h-full flex items-center justify-center bg-amarillo border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer ${mostrarCargandoImagen ? "animate-pulse" : ""}`}
          >
              <input
                className="hidden"
                type="file" 
                accept="image/*"
                name="inputImagen"
                onChange={e => handleUpload(e)}
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
        }

        {/* <Toggle /> */}
        <input
          className="hidden"
          type="file" 
          ref={inputRef}
          accept="image/*"
          name="inputRemoverFondo"
          onChange={e => handleUploadRemove(e)}
          // onChange={e => subirPetRemoverFondo(e)}
        />

        {/* {publicId.publicid && publicId.format !== "png" && freeCredit > 0 ?
          <div  className="w-80 mx-auto mt-4">
            <p 
              className="text-xl font-bold text-gray-600 text-center ">You have {creditos} credits to remove the background.
              {usuario ?
                <button 
                  className="text-amarillo font-bold pl-1"
                  onClick={handleClickInputRef}
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
        :
        ""
        } */}

        {/* <section className={`z-20 opciones ${mostrarOpciones ? "opciones-activo" : ""} rounded-t-2xl`}>
          <button 
            className="w-12 h-1 bg-gray-800 block mx-auto rounded-full"
            onClick={() => setMostrarOpciones(!mostrarOpciones)}
          >
          </button>
        </section> */}

        <ContenedorOpciones
          mostrarOpciones={mostrarOpciones}
          handleCerrarOpciones={e => handleCerrarOpciones(e)}
        >
          {mostrarOpciones.opcion === "fondos" && (
            <>
              <ContenedorOpcionesFondos 
                  handleBack={e => handleBack(e)}
                  nombre={urlBackground.nombre}
              />
              <ContenedorOpcionesFrame 
                handleFrame={e => handleFrame(e)}
                colorFrame={frame.colorFrame || "none"}
              />
            </>
          )}
          {mostrarOpciones.opcion === "filtros" && (
            <ContenedorOptionesFiltro
              handleFilter={e => handleFilter(e)}
              imagen={publicId}
              nombre={filtro}
            />
          )}
          {mostrarOpciones.opcion === "texto" && (
            <ContenedorOptionesTexto
              handleTexto={handleTexto}
              handleFuente={handleFuente}
              handlePosicionTexto={handlePosicionTexto}
              handleColorFuente={handleColorFuente}
              nombreMascota={texto.textoMascota || ""}
              fuente={texto.fuente || "Kanit"}
              posicion={texto.posicionTexto || "bottom"}
              colorFuente={texto.colorTexto || "black"}
            />
          )}
        </ContenedorOpciones>

        {/* {publicId.publicid && 
          <Paginacion
            retroceder={false}
            rutaAnterior={"/"}
            adelantar={true}
            rutaSiguiente={"/createart/filter"}
            pantallaSiguiente={"Filter"}
          />
        } */}

      </div>
      <style jsx>
        {`
          .text-icons {
            font-size: 0.5rem;
            line-height: 0.75rem;
          }
          .contenedor {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
          .sombra-uno {
            box-shadow: 0px 2px 0px #18191f;
          }
          .contenedor-imagen-w {
            width: 360px;
          }
          .contenedor-imagen {
            width: 360px;
            heigth: 360px;
          }
          .opciones {
            position: fixed;
            bottom: -100%;
            background-color: white;
            width: 360px;
            height: 260px;
            margin: 5% auto;
            left: 0;
            right: 0;
            box-shadow: 0px -4px 0px #18191f;
            transition: all .4s ease-in-out;
            padding: 1.5rem 0;
          }
          .opciones-activo {
            bottom: 0;
          }
        `}
      </style>
    </>
  );
};

export default SubirImagen;
