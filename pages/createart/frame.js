import React, { useState, useContext, useEffect } from "react"
import HeaderUser from "../../components/layout/HeaderUser"
import imageContext from '../../context/image/imageContext'
import ContenedorImagen from "../../components/layout/ContenedorImagen"
import ContenedorFondos from '../../components/layout/ContenedorFondos'
import ContenedorFrames from '../../components/layout/ContenedorFrames'
import Paginacion from "../../components/layout/Paginacion"

const ElegirFrame = () => {

    //context de la imagen
    const ImageContext = useContext(imageContext)
    const { public_Id, rutaBackground, tieneFrame, guardarIdPublico, asignarBackground, asignarFrame } = ImageContext

    //states
    const [publicId, setPublicId] = useState(public_Id)
    const [urlBackground, setUrlBackground] = useState(rutaBackground)

    const [ frame, setFrame ] = useState({
        anchoFrame: 810,
        gruesoBordeFrame: 40,
        colorFrame: ""
    })

    useEffect(() => {
      const backgroundInicial = JSON.parse(window.localStorage.getItem('urlBackground'))
      setUrlBackground(backgroundInicial)
      asignarBackground(backgroundInicial)
      const idInicial = JSON.parse(window.localStorage.getItem('publicId'))
      setPublicId(idInicial)
      guardarIdPublico(idInicial)
      const frameInicial = JSON.parse(window.localStorage.getItem('frame'))
      setFrame(frameInicial)
      asignarFrame(frameInicial.colorFrame)
    }, [])

    useEffect(() => {
      const unsubscribe = window.localStorage.setItem('frame', JSON.stringify(frame))
      return unsubscribe
    },[frame])

    const handleFrame = (e) => {
        asignarFrame(e.target.value)
        setFrame({
            ...frame,
            colorFrame: e.target.value
        })
    }

    return (
    <>
      <div className="max-w-lg mx-auto">

        <HeaderUser 
            titulo={"Frame"}
        />

        <ContenedorImagen 
            background={urlBackground?.urlLocal || rutaBackground?.urlLocal}
            imagen={publicId}
            colorFrame={frame.colorFrame || tieneFrame.colorFrame}
        >
        </ContenedorImagen>

        <ContenedorFrames 
            handleFrame={e => handleFrame(e)}
            colorFrame={frame.colorFrame || tieneFrame.colorFrame}
        />

        {/* <div className="w-80 mx-auto mt-8">
          <label
            className="flex items-center justify-center border-2 border-gray-800 rounded-2xl text-xl font-bold text-gray-800 sombra focus:outline-none cursor-pointer"
          >
            <select
                className="appearance-none w-full px-4 py-2 rounded-2xl focus:outline-none"
                type="select" 
                name="frame" 
                value={frame.colorFrame}
                onChange={e => {
                    setFrame({
                        ...frame,
                        colorFrame: e.target.value
                    })
                    asignarFrame(e.target.value)
                }}
            >
                <option
                    className="" 
                    value="none"
                >None</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option
                    className="text-red-500"  
                    value="red"
                >Red</option>
                <option value="pink">Pink</option>
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
                <option value="indigo">Indigo</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
            </select>
          </label>
        </div> */}

        <Paginacion
          retroceder={"true"}
          rutaAnterior={"/createart/background"}
          adelantar={"true"}
          rutaSiguiente={"/createart/text"}
        />
      </div>
    </>
  );
};

export default ElegirFrame;