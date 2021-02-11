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
  const transformacionTexto = `l_text:${texto.fuente}_${calculoFuenteCloud(texto.textoMascota, texto.fuente)}_${calculoPesoFuente(texto.fuente)}_${texto.tieneBorde}:${reemplazarEspacios(texto.textoMascota)},bo_${calculoBordeFuente(texto.textoMascota, texto.fuente)}px_solid_${texto.colorBorde},co_rgb:${valorColor(texto.colorTexto)},g_south,y_${calculoDistanciaTextoCloud(texto.textoMascota, texto.fuente)}`

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
    if(texto.length >= 10  && isUpperCase(texto)) return size="120" 

    if(texto.length <= 4  && !isUpperCase(texto)) return size="300" 
    if(texto.length === 5  && !isUpperCase(texto)) return size="280" 
    if(texto.length === 6  && !isUpperCase(texto)) return size="240" 
    if(texto.length === 7  && !isUpperCase(texto)) return size="210" 
    if(texto.length === 8  && !isUpperCase(texto)) return size="180" 
    if(texto.length === 9  && !isUpperCase(texto)) return size="160" 
    if(texto.length === 10  && !isUpperCase(texto)) return size="140" 
    if(texto.length >= 10  && !isUpperCase(texto)) return size="120" 
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
    if(texto.length >= 10  && isUpperCase(texto)) return size="100" 

    if(texto.length <= 4  && !isUpperCase(texto)) return size="280" 
    if(texto.length === 5  && !isUpperCase(texto)) return size="260" 
    if(texto.length === 6  && !isUpperCase(texto)) return size="220" 
    if(texto.length === 7  && !isUpperCase(texto)) return size="190" 
    if(texto.length === 8  && !isUpperCase(texto)) return size="170" 
    if(texto.length === 9  && !isUpperCase(texto)) return size="150" 
    if(texto.length === 10  && !isUpperCase(texto)) return size="130" 
    if(texto.length >= 10  && !isUpperCase(texto)) return size="110" 

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
    if(texto.length >= 10  && isUpperCase(texto)) return distancia="110" 

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
    if(texto.length >= 10  && isUpperCase(texto)) return distancia="110" 

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
}

export const reemplazarEspacios = (texto) => {
  const textoSinEspacios = texto.split(" ").join("%20")
  return textoSinEspacios
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

}

export const calculoPesoFuente = (fuente) => {
  let peso
  if(fuente === "Kanit") {
    peso = "bold"
  }
  if(fuente === "Suez%20One") {
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
    if(texto.length <=5  && isUpperCase(texto)) return size="text-7xl borde-maximo bottom-5" 
    if(texto.length === 6 && isUpperCase(texto)) return size="text-6xl borde-maximo bottom-5" 
    if(texto.length === 7 && isUpperCase(texto)) return size="text-5xl borde-maximo bottom-5"
    if(texto.length === 8 && isUpperCase(texto)) return size="text-5xl borde-maximo bottom-5"
    if(texto.length === 9 && isUpperCase(texto)) return size="text-4xl borde-maximo bottom-5"
    if(texto.length >= 10 && isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5"

    console.log(texto.length, isUpperCase(texto), fuente)

    if(texto.length <= 6 && !isUpperCase(texto)) return size="text-7xl borde-maximo bottom-5" 
    if(texto.length === 7 && !isUpperCase(texto)) return size="text-6xl borde-maximo bottom-5"
    if(texto.length === 8 && !isUpperCase(texto)) return size="fuente-5 borde-maximo bottom-5" 
    if(texto.length === 9 && !isUpperCase(texto)) return size="fuente-5 borde-maximo bottom-5" 
    if(texto.length === 10 && !isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5" 
    if(texto.length >= 11 && !isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5" 
  } 
  
  if (fuente === "Suez%20One") {

    if(texto.length <= 4 && isUpperCase(texto)) return size="text-7xl borde-maximo bottom-4" 
    if(texto.length === 5 && isUpperCase(texto)) return size="text-6xl borde-maximo bottom-5" 
    if(texto.length === 6 && isUpperCase(texto)) return size="text-6xl borde-maximo bottom-5"
    if(texto.length === 7 && isUpperCase(texto)) return size="text-5xl borde-maximo bottom-5"
    if(texto.length === 8 && isUpperCase(texto)) return size="text-5xl borde-minimo bottom-5"
    if(texto.length === 9 && isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5"
    if(texto.length === 10 && isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5"
    if(texto.length >= 11 && isUpperCase(texto)) return size="text-3xl borde-minimo bottom-5"

    if(texto.length <= 5 && !isUpperCase(texto)) return size="text-7xl borde-maximo bottom-4" 
    if(texto.length === 6 && !isUpperCase(texto)) return size="text-6xl borde-maximo bottom-4" 
    if(texto.length === 7 && !isUpperCase(texto)) return size="text-6xl borde-maximo bottom-5" 
    if(texto.length === 8 && !isUpperCase(texto)) return size="text-5xl borde-minimo bottom-5"
    if(texto.length === 9 && !isUpperCase(texto)) return size="text-5xl borde-minimo bottom-5" 
    if(texto.length === 10 && !isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5" 
    if(texto.length >= 11 && !isUpperCase(texto)) return size="text-4xl borde-minimo bottom-5" 
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

}
