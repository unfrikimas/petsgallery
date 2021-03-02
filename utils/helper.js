import axios from 'axios'
import firebase from '../firebase/firebase'
import shortid from 'shortid'

export const colores = [
  {nombre: "white", valor: "ffffff"},
  {nombre: "black", valor: "000000"},
  {nombre: "red", valor: "dc2626"},
  {nombre: "pink", valor: "db2777"},
  {nombre: "yellow", valor: "fbbf24"},
  {nombre: "blue", valor: "2563eb"},
  {nombre: "indigo", valor: "4f46e5"},
  {nombre: "purple", valor: "7c3aed"},
  {nombre: "green", valor: "10b981"}
]

export const filtros = {
  vectorize: "e_vectorize",
  grayscale: "e_grayscale",
  none: ""
}

//funcion para subir la imagen a Cloudinary
export const subirPetPng = (imagen) => {
  subirACloudinaryPng(imagen)
    .then((imagen) => {
      setPublicId({
        publicid: imagen.public_id,
        format: imagen.format
      })
    })
    .catch((error) => console.log(error))
}

//Guardar imagen en Cloudinary
export const subirACloudinaryRemoverFondo = async (e) => {
  const file = e
  // const file = e.target.files[0]
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "petsgallery")
  try {
    const respuesta = await axios.post("https://api.cloudinary.com/v1_1/petportrait/image/upload", formData)
    return respuesta.data
  } catch (error) {
    console.log(error);
  }
}

//Guardar imagen en Cloudinary
export const subirACloudinaryEfectoTrim = async (imagen) => {
  const urlApi = "https://api.cloudinary.com/v1_1/petportrait/image/upload/"
  const file = "https://res.cloudinary.com/petportrait/image/upload/"+imagen
  try {
    const respuesta = await axios.post(urlApi, {
      file: file,
      upload_preset: 'petsgallerypng'
    })
    // console.log(respuesta)
    return respuesta.data
  } catch (error) {
    console.log(error);
  }
}

//Guardar imagen en Cloudinary
export const subirACloudinaryConFondo = async (e) => {
  const file = e
  // const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "petswithbackground")
  try {
    const respuesta = await axios.post("https://api.cloudinary.com/v1_1/petportrait/image/upload", formData)
    return respuesta.data
  } catch (error) {
    console.log(error);
  }
}

//Guardar imagen PNG subida por el usuario, en Cloudinary
export const subirACloudinaryPng = async (e) => {
  const file = e
  // const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "petsgallerypng")
  try {
    const respuesta = await axios.post("https://api.cloudinary.com/v1_1/petportrait/image/upload", formData)
    return respuesta.data
  } catch (error) {
    console.log(error);
  }
}

//REALTIME GET FUNCTION
export const esperarImagen = (assetId) => {
    // console.log("assetid", assetId)
    const ref = firebase.db.collection("mascotas");
    ref
        .where('imagen_sin_background.asset_id', '==', assetId)
        .onSnapshot((querySnapshot) => {
            const pets = [];
            querySnapshot.forEach((doc) => {
                pets.push(doc.data());
            });
            return pets[0]
        });
    
}

