import Rect, { useState, useEffect, useRef, useContext } from 'react'
import axios from 'axios'
import {Image, Transformation, CloudinaryContext} from 'cloudinary-react'
import { MdPets } from 'react-icons/md' //icono
import imageContext from '../context/image/imageContext'
import { FirebaseContext } from '../firebase';
import useAutenticacion from '../hooks/useAutenticacion';

export const BACKS = {
  amarillo: {
    url: "https://res.cloudinary.com/petportrait/image/upload/petsgallery/backs/",
    archivoConExtension: "back1_hlttte.jpg",
    archivoSinExtension: "back1_hlttte",
    idPublico: "petsgallery/backs/back1_hlttte",
    idPublicoModificado: "petsgallery:backs:back1_hlttte"
  },
  azul: {
    url: "https://res.cloudinary.com/petportrait/image/upload/petsgallery/backs/",
    archivoConExtension: "back2_ug5tjb.jpg",
    archivoSinExtension: "back2_ug5tjb",
    idPublico: "petsgallery/backs/back2_ug5tjb",
    idPublicoModificado: "petsgallery:backs:back2_ug5tjb"
  },
  negro: {
    url: "https://res.cloudinary.com/petportrait/image/upload/petsgallery/backs/",
    archivoConExtension: "back3_gmufkg.jpg",
    archivoSinExtension: "back3_gmufkg",
    idPublico: "petsgallery/backs/back3_gmufkg.jpg",
    idPublicoModificado: "petsgallery:backs:back3_gmufkg.jpg"
  }
}

const IMAGEN_PRUEBA = {
  uno: "https://res.cloudinary.com/petportrait/image/upload/v1612167129/petsgallery/uwdedmkdkz5jopwisha8.png"
}

export const DOGS = {
  uno: "https://res.cloudinary.com/petportrait/image/upload/v1611472119/petsgallery/matf6gbxivrkba806njo.png"
}

export const IMAGEN_VECTOR = {
  uno: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:15:despeckle:0.2:corners:100:detail:500/v1611472119/petsgallery/matf6gbxivrkba806njo.svg",
  dos: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:20:corners:100:detail:500/v1611487750/petsgallery/l8j7xxbytezemay2nwaj.svg",
  tres: "https://res.cloudinary.com/kostadinov/image/upload/l_grlq8fnu7rjjlgrcft6j,w_900,bo_40px_solid_white/l_oor05krkywrhzn6jyqza,w_1200/l_text:Kanit_350_bold_stroke:LUNCH,bo_40px_solid_white,co_rgb:FFA502,g_south,y_50/grlq8fnu7rjjlgrcft6j.jpg",
  cuatro: "https://res.cloudinary.com/petportrait/image/upload/v1611830724/petsgallery/mbeitykg7o3dsbjvmczu.png"
}


