import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const url = 'https://konvajs.github.io/assets/yoda.jpg';
const urlLion = 'https://konvajs.github.io/assets/lion.png';

const LionImage = () => {
    const [image] = useImage(url);
    return <Image image={image} />;
};

export default function SimpleApp() {  

  return (
    <div className="max-w-xl mx-auto">
    <Stage width={900} height={900}>
    <Layer>
      <LionImage />
    </Layer>
    </Stage>
    </div>
  );

}

Promise.all([
  fetch('url'),
  fetch('url'),
  fetch('url')
]).then((data) => {
  data.forEach(request => {
    request.json
      .then((character) => {
        console.log({character})
      })
  })
})

Promise.all([
  fetch('url'),
  fetch('url'),
  fetch('url')
]).then((data) => {
    Promise.all(data.map(request => request.json()))
      .then(characters => {
        const names = characters.map(({name}) => name)
        console.log(names)
      })
    })

function myAsyncFunction() {
  return new Promise((resolve, reject) => {
    fetch('url')
      .then((data) => {
        if(data.status === 200) {
          resolve(data)
        } else {
          reject(data)
        }
      })
  })
}

myAsyncFunction(false)
  .then((data) => {
    console.log({data})
  })
  .catch((error) => {
    console.log(error.statusText)
  })

// useEffect(() => {
//   setLoading(true) 
//   let mounted = false // <- add variable
//   // Get position list
//   db.collection('lists').doc('positions').get()
//       .then( res => {
//           let data = JSON.stringify(res.data())
//           data = JSON.parse(data)
//           if(!mounted){ // <- check is it false
//               setPositionsList(data.list)
//               setLoading(false)
//           }
//       })
//   return () => {
//       mounted = true // <- change to true 
//   }
// }, [])

// function ComplexApp() {
//   // set crossOrigin of image as second argument
//   const [image, status] = useImage(url, 'Anonymous');

//   // status can be "loading", "loaded" or "failed"

//   return (
//     <Image image={image} />
//   );
// }



{/* <div
className="z-1 shadow-md relative flex justify-center -top-12 -left-6 w-20 h-20 overflow-hidden bg-cover"
style={{ backgroundImage: `url(${background})` }}
>
{colorFrame === "white" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-white"></div>
)}
{colorFrame === "black" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-black"></div>
)}
{colorFrame === "red" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-red-600"></div>
)}
{colorFrame === "pink" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-pink-600"></div>
)}
{colorFrame === "yellow" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-yellow-500"></div>
)}
{colorFrame === "blue" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-blue-600"></div>
)}
{colorFrame === "indigo" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-indigo-600"></div>
)}
{colorFrame === "purple" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-purple-600"></div>
)}
{colorFrame === "green" && (
  <div className="z-1 absolute bottom-2 medida-frame bg-transparent border-3 border-green-600"></div>
)}

{imagen.publicid && imagen.format === "png" ?
  <Image
    className="z-10"
    cloudName="petportrait" 
    secure="true"
    publicId={imagen.publicid}
    dpr="auto"
    width="auto"
    >
    {filtro === "vectorize" && <Transformation effect="vectorize" />}
    <Transformation effect="trim:10" />
    {filtro === "grayscale" && <Transformation effect="grayscale" />}
    <Transformation effect="sharpen" />
    <Transformation width="360" height="360" crop="fit" />
  </Image>
:
  <Image 
    className={`z-10`}
    cloudName="petportrait" 
    secure="true"
    publicId={imagen.publicid}
    dpr="auto"
    width="auto"
    >
    {filtro === "vectorize" && <Transformation effect="vectorize" />}
    {/* <Transformation effect="trim:10" /> */}
//     {filtro === "grayscale" && <Transformation effect="grayscale" />}
//     <Transformation effect="sharpen" />
//     <Transformation width="360" height="360" crop="fill" />
//   </Image>
// }

// {nombreMascota.textoMascota && nombreMascota.fuente === "Kanit" && (
//   <p
//     className={`z-20 absolute bottom-0 leading-2 font-extrabold text-center ${
//       nombreMascota.colorTexto === "white" &&
//       "text-white borde-negro"
//     } ${nombreMascota.colorTexto === "black" && "text-black"} ${
//       nombreMascota.colorTexto === "red" && "text-red-600"
//     } ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${
//       nombreMascota.colorTexto === "yellow" && "text-yellow-500"
//     } ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${
//       nombreMascota.colorTexto === "indigo" && "text-indigo-600"
//     } ${
//       nombreMascota.colorTexto === "purple" && "text-purple-600"
//     } ${
//       nombreMascota.colorTexto === "green" && "text-green-600"
//     } fuente_kanit ${calculoFuenteCotenedorProductos(
//       nombreMascota.textoMascota,
//       nombreMascota.fuente
//     )}`}
//   >
//     {nombreMascota.textoMascota}
//   </p>
// )}

// {nombreMascota.textoMascota &&
//   nombreMascota.fuente === "Suez%20One" && (
//     <p
//       className={`z-20 absolute leading-2 bottom-0 tracking-wider text-center ${
//         nombreMascota.colorTexto === "white" &&
//         "text-white borde-negro"
//       } ${nombreMascota.colorTexto === "black" && "text-black"} ${
//         nombreMascota.colorTexto === "red" && "text-red-600"
//       } ${nombreMascota.colorTexto === "pink" && "text-pink-600"} ${
//         nombreMascota.colorTexto === "yellow" && "text-yellow-500"
//       } ${nombreMascota.colorTexto === "blue" && "text-blue-600"} ${
//         nombreMascota.colorTexto === "indigo" && "text-indigo-600"
//       } ${
//         nombreMascota.colorTexto === "purple" && "text-purple-600"
//       } ${
//         nombreMascota.colorTexto === "green" && "text-green-600"
//       } fuente_Suez ${calculoFuenteCotenedorProductos(
//         nombreMascota.textoMascota,
//         nombreMascota.fuente
//       )}`}
//     >
//       {nombreMascota.textoMascota}
//     </p>
//   )}
// </div> */}