//descargar arte
export const descargarArte = async (publicId, filtro, urlBackground, frame, texto) => {
  
  //url inicial
  const urlInicio = "https://res.cloudinary.com/petportrait/image/upload/"

  //separando el nombre del archivo de la mascota
  const nombreBaseMascota = publicId.publicid+".png"
  const letrasHastaPunto = nombreBaseMascota.lastIndexOf(".")
  const letrasUltimoSlashMascota = nombreBaseMascota.lastIndexOf("/")
  const nombreMascotaLimpio = nombreBaseMascota.substring(letrasUltimoSlashMascota+1, letrasHastaPunto)
  
  //transformaciones
  //transformacion para descargar el archivo
  const transformacionDescarga = `fl_attachment:${texto.textoMascota}`
  
  //transformacion del frame
  if(frame.colorFrame !== "none") {
    var transformacionFrame = `l_${urlBackground.idPublicoModificado},w_${frame.anchoFrame},bo_${frame.gruesoBordeFrame}px_solid_rgb:${valorColor(frame.colorFrame)}/fl_layer_apply,g_south,y_110`
    // var transformacionFrame = `l_${urlBackground.idPublicoModificado},w_${frame.anchoFrame},bo_${frame.gruesoBordeFrame}px_solid_rgb:${valorColor(frame.colorFrame)},g_south,y_110`
  } else {
    var transformacionFrame = ""
  }

  //transformacion de la imagen de la mascota
  const nombreMascotaSinBarras = reemplazarBarras(publicId.publicid)
  const transformacionMascota = `l_${nombreMascotaSinBarras}${valorFiltro(filtro)},$ar_ar${valorEfecto(publicId.format)}/h_${calcularAlturaImagen(publicId.format)},${calcularAnchoImagen(publicId.format)}c_fit,ar_$ar/fl_layer_apply,g_south,y_0`
  
  // const transformacionMascota = `l_${nombreMascotaSinBarras},h_${calcularAlturaImagen(publicId.format)},${calcularAnchoImagen(publicId.format)}g_south,y_0${valorFiltro(filtro)}`


  //transformacion del texto
  const transformacionTexto = `l_text:${texto.fuente}_${calculoFuenteCloud(texto.textoMascota, texto.fuente)}_${calculoPesoFuente(texto.fuente)}_${texto.tieneBorde}:${reemplazarEspacios(texto.textoMascota)},bo_${calculoBordeFuente(texto.textoMascota, texto.fuente)}px_solid_${texto.colorBorde},co_rgb:${valorColor(texto.colorTexto)}/fl_layer_apply,g_south,y_${calculoDistanciaTextoCloud(texto.textoMascota, texto.fuente)}`
  // const transformacionTexto = `l_text:${texto.fuente}_${calculoFuenteCloud(texto.textoMascota, texto.fuente)}_${calculoPesoFuente(texto.fuente)}_${texto.tieneBorde}:${reemplazarEspacios(texto.textoMascota)},bo_${calculoBordeFuente(texto.textoMascota, texto.fuente)}px_solid_${texto.colorBorde},co_rgb:${valorColor(texto.colorTexto)},g_south,y_${calculoDistanciaTextoCloud(texto.textoMascota, texto.fuente)}`

  const transformaciones = transformacionFrame+"/"+transformacionMascota+"/"+transformacionTexto

  const urlCompleta = urlInicio+transformaciones+"/petsgallery/backs/"+urlBackground.archivoConExtension
  console.log(urlCompleta)
  
  //descargar imagen al disco
  try {
    await axios
      .get(urlCompleta, {responseType: 'arraybuffer'})
        .then(response => {
          const buffer = Buffer.from(response.data, 'base64')
          // console.log(buffer)
          var element = document.createElement("a")
          var file = new Blob(
            [
              buffer
            ],
            { type: "image/jpg" }
          );
          element.href = URL.createObjectURL(file)
          element.download = texto.textoMascota+".jpg"
          element.click()
        })
    return {urlCompleta, publicId, filtro, urlBackground, frame, texto}
  } catch (error) {
    console.error(error);
  }

}


//descargar arte
export const crearUrlArte = async (publicId, filtro, urlBackground, frame, texto) => {
  //url inicial
  const urlInicio = "https://res.cloudinary.com/petportrait/image/upload/"


  //transformaciones
  //transformacion del frame
  if(frame.colorFrame !== "none") {
    var transformacionFrame = `l_${urlBackground.idPublicoModificado},w_${frame.anchoFrame},bo_${frame.gruesoBordeFrame}px_solid_rgb:${valorColor(frame.colorFrame)}/fl_layer_apply,g_south,y_110`
  } else {
    var transformacionFrame = ""
  }

  //transformacion de la imagen de la mascota
  const nombreMascotaSinBarras = reemplazarBarras(publicId.publicid)
  const transformacionMascota = `l_${nombreMascotaSinBarras}${valorFiltro(filtro)},$ar_ar${valorEfecto(publicId.format)}/e_sharpen:100/h_${calcularAlturaImagen(publicId.format)},${calcularAnchoImagen(publicId.format)}c_fit,ar_$ar/fl_layer_apply,g_south,y_0`
  
  //transformacion del texto
  const transformacionTexto = `l_text:${texto.fuente}_${calculoFuenteCloud(texto.textoMascota, texto.fuente)}_${calculoPesoFuente(texto.fuente)}_${texto.tieneBorde}:${reemplazarEspacios(texto.textoMascota)},bo_${calculoBordeFuente(texto.textoMascota, texto.fuente)}px_solid_${texto.colorBorde},co_rgb:${valorColor(texto.colorTexto)}/fl_layer_apply,g_south,y_${calculoDistanciaTextoCloud(texto.textoMascota, texto.fuente)}`

  const transformaciones = transformacionFrame+"/"+transformacionMascota+"/"+transformacionTexto

  const urlCompleta = urlInicio+transformaciones+"/petsgallery/backs/"+urlBackground.archivoConExtension
  return urlCompleta
}