export default function Home() {

  const ImageContext = useContext(imageContext)
  const { version, public_Id, secureUrl } = ImageContext

  const [ urlImagenMascota, setUrlImagenMascota ] = useState("")
  const [ nombreArchivoMascota, setNombreArchivoMascota ] = useState("")
  const [ publicId, setPublicId ] = useState("")
  const [ background, setBackground ] = useState("")
  const [ nombre, setNombre ] = useState("")
  const [ tieneFrame, setTieneFrame ] = useState(false)

  //partes de la url
  const [ urlInicial, setUrlInicial ] = useState("")
  const [ transformaciones, setTransformaciones ] = useState("")
  const [ valorVersion, setValorVersion ] = useState("")
  const [ nombrePreset, setNombrePreset ] = useState("")
  const [ nombreArchivoBackground, setNombreArchivoBackground ] = useState({})

  const [ tipoFuente, setTipoFuente ] = useState("Kanit")
  const [ mascotas, setMascotas ] = useState({}) 

  const [ procesandoImagen, setProcesandoImagen ] = useState(false)

  //context de usuario
  const { usuario, firebase } = useContext(FirebaseContext);

  //partes para la trasformacion
  const [ frame, setFrame ] = useState({
    anchoFrame: "",
    gruesoBordeFrame: "",
    colorFrame: ""

  })
  const [ imagenMascota, setImagenMascota ] = useState({
    archivoMascota: "",
    anchoImagenMascota: 1070
  })
  const [ nombreMascota, setNombreMascota ] = useState({
    fuente: "Kanit",
    sizeFuente: 300,
    estiloFuente: "bold",
    tieneBorde: "stroke",
    texto: nombre,
    grosorBorde: 40,
    colorBorde: "white",
    colorTexto: "fbbf24",
    separacionTexto: 50
  })

  //para evitar el clic derecho
  // useEffect(() => {
  //     document.addEventListener('contextmenu', (e) => {
  //       e.preventDefault();
  //     });
  // })


  //REALTIME GET FUNCTION
  function obtenerMascotas() {
    // setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const mascotas = [];
      querySnapshot.forEach((doc) => {
        mascotas.push(doc.data());
      });
      setMascotas(mascotas);
      // setLoading(false);
    });
  }

  //REALTIME GET FUNCTION
  const obtenerImagenMascota = async (assetId) => {
    console.log("assetid", assetId)
    const ref = await firebase.db.collection("mascotas");
    await ref
      .where('imagen_sin_background.asset_id', '==', assetId)
      .onSnapshot((querySnapshot) => {
      const pets = [];
      querySnapshot.forEach((doc) => {
        pets.push(doc.data());
      });
      setMascotas(pets[0]);
      setPublicId(pets[0]?.imagen_sin_background.public_id)
      console.log(pets[0])
    });
  }

  useEffect(() => {
    if(publicId){
      setProcesandoImagen(false);
      console.log("ha cambiado la imagen")
    }
    // eslint-disable-next-line
  }, [publicId]);


  //Guardar imagen en Cloudinary
  const subirACloudinary = async (e) => {
    setPublicId("")
    setProcesandoImagen(true);
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "petsgallery");
    // setCargando(true);


    await axios.post("https://api.cloudinary.com/v1_1/petportrait/upload", formData)
      .then(respuesta => {
        console.log(respuesta)
        obtenerImagenMascota(respuesta.data.asset_id)

        // setPublicId(respuesta.data.public_id)

        //separando el nombre del archivo de las mascota
        const letrasHastaPunto = respuesta.data.secure_url.lastIndexOf(".")
        const letrasUltimoSlashMascota = respuesta.data.secure_url.lastIndexOf("/")
        const nombreArchivoMascotaLimpio = respuesta.data.secure_url.substring(letrasUltimoSlashMascota+1, letrasHastaPunto)
        console.log(nombreArchivoMascotaLimpio)
        setNombreArchivoMascota(nombreArchivoMascotaLimpio)

        const letrasArchivoCargado = respuesta.data.secure_url.lastIndexOf(".")
        const cadenaArchivoCambiado = respuesta.data.secure_url.substring(0, letrasArchivoCargado+1)
        console.log(cadenaArchivoCambiado+"png")
        setUrlImagenMascota(cadenaArchivoCambiado+"png");
        // setCargando(false);

      })
      .catch(error => {
        console.log(error);
        setProcesandoImagen(false);
      })

  };

  //asignar background
  const asignarBackAmarilo = () => {
    setBackground("/images/backs/back1.jpg")
    setNombreArchivoBackground(BACKS.amarillo)
  }


  //Guardar arte de mascota en Firebase
  const guardarArteDB = async (url) => {
    //objeto de nuevo producto
    const arteMascota = {
      url,
      creado: Date.now(),
      creador: {
        id: "01", //usuario.uid
        nombre: "Carlos Herrera" //usuario.displayName
      }
    }

    try {      
      //insertar productos en la base de datos
      const arteRef = await firebase.db.collection('mascotas')
      await arteRef.add(arteMascota);
  
      //llamada a la funcion del context
      // guardarArteContext(tarjeta)
  
      //redireccionar luego de agregar un producto
      // return router.replace(`/tarjetacreada/?url=${tarjeta.url}`);
    } catch (error) {
      console.log(error)
      //redireccionar si hay error
      return router.replace('/');
    }
  }


  const descargarArte = () => {

    //url del background. Esta al final de la url y es la url base para las transformaciones
    const urlBase = nombreArchivoBackground.url

    //parte inicial de la url
    const hastaUpload = urlBase.indexOf('/upload');
    const urlInicio = urlBase.substring(0, hastaUpload+1)+"upload/"
    setUrlInicial(urlInicio)

    //url complemento uno
    const letrasHastaPetsGallery = urlBase.indexOf('/petsgallery');
    const cadenaPetsGallery = urlBase.substring(0, letrasHastaPetsGallery)
    // console.log(cadenaPetsGallery)
    const letrasHastaVersion = cadenaPetsGallery.lastIndexOf('/');
    const urlVersion = cadenaPetsGallery.substring(letrasHastaVersion, letrasHastaPetsGallery)
    // console.log(urlComplemento);

    //url complemento dos
    const letrasHastaUltimoSlash = urlBase.lastIndexOf("/")
    const cadenaHastaUltimoSlash = urlBase.substring(0, letrasHastaUltimoSlash)
    // console.log(cadenaHastaUltimoSlash)
    const letrasHastaUltimoSlashPreset = cadenaHastaUltimoSlash.lastIndexOf("/")
    const urlPreset = cadenaHastaUltimoSlash.substring(letrasHastaUltimoSlashPreset, letrasHastaUltimoSlash)
    // console.log(nombrePreset)

    //separando el nombre del archivo de las mascota
    const letrasHastaPunto = urlImagenMascota.lastIndexOf(".")
    const letrasUltimoSlashMascota = urlImagenMascota.lastIndexOf("/")
    const archivoMascotaLimpio = urlImagenMascota.substring(letrasUltimoSlashMascota+1, letrasHastaPunto)
    // console.log(urlImagenMascota)
    // console.log("archivo mascota", cadenaUrlImagenMascota)
    
    //transformaciones
    //transformacion para descargar el archivo
    const transformacionDescarga = `fl_attachment:${nombre}`

    //transformacion del frame
    if(frame.colorFrame) {
      var transformacionFrame = `l_${nombreArchivoBackground.idPublicoModificado},w_${frame.anchoFrame},bo_${frame.gruesoBordeFrame}px_solid_${frame.colorFrame}`
    } else {
      var transformacionFrame = ""
    }
    // console.log(transformacionFrame)

    //transformacion de la imagen de la mascota
    const transformacionMascota = `l_petsgallery:${archivoMascotaLimpio},h_${imagenMascota.anchoImagenMascota},g_south,y_0,e_vectorize`

    //transformacion del texto
    const transformacionTexto = `l_text:${nombreMascota.fuente}_${nombreMascota.sizeFuente}_${nombreMascota.estiloFuente}_${nombreMascota.tieneBorde}:${nombre},bo_${nombreMascota.grosorBorde}px_solid_${nombreMascota.colorBorde},co_rgb:${nombreMascota.colorTexto},g_south,y_${nombreMascota.separacionTexto}`


    const transformaciones = transformacionFrame+"/"+transformacionMascota+"/"+transformacionTexto

    const urlCompleta = urlInicio+transformaciones+"/petsgallery/backs/"+nombreArchivoBackground.archivoConExtension
    console.log(urlCompleta)
    
    // guardarArteDB(urlCompleta)

    //descargar imagen al disco
    axios
      .get(urlCompleta, {
        responseType: 'arraybuffer'
      })
      .then(response => {
        const buffer = Buffer.from(response.data, 'base64');
        // console.log(buffer)
        var element = document.createElement("a");
        var file = new Blob(
          [
            buffer
          ],
          { type: "image/jpg" }
        );
        element.href = URL.createObjectURL(file);
        element.download = nombre+".jpg";
        element.click();
      })
      .catch(ex => {
        console.error(ex);
      });

  }
  
  function isUpperCase(str) {
    return str == str.toUpperCase() && str != str.toLowerCase();
  }

  const descargarImagenDisco = () => {
    var element = document.createElement("a");
    var file = new Blob(
      [
        "https://res.cloudinary.com/petportrait/image/upload/l_petsgallery:backs:back1_hlttte,w_810,bo_40px_solid_white/l_petsgallery:mzzn5lrmwqlkmyyr1eme,w_1080,e_vectorize/l_text:Kanit_300_bold_stroke:Lunch,bo_40px_solid_white,co_rgb:fbbf24,g_south,y_50/petsgallery/backs/back1_hlttte.jpg"
      ],
      { type: "image/jpg" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };

  return (
    <>
    <div className="flex flex-col min-h-screen max-w-lg mx-auto">
      <header className="bg-gray-100 h-16 flex items-center justify-center">
        Barra de navegación
      </header>
      <main className="flex flex-grow bg-white">
        <div className="flex flex-col w-full">
          <div className="h-1/5 flex items-center justify-center">
            Titulo
          </div>
          {/* {console.log("mascotas", mascotas, "objetos", mascotas ? Object.keys(mascotas).length : "0")} */}
          {/* {mascotas && Object.keys(mascotas).length !== 0
            ?
            <div>
              <h2>{mascotas.imagen_sin_background.public_id}</h2>
              <h3>{mascotas.imagen_sin_background.version}</h3>
              <Image
                cloudName="petportrait" 
                secure="true"
                publicId={mascotas.imagen_sin_background.public_id}
                dpr="auto"
                width="auto"
                height="auto"                
              >
                <Transformation width="100" height="100" crop="fit" />
              </Image>
            </div>
          : "" } */}
          <div className="w-full flex items-center justify-center h-3/4 ">
            <div 
              className="relative bg-transparent w-80 h-80 flex items-center justify-center bg-cover bg-center border border-red-500"
              style={ { backgroundImage: `url(${background})` } }
            >
              <label className="z-40 absolute top-0 right-0 -mt-5 mr-2 cursor-pointer">
                <MdPets className="h-10 w-10 text-red-500 bg-white p-1 rounded-md border border-red-300" />

                <input
                  className="hidden"
                  type="file" 
                  name="fotografia"
                  onChange={subirACloudinary}
                />
              </label>

              { tieneFrame && frame.colorFrame === "white" && (
                <div className="z-0 absolute w-4/5 h-4/5 bg-transparent border-12 border-red-500">
                </div>
              )}
              { frame.colorFrame === "black" && (
                <div className="z-0 absolute w-4/5 h-4/5 bg-transparent border-12 border-black">
                </div>
              )}

              {/* Componente de cloudinary */}
              { publicId &&     
                <div className="z-10 pt-2">
                  <Image 
                    cloudName="petportrait" 
                    secure="true"
                    publicId={publicId}
                    dpr="auto"
                    width="auto"
                    height="auto"
                  >
                    <Transformation effect="vectorize" />
                    <Transformation effect="trim:10" />
                    <Transformation width="310" height="310" crop="fit" />
                  </Image>
                </div>
              }
              { procesandoImagen &&
                <div className="h-full w-full flex items-center justify-center">
                  <p className="px-4 py-2 bg-white">Procesando imagen...</p>
                </div>
              }
              
              { nombreMascota.fuente === "Kanit" ?
                <p 
                  className={`absolute font-extrabold bottom-4 z-20 text-center text-yellow-400 fuente_uno ${nombre.length <= 5 & isUpperCase(nombre) ? "text-7xl" : nombre.length < 7 && isUpperCase(nombre) ? "text-6xl" : nombre.length <= 7 ? "text-7xl" : "text-6xl"}`}>{nombre}
                </p>
              : 
                <p 
                  className={`absolute bottom-4 z-20 tracking-wider text-purple-500 text-center fuente_dos ${nombre.length <= 5 & isUpperCase(nombre) ? "text-7xl" : nombre.length < 7 && isUpperCase(nombre) ? "text-6xl" : nombre.length <= 8 ? "text-7xl" : "text-6xl"}`}>{nombre}
                </p>
              }
            </div>
            {/* className="z-20 text-center nombre-pet -mb-3" */}
          </div>
          <div className="w-full px-5 py-2">
            <input 
              className="w-full px-2 py-2 border border-gray-300 text-center text-gray-500 text-lg font-medium focus:outline-none mb-2"
              type="text"
              name="nombre"
              value={nombre}
              placeholder="Nombre"
              onChange={e => setNombre(e.target.value)}
              autoComplete="off"
            />
            <label>
              <select
                className="border border-gray-300"
                type="select" 
                name="fuente" 
                value={nombreMascota.fuente}
                onChange={e => {
                  if(e.target.value === "Kanit") {
                    setNombreMascota({
                      ...nombreMascota,
                      fuente: "Kanit",
                      sizeFuente: 300,
                      grosorBorde: 40,
                      estiloFuente: "bold",
                      colorTexto: "fbbf24"
                    })
                  } else {
                    setNombreMascota({
                      ...nombreMascota,
                      fuente: "Leckerli%20One",
                      sizeFuente: 300,
                      grosorBorde: 30,
                      estiloFuente: "thin",
                      colorTexto: "8b5cf6"
                    })
                  }
                }}
              > 
                <option value="Kanit">Kanit</option>
                <option value="Leckerli%20One">Lekerli</option>
              </select>
            </label>

            <label className="px-4">
              <input 
                type="checkbox" 
                id="tieneFrame" 
                value={tieneFrame}
                onChange={() => {
                  setTieneFrame(!tieneFrame)
                  // console.log(tieneFrame)
                  if(!tieneFrame) {
                    setFrame({
                      ...frame,
                      anchoFrame: 810,
                      gruesoBordeFrame: 40,
                      colorFrame: "white"
                    }) 
                  } else {
                    setFrame({
                      anchoFrame: "",
                      gruesoBordeFrame: "",
                      colorFrame: ""
                    })
                  }
                }}
              /> Frame
            </label>

            { tieneFrame && (
            <>
              <label className="px-2">
                <input 
                  autoComplete="off"
                  type="radio" 
                  id="white" 
                  name="color" 
                  value="white"
                  checked={frame.colorFrame === "white"}
                  onChange={e => setFrame({...frame, colorFrame: "white"})}
                /> White
              </label>
              <label className="pr-1">
                <input 
                  autoComplete="off"
                  type="radio" 
                  id="black" 
                  name="color" 
                  value="black"
                  checked={frame.colorFrame === "black"}
                  onChange={e => setFrame({...frame, colorFrame: "black"})}
                /> Black
              </label>
            </>
            )}


          </div>

          <div className="h-1/5">
            <ul className="flex h-full space-x-4 items-center justify-center">
              <li>
                <img 
                  src="/images/backs/back1.jpg"
                  className="h-16 w-16 border border-gray-500 cursor-pointer"
                  onClick={asignarBackAmarilo}
                  />
              </li>
              <li>
                <img 
                  src="/images/backs/back2.jpg"
                  className="h-16 w-16 border border-gray-500 cursor-pointer"
                  onClick={() => {
                    setBackground("/images/backs/back2.jpg")
                    setNombreArchivoBackground(BACKS.azul)
                  }}
                />
              </li>
              <li>
                <img 
                  src="/images/backs/back3.jpg"
                  className="h-16 w-16 border border-gray-500 cursor-pointer"
                  onClick={() => {
                    setBackground("/images/backs/back3.jpg")
                    setNombreArchivoBackground(BACKS.negro)
                  }}
                />
              </li>
            </ul>
          </div>
          <button
            className="w-56 mx-auto py-2 px-2 border bg-red-500 text-white my-2"
            onClick={descargarArte}
          >
            Descargar
          </button>
        </div>
      </main>
      <footer className="bg-gray-100 h-16 flex items-center justify-center">
        Footer
      </footer>
    </div>

    <style jsx>{`
      .fuente_uno {
        font-family: 'Kanit', serif;
        -webkit-text-stroke: 4px white;
      }
      .fuente_dos {
        font-family: 'Leckerli One', serif;
        font-weight: black;
        -webkit-text-stroke: 3px white;
      }
    `}
    </style>

    </>
  )
}
