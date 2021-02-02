import axios from 'axios'
import firebase from '../firebase/firebase'

export default function recibirData(data) {
    console.log("desde recibir data", data)
}

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
        // obtenerImagenMascota(respuesta.data.asset_id)
        
        
        // setPublicId(respuesta.data.public_id)
        
        // //separando el nombre del archivo de las mascota
        // const letrasHastaPunto = respuesta.data.secure_url.lastIndexOf(".")
        // const letrasUltimoSlashMascota = respuesta.data.secure_url.lastIndexOf("/")
        // const nombreArchivoMascotaLimpio = respuesta.data.secure_url.substring(letrasUltimoSlashMascota+1, letrasHastaPunto)
        // console.log(nombreArchivoMascotaLimpio)
        // setNombreArchivoMascota(nombreArchivoMascotaLimpio)
        
        // const letrasArchivoCargado = respuesta.data.secure_url.lastIndexOf(".")
        // const cadenaArchivoCambiado = respuesta.data.secure_url.substring(0, letrasArchivoCargado+1)
        // console.log(cadenaArchivoCambiado+"png")
        // setUrlImagenMascota(cadenaArchivoCambiado+"png");
        // setCargando(false);
        

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
            // setMascotas(pets[0]);
            // setPublicId(pets[0]?.imagen_sin_background.public_id)
            // console.log("desde fn ei", pets[0])
            return pets[0]
        });
    
}