//Guardar arte de mascota en Firebase
export const guardarArteDB = async (url, usuario, publicId, filtro, urlBackground, frame, texto,) => {
  //objeto de nuevo producto
  const arteMascota = {
    slug: shortid.generate(),
    url,
    creado: Date.now(),
    creador: {
      uid: usuario.uid,
      nombre: usuario.displayName
    },
    props: {
      publicId,
      filtro,
      urlBackground,
      frame,
      texto
    }
  }

  try {                
    //insertar artes en la base de datos
    const arteRef = firebase.db.collection('artes')
    await arteRef.add(arteMascota)
  } catch (error) {
      console.log(error)    
  }  
}

export const valorFiltro = (filtro) => {
  let tipoFiltro
  if(filtro === "none") return tipoFiltro=""
  if(filtro === "vectorize") return tipoFiltro=",e_vectorize"
  if(filtro === "grayscale") return tipoFiltro=",e_grayscale"
}

export const valorEfecto = (formato) => {
  let efecto
  if(formato === "png") return efecto="/e_trim:25"
  if(formato === "jpg") return efecto=""
}

export const calcularAlturaImagen = (formato) => {
  let altura
  if(formato === "png") {
    return altura="1070"
  } else return altura="1080"
}

export const calcularAnchoImagen = (formato) => {
  let ancho
  if(formato === "png") {
    return ancho=""
  } else return ancho="w_1080,"
}

//funcion para obtener el hex del color
export const valorColor = (colorInput) => {
  let valor
  if(colorInput==="white") return valor="ffffff"
  if(colorInput==="black") return valor="000000"
  if(colorInput==="red") return valor="dc2626"
  if(colorInput==="pink") return valor="db2777"
  if(colorInput==="yellow") return valor="fbbf24"
  if(colorInput==="blue") return valor="2563eb"
  if(colorInput==="indigo") return valor="4f46e5"
  if(colorInput==="purple") return valor="7c3aed"
  if(colorInput==="green") return valor="10b981"
}

