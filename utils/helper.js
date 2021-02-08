import axios from 'axios'
import firebase from '../firebase/firebase'

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

//Guardar imagen en Cloudinary
export const subirACloudinary = async (e) => {
    // setPublicId("")
    // setProcesandoImagen(true);
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "petsgallery");
    // setCargando(true);


    return await axios.post("https://api.cloudinary.com/v1_1/petportrait/upload", formData)
      .then(respuesta => {
          return respuesta.data.asset_id
      })
      .catch(error => {
        console.log(error);
        // setProcesandoImagen(false);
      })

  };

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
export const descargarArte = (publicId, urlBackground, frame, texto) => {

  //url inicial
  const urlInicio = "https://res.cloudinary.com/petportrait/image/upload/"

  //separando el nombre del archivo de la mascota
  const nombreBaseMascota = publicId+".png"
  const letrasHastaPunto = nombreBaseMascota.lastIndexOf(".")
  const letrasUltimoSlashMascota = nombreBaseMascota.lastIndexOf("/")
  const nombreMascotaLimpio = nombreBaseMascota.substring(letrasUltimoSlashMascota+1, letrasHastaPunto)
  
  //transformaciones
  //transformacion para descargar el archivo
  const transformacionDescarga = `fl_attachment:${texto.textoMascota}`

  //transformacion del frame
  if(frame.colorFrame !== "none") {
    var transformacionFrame = `l_${urlBackground.idPublicoModificado},w_${frame.anchoFrame},bo_${frame.gruesoBordeFrame}px_solid_rgb:${valorColor(frame.colorFrame)},g_south,y_110`
  } else {
    var transformacionFrame = ""
  }
  // console.log(transformacionFrame)

  //transformacion de la imagen de la mascota
  const transformacionMascota = `l_petsgallery:${nombreMascotaLimpio},h_${"1070"},g_south,y_0,e_vectorize`

  //transformacion del texto
  const transformacionTexto = `l_text:${texto.fuente}_${calculoFuente(texto.textoMascota, texto.fuente)}_${calculoPesoFuente(texto.fuente)}_${texto.tieneBorde}:${reemplazarEspacios(texto.textoMascota)},bo_${calculoBordeFuente(texto.fuente)}px_solid_${texto.colorBorde},co_rgb:${valorColor(texto.colorTexto)},g_south,y_${texto.separacionTexto}`

  const transformaciones = transformacionFrame+"/"+transformacionMascota+"/"+transformacionTexto

  const urlCompleta = urlInicio+transformaciones+"/petsgallery/backs/"+urlBackground.archivoConExtension
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
      element.download = texto.textoMascota+".jpg";
      element.click();
    })
    .catch(error => {
      console.error(error);
    });

}

//funcion para obtener el hex del color
export const valorColor = (colorInput) => {
  let valor
  colores.map(color => {
    if(color.nombre === colorInput) {
      valor = color.valor
    }
  })
  return valor
}

export const calculoFuente = (texto, fuente) => {
  let size
  if(fuente === "Kanit") {
    if(texto.length <= 5){
      size = "300"
    }
    if(texto.length === 6 || texto.length === 7){
      size = "250"
    }
    if(texto.length >= 8) {
      size = "200"
    }
  }
  if(fuente === "Leckerli%20One") {
    if(texto.length <= 5){
      size = "300"
    }
    if(texto.length === 6 || texto.length === 7){
      size = "250"
    }
    if(texto.length >= 8) {
      size = "200"
    }
  }
  return size
}

export const reemplazarEspacios = (texto) => {
  const textoSinEspacios = texto.split(" ").join("%20")
  return textoSinEspacios
}

export const calculoBordeFuente = (fuente) => {
  let borde
  if(fuente === "Kanit") {
    borde = "30"
  }
  if(fuente === "Leckerli%20One") {
    borde = "15"
  }
  return borde
}

export const calculoPesoFuente = (fuente) => {
  let peso
  if(fuente === "Kanit") {
    peso = "bold"
  }
  if(fuente === "Leckerli%20One") {
    peso = "thin"
  }
  return peso
}

export const isUpperCase = (str) => {
  return str == str.toUpperCase() && str != str.toLowerCase();
}


export const calculoFuenteCotenedorImagen = (texto, fuente) => {

  let size
  if(fuente === "Kanit") {
    if(texto.length <= 6 && isUpperCase(texto)) {
      size = "text-7xl borde-maximo" 
    }
    if(texto.length === 7 && isUpperCase(texto)) {
      size = "text-6xl borde-maximo"
    }
    if(texto.length === 8 && isUpperCase(texto)) {
      size = "text-5xl borde-maximo"
    }
    if(texto.length === 9 && isUpperCase(texto)) {
      size = "text-5xl borde-maximo"
    }
    if(texto.length >= 10 && isUpperCase(texto)) {
      size = "text-4xl borde-minimo"
    }
    if(texto.length <= 6 && !isUpperCase(texto)) {
      size = "text-7xl borde-maximo" 
    }
    if(texto.length === 7 && !isUpperCase(texto)) {
      size = "text-6xl borde-maximo" 
    }
    if(texto.length === 8 && !isUpperCase(texto)) {
      size = "text-6xl borde-maximo" 
    }
    if(texto.length === 9 && !isUpperCase(texto)){
      size = "text-5xl borde-maximo" 
    }
    if(texto.length === 10 && !isUpperCase(texto)) {
      size = "text-5xl borde-minimo" 
    }
    if(texto.length >= 11 && !isUpperCase(texto)) {
      size = "text-4xl borde-minimo" 
    }
  } else {
    if(texto.length <= 5 && isUpperCase(texto)) {
      size = "text-7xl" 
    }
    if(texto.length === 6 && isUpperCase(texto)) {
      size = "text-6xl"
    }
    if(texto.length === 7 && isUpperCase(texto)) {
      size = "text-6xl"
    }
    if(texto.length === 8 && isUpperCase(texto)) {
      size = "text-5xl"
    }
    if(texto.length === 9 && isUpperCase(texto)) {
      size = "text-5xl"
    }
    if(texto.length >= 10 && isUpperCase(texto)) {
      size = "text-4xl"
    }
    if(texto.length <= 7) {
      size = "text-7xl" 
    }
    if(texto.length === 8) {
      size = "text-6xl" 
    }
    if(texto.length === 9) {
      size = "text-6xl" 
    }
    if(texto.length >= 10) {
      size = "text-5xl" 
    }
  }
  console.log(texto.length, size)
  return size
}