export const calculoFuenteCloud = (texto, fuente) => {
  let size
  if(fuente === "Kanit") {
    if(texto.length <= 4  && isUpperCase(texto)) return size="300" 
    if(texto.length === 5  && isUpperCase(texto)) return size="250" 
    if(texto.length === 6  && isUpperCase(texto)) return size="210" 
    if(texto.length === 7  && isUpperCase(texto)) return size="190" 
    if(texto.length === 8  && isUpperCase(texto)) return size="170" 
    if(texto.length === 9  && isUpperCase(texto)) return size="150" 
    if(texto.length === 10  && isUpperCase(texto)) return size="140" 
    if(texto.length >= 11  && isUpperCase(texto)) return size="120" 

    if(texto.length <= 4  && !isUpperCase(texto)) return size="300" 
    if(texto.length === 5  && !isUpperCase(texto)) return size="280" 
    if(texto.length === 6  && !isUpperCase(texto)) return size="240" 
    if(texto.length === 7  && !isUpperCase(texto)) return size="210" 
    if(texto.length === 8  && !isUpperCase(texto)) return size="180" 
    if(texto.length === 9  && !isUpperCase(texto)) return size="160" 
    if(texto.length === 10  && !isUpperCase(texto)) return size="140" 
    if(texto.length >= 11  && !isUpperCase(texto)) return size="120" 
  }

  if(fuente === "Suez%20One") {
  
    if(texto.length <= 3  && isUpperCase(texto)) return size="280" 
    if(texto.length === 4  && isUpperCase(texto)) return size="250" 
    if(texto.length === 5  && isUpperCase(texto)) return size="220" 
    if(texto.length === 6  && isUpperCase(texto)) return size="180" 
    if(texto.length === 7  && isUpperCase(texto)) return size="170" 
    if(texto.length === 8  && isUpperCase(texto)) return size="150" 
    if(texto.length === 9  && isUpperCase(texto)) return size="130" 
    if(texto.length === 10  && isUpperCase(texto)) return size="120" 
    if(texto.length >= 11  && isUpperCase(texto)) return size="100" 

    if(texto.length <= 4  && !isUpperCase(texto)) return size="280" 
    if(texto.length === 5  && !isUpperCase(texto)) return size="260" 
    if(texto.length === 6  && !isUpperCase(texto)) return size="220" 
    if(texto.length === 7  && !isUpperCase(texto)) return size="190" 
    if(texto.length === 8  && !isUpperCase(texto)) return size="170" 
    if(texto.length === 9  && !isUpperCase(texto)) return size="150" 
    if(texto.length === 10  && !isUpperCase(texto)) return size="130" 
    if(texto.length >= 11  && !isUpperCase(texto)) return size="110" 

  }

  if(fuente === "Gochi%20Hand") {
  
    if(texto.length <= 3  && isUpperCase(texto)) return size="300" 
    if(texto.length === 4  && isUpperCase(texto)) return size="280" 
    if(texto.length === 5  && isUpperCase(texto)) return size="260" 
    if(texto.length === 6  && isUpperCase(texto)) return size="240" 
    if(texto.length === 7  && isUpperCase(texto)) return size="210" 
    if(texto.length === 8  && isUpperCase(texto)) return size="180" 
    if(texto.length === 9  && isUpperCase(texto)) return size="150" 
    if(texto.length === 10  && isUpperCase(texto)) return size="135" 
    if(texto.length >= 11  && isUpperCase(texto)) return size="120" 

    if(texto.length <= 3  && !isUpperCase(texto)) return size="300" 
    if(texto.length === 4  && !isUpperCase(texto)) return size="300" 
    if(texto.length === 5  && !isUpperCase(texto)) return size="270" 
    if(texto.length === 6  && !isUpperCase(texto)) return size="250" 
    if(texto.length === 7  && !isUpperCase(texto)) return size="210" 
    if(texto.length === 8  && !isUpperCase(texto)) return size="190" 
    if(texto.length === 9  && !isUpperCase(texto)) return size="160" 
    if(texto.length === 10  && !isUpperCase(texto)) return size="145" 
    if(texto.length >= 11  && !isUpperCase(texto)) return size="130" 

  }

}

export const calculoDistanciaTextoCloud = (texto, fuente) => {
  let distancia
  if(fuente === "Kanit") {
    if(texto.length <= 4  && isUpperCase(texto)) return distancia="70" 
    if(texto.length === 5  && isUpperCase(texto)) return distancia="70" 
    if(texto.length === 6  && isUpperCase(texto)) return distancia="80" 
    if(texto.length === 7  && isUpperCase(texto)) return distancia="85" 
    if(texto.length === 8  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 9  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 10  && isUpperCase(texto)) return distancia="100" 
    if(texto.length >= 11  && isUpperCase(texto)) return distancia="110" 

    if(!isUpperCase(texto)) {
      if(texto.length <= 4) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="50"
        } else return distancia="70"
      }
      if(texto.length === 5) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="50"
        } else return distancia="80"
      }
      if(texto.length === 6) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="50"
        } else return distancia="90"
      }
      if(texto.length === 7) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="60"
        } else return distancia="90"
      }
      if(texto.length === 8) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="60"
        } else return distancia="90"
      }
      if(texto.length === 9) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="70"
        } else return distancia="90"
      }
      if(texto.length === 10) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="70"
        } else return distancia="100"
      }
      if(texto.length >= 11) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="70"
        } else return distancia="100"
      }
    }
  }

  if(fuente === "Suez%20One") {

    if(texto.length <= 4  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 5  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 6  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 7  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 8  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 9  && isUpperCase(texto)) return distancia="100" 
    if(texto.length === 10  && isUpperCase(texto)) return distancia="100" 
    if(texto.length >= 11  && isUpperCase(texto)) return distancia="110" 

    if(!isUpperCase(texto)) {
      if(texto.length <= 4) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="50"
        } else return distancia="90"
      }
      if(texto.length === 5) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="50"
        } else return distancia="90"
      }
      if(texto.length === 6) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="60"
        } else return distancia="90"
      }
      if(texto.length === 7) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="60"
        } else return distancia="90"
      }
      if(texto.length === 8) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="60"
        } else return distancia="90"
      }
      if(texto.length === 9) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="70"
        } else return distancia="90"
      }
      if(texto.length === 10) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="70"
        } else return distancia="90"
      }
      if(texto.length >= 11) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          console.log(">=11", texto)
          return distancia="70"
        } else return distancia="100"
      }
    }
  }

  if(fuente === "Gochi%20Hand") {

    if(texto.length <= 3  && isUpperCase(texto)) return distancia="70" 
    if(texto.length === 4  && isUpperCase(texto)) return distancia="80" 
    if(texto.length === 5  && isUpperCase(texto)) return distancia="80" 
    if(texto.length === 6  && isUpperCase(texto)) return distancia="80" 
    if(texto.length === 7  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 8  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 9  && isUpperCase(texto)) return distancia="90" 
    if(texto.length === 10  && isUpperCase(texto)) return distancia="90" 
    if(texto.length >= 11  && isUpperCase(texto)) return distancia="95" 

    if(!isUpperCase(texto)) {
      if(texto.length <= 3) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="30"
        } else return distancia="80"
      }
      if(texto.length === 4) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="30"
        } else return distancia="80"
      }
      if(texto.length === 5) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="35"
        } else return distancia="85"
      }
      if(texto.length === 6) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="35"
        } else return distancia="85"
      }
      if(texto.length === 7) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="35"
        } else return distancia="85"
      }
      if(texto.length === 8) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="35"
        } else return distancia="90"
      }
      if(texto.length === 9) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="50"
        } else return distancia="90"
      }
      if(texto.length === 10) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          return distancia="55"
        } else return distancia="90"
      }
      if(texto.length >= 11) {
        if(texto.includes('p') || texto.includes('q') || texto.includes('g') || texto.includes('y')) {
          console.log(">=11", texto)
          return distancia="65"
        } else return distancia="95"
      }
    }
  }

}

export const reemplazarEspacios = (texto) => {
  const textoSinEspacios = texto.split(" ").join("%20")
  return textoSinEspacios
}

export const reemplazarBarras = (urlMascota) => {
  const urlSinBarras = urlMascota.split("/").join(":")
  return urlSinBarras
}


export const calculoBordeFuente = (texto, fuente) => {
  let borde
  if(fuente === "Kanit") {
    if(texto.length <= 4 && isUpperCase(texto)) return borde="30"
    if(texto.length === 5 && isUpperCase(texto)) return borde="30"
    if(texto.length === 6 && isUpperCase(texto)) return borde="30"
    if(texto.length === 7 && isUpperCase(texto)) return borde="30"
    if(texto.length === 8 && isUpperCase(texto)) return borde="30"
    if(texto.length === 9 && isUpperCase(texto)) return borde="20"
    if(texto.length === 10 && isUpperCase(texto)) return borde="20"
    if(texto.length >= 11 && isUpperCase(texto)) return borde="15"

    if(texto.length <= 4 && !isUpperCase(texto)) return borde="30"
    if(texto.length === 5 && !isUpperCase(texto)) return borde="30"
    if(texto.length === 6 && !isUpperCase(texto)) return borde="30"
    if(texto.length === 7 && !isUpperCase(texto)) return borde="25"
    if(texto.length === 8 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 9 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 10 && !isUpperCase(texto)) return borde="20"
    if(texto.length >= 11 && !isUpperCase(texto)) return borde="15"
  }

  if(fuente === "Suez%20One") {
    if(texto.length <= 3 && isUpperCase(texto)) return borde="25"
    if(texto.length === 4 && isUpperCase(texto)) return borde="20"
    if(texto.length === 5 && isUpperCase(texto)) return borde="20"
    if(texto.length === 6 && isUpperCase(texto)) return borde="20"
    if(texto.length === 7 && isUpperCase(texto)) return borde="15"
    if(texto.length === 8 && isUpperCase(texto)) return borde="15"
    if(texto.length === 9 && isUpperCase(texto)) return borde="15"
    if(texto.length === 10 && isUpperCase(texto)) return borde="15"
    if(texto.length >= 11 && isUpperCase(texto)) return borde="15"

    if(texto.length <= 4 && !isUpperCase(texto)) return borde="25"
    if(texto.length === 5 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 6 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 7 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 8 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 9 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 10 && !isUpperCase(texto)) return borde="15"
    if(texto.length >= 11 && !isUpperCase(texto)) return borde="15"
  }

  if(fuente === "Gochi%20Hand") {
    if(texto.length <= 3 && isUpperCase(texto)) return borde="30"
    if(texto.length === 4 && isUpperCase(texto)) return borde="30"
    if(texto.length === 5 && isUpperCase(texto)) return borde="25"
    if(texto.length === 6 && isUpperCase(texto)) return borde="25"
    if(texto.length === 7 && isUpperCase(texto)) return borde="20"
    if(texto.length === 8 && isUpperCase(texto)) return borde="20"
    if(texto.length === 9 && isUpperCase(texto)) return borde="17"
    if(texto.length === 10 && isUpperCase(texto)) return borde="15"
    if(texto.length >= 11 && isUpperCase(texto)) return borde="12"

    if(texto.length <= 3 && !isUpperCase(texto)) return borde="30"
    if(texto.length === 4 && !isUpperCase(texto)) return borde="30"
    if(texto.length === 5 && !isUpperCase(texto)) return borde="27"
    if(texto.length === 6 && !isUpperCase(texto)) return borde="25"
    if(texto.length === 7 && !isUpperCase(texto)) return borde="22"
    if(texto.length === 8 && !isUpperCase(texto)) return borde="20"
    if(texto.length === 9 && !isUpperCase(texto)) return borde="17"
    if(texto.length === 10 && !isUpperCase(texto)) return borde="15"
    if(texto.length >= 11 && !isUpperCase(texto)) return borde="12"
  }

}

export const calculoPesoFuente = (fuente) => {
  let peso
  if(fuente === "Kanit") {
    peso = "bold"
  }
  if(fuente === "Suez%20One") {
    peso = "thin"
  }
  if(fuente === "Gochi%20Hand") {
    peso = "thin"
  }
  return peso
}

export const isUpperCase = (str) => {
  return str == str.toUpperCase() && str != str.toLowerCase();
}


export const calculoFuenteCotenedorImagen = (texto, fuente, color) => {
  let size
  if(fuente === "Kanit") {
    if(texto.length <=5  && isUpperCase(texto)) {
      if(color==="white") {
        return size="fuente-7 borde-maximo-negro" 
      } else return size="fuente-7 borde-maximo-blanco" 
    }
    if(texto.length === 6 && isUpperCase(texto)) {
      if(color==="white") {
        return size="fuente-6 borde-maximo-negro abajo-1"
      } else return size="fuente-6 borde-maximo-blanco abajo-1"
    }
    if(texto.length === 7 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-maximo-negro abajo-2"
      } else return size="fuente-5 borde-maximo-blanco abajo-2"
    }
    if(texto.length === 8 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-maximo-negro abajo-2"
      } else return size="fuente-5 borde-maximo-blanco abajo-2"
    }
    if(texto.length === 9 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3"
      } else return size="fuente-4 borde-maximo-blanco abajo-3"
    }
    if(texto.length >= 10 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3"
      } else return size="fuente-4 borde-minimo-blanco abajo-3"
    }

    if(texto.length <= 6 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-7 borde-maximo-negro" 
      } else return size="fuente-7 borde-maximo-blanco" 
    }
    if(texto.length === 7 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-maximo-negro abajo-1"
      } else return size="fuente-6 borde-maximo-blanco abajo-1"
    }
    if(texto.length === 8 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-maximo-negro abajo-2" 
      } else return size="fuente-5 borde-maximo-blanco abajo-2"
    } 
    if(texto.length === 9 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-minimo-negro abajo-2" 
      } else return size="fuente-5 borde-maximo-blanco abajo-2" 
    }
    if(texto.length === 10 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3" 
      } else return size="fuente-4 borde-minimo-blanco abajo-3" 
    }
    if(texto.length >= 11 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3" 
      } else return size="fuente-4 borde-minimo-blanco abajo-3"
    } 
  } 
  
  if (fuente === "Suez%20One") {

    if(texto.length <= 4 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-7 borde-maximo-negro" 
      } else return size="fuente-7 borde-maximo-blanco" 
    }
    if(texto.length === 5 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-maximo-negro abajo-1" 
      } else return size="fuente-6 borde-maximo-blanco abajo-1" 
    }
    if(texto.length === 6 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-maximo-negro abajo-1"
      } else return size="fuente-6 borde-maximo-blanco abajo-1"
    }
    if(texto.length === 7 && isUpperCase(texto)) {
      if(color==="white") {  
       return size="fuente-5 borde-maximo-negro abajo-2"
      } else return size="fuente-5 borde-maximo-blanco abajo-2"
    }
    if(texto.length === 8 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-minimo-negro abajo-2"
      } else return size="fuente-5 borde-minimo-blanco abajo-2"
    }
    if(texto.length === 9 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3"
      } else return size="fuente-4 borde-minimo-blanco abajo-3"
    }
    if(texto.length === 10 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3"
      } else return size="fuente-4 borde-minimo-blanco abajo-3"
    }
    if(texto.length >= 11 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-3 borde-minimo-negro abajo-4"
      } else return size="fuente-3 borde-minimo-blanco abajo-4"
    }

    if(texto.length <= 5 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-7 borde-maximo-negro" 
      } else return size="fuente-7 borde-maximo-blanco" 
    }
    if(texto.length === 6 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-maximo-negro abajo-1" 
      } else return size="fuente-6 borde-maximo-blanco abajo-1" 
    }
    if(texto.length === 7 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-maximo-negro abajo-1" 
      } else return size="fuente-6 borde-maximo-blanco abajo-1" 
    }
    if(texto.length === 8 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-minimo-negro abajo-2"
      } else return size="fuente-5 borde-minimo-blanco abajo-2"
    }
    if(texto.length === 9 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-minimo-negro abajo-2" 
      } else return size="fuente-5 borde-minimo-blanco abajo-2" 
    }
    if(texto.length === 10 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3" 
      } else return size="fuente-4 borde-minimo-blanco abajo-3"
    } 
    if(texto.length >= 11 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-3" 
      } else return size="fuente-4 borde-minimo-blanco abajo-3" 
    }
  }

  if (fuente === "Gochi%20Hand") {

    if(texto.length <= 4 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-8 borde-maximo-negro abajo-1" 
      } else return size="fuente-8 borde-maximo-blanco abajo-1" 
    }
    if(texto.length === 5 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-8 borde-maximo-negro abajo-1" 
      } else return size="fuente-8 borde-maximo-blanco abajo-1" 
    }
    if(texto.length === 6 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-7 borde-maximo-negro abajo-1"
      } else return size="fuente-7 borde-maximo-blanco abajo-1"
    }
    if(texto.length === 7 && isUpperCase(texto)) {
      if(color==="white") {  
       return size="fuente-6 borde-maximo-negro abajo-2"
      } else return size="fuente-6 borde-maximo-blanco abajo-2"
    }
    if(texto.length === 8 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-minimo-negro abajo-2"
      } else return size="fuente-6 borde-minimo-blanco abajo-2"
    }
    if(texto.length === 9 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5 borde-minimo-negro abajo-3"
      } else return size="fuente-5 borde-minimo-blanco abajo-3"
    }
    if(texto.length === 10 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4-5 borde-minimo-negro abajo-3"
      } else return size="fuente-4-5 borde-minimo-blanco abajo-3"
    }
    if(texto.length >= 11 && isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4 borde-minimo-negro abajo-4"
      } else return size="fuente-4 borde-minimo-blanco abajo-4"
    }

    if(texto.length <= 4 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-9 borde-maximo-negro abajo-0" 
      } else return size="fuente-9 borde-maximo-blanco abajo-0" 
    }
    if(texto.length === 5 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-9 borde-maximo-negro abajo-0"
      } else return size="fuente-9 borde-maximo-blanco abajo-0" 
    }
    if(texto.length === 6 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-8 borde-maximo-negro abajo-1" 
      } else return size="fuente-8 borde-maximo-blanco abajo-1" 
    }
    if(texto.length === 7 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-7 borde-maximo-negro abajo-2" 
      } else return size="fuente-7 borde-maximo-blanco abajo-2" 
    }
    if(texto.length === 8 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-6 borde-minimo-negro abajo-2"
      } else return size="fuente-6 borde-minimo-blanco abajo-2"
    }
    if(texto.length === 9 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-5-5 borde-minimo-negro abajo-3" 
      } else return size="fuente-5-5 borde-minimo-blanco abajo-3" 
    }
    if(texto.length === 10 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4-7 borde-minimo-negro abajo-3" 
      } else return size="fuente-4-7 borde-minimo-blanco abajo-3"
    } 
    if(texto.length >= 11 && !isUpperCase(texto)) {
      if(color==="white") {  
        return size="fuente-4-5 borde-minimo-negro abajo-4" 
      } else return size="fuente-4-5 borde-minimo-blanco abajo-4" 
    }
  }

}

export const calculoFuenteCotenedorProductos = (texto, fuente) => {
  let size
  if(fuente === "Kanit") {
    if(texto.length <= 5 && isUpperCase(texto)) return size="text-lg borde-maximo" 
    if(texto.length === 6 && isUpperCase(texto)) return size="text-base borde-maximo" 
    if(texto.length === 7 && isUpperCase(texto)) return size="text-sm borde-maximo"
    if(texto.length === 8 && isUpperCase(texto)) return size="text-xs borde-maximo bottom-1"
    if(texto.length === 9 && isUpperCase(texto)) return size="text-xs borde-maximo"
    if(texto.length >= 10 && isUpperCase(texto)) return size="text-xs borde-minimo"

    if(texto.length <= 6 && !isUpperCase(texto)) return size="text-xl borde-maximo" 
    if(texto.length === 7 && !isUpperCase(texto)) return size="text-base borde-maximo"
    if(texto.length === 8 && !isUpperCase(texto)) return size="text-base borde-maximo" 
    if(texto.length === 9 && !isUpperCase(texto)) return size="text-sm borde-maximo" 
    if(texto.length === 10 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
    if(texto.length >= 11 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
  } 
  
  if (fuente === "Suez%20One") {
    if(texto.length <= 5 && isUpperCase(texto)) return size="text-xl borde-maximo" 
    if(texto.length === 6 && isUpperCase(texto)) return size="text-base borde-maximo"
    if(texto.length === 7 && isUpperCase(texto)) return size="text-sm borde-maximo"
    if(texto.length === 8 && isUpperCase(texto)) return size="text-xs borde-maximo bottom-1"
    if(texto.length === 9 && isUpperCase(texto)) return size="text-xs borde-minimo bottom-1"
    if(texto.length === 10 && isUpperCase(texto)) return size="text-xs borde-minimo bottom-1"
    if(texto.length >= 11 && isUpperCase(texto)) return size="text-xs borde-minimo bottom-1"

    if(texto.length <= 6 && !isUpperCase(texto)) return size="text-xl borde-maximo" 
    if(texto.length === 7 && !isUpperCase(texto)) return size="text-base borde-maximo" 
    if(texto.length === 8 && !isUpperCase(texto)) return size="text-base borde-maximo"
    if(texto.length === 9 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
    if(texto.length === 10 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
    if(texto.length >= 11 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
  }

  if (fuente === "Gochi%20Hand") {
    if(texto.length <= 5 && isUpperCase(texto)) return size="text-xl borde-maximo" 
    if(texto.length === 6 && isUpperCase(texto)) return size="text-base borde-maximo"
    if(texto.length === 7 && isUpperCase(texto)) return size="text-sm borde-maximo"
    if(texto.length === 8 && isUpperCase(texto)) return size="text-xs borde-maximo bottom-1"
    if(texto.length === 9 && isUpperCase(texto)) return size="text-xs borde-minimo bottom-1"
    if(texto.length === 10 && isUpperCase(texto)) return size="text-xs borde-minimo bottom-1"
    if(texto.length >= 11 && isUpperCase(texto)) return size="text-xs borde-minimo bottom-1"

    if(texto.length <= 6 && !isUpperCase(texto)) return size="text-xl borde-maximo" 
    if(texto.length === 7 && !isUpperCase(texto)) return size="text-base borde-maximo" 
    if(texto.length === 8 && !isUpperCase(texto)) return size="text-base borde-maximo"
    if(texto.length === 9 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
    if(texto.length === 10 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
    if(texto.length >= 11 && !isUpperCase(texto)) return size="text-xs borde-minimo bottom-1" 
  }
}
