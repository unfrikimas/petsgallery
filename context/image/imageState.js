import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';
import {  
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
    ACTUALIZAR_RUTA_BACKGROUND,
    ACTUALIZAR_FRAME,
    ACTUALIZAR_NOMBRE_MASCOTA,
    ACTUALIZAR_FUENTE,
    ACTUALIZAR_COLOR_FUENTE,
    ACTUALIZAR_COLOR_BORDE_FUENTE
} from '../../types';

const imageState = ({children}) => {

    const initialState = {
        public_Id: "",
        secureUrl: "",
        rutaBackground: "",
        tieneFrame: {
            anchoFrame: "730",
            gruesoBordeFrame: "40",
            colorFrame: "none"
        },
        nombreMascota: {
            fuente: "Kanit",
            sizeFuente: "300",
            estiloFuente: "bold",
            tieneBorde: "stroke",
            textoMascota: "",
            grosorBorde: "30",
            colorBorde: "white",
            colorTexto: "black",
            separacionTexto: "80"
        }
    }

    const [ state, dispatch ] = useReducer(imageReducer, initialState); 

    //actualiza redes sociales
    const guardarIdPublico = (idPublico) => {
        if(idPublico) {
            dispatch({
                type: ACTUALIZAR_ID_PUBLICO_IMAGEN,
                payload: idPublico
            })
        }
    }

    //asignar el background al context
    const asignarBackground = (objetoBackground) => {
        if(objetoBackground) {
            dispatch({
                type: ACTUALIZAR_RUTA_BACKGROUND,
                payload: objetoBackground
            })
        }
    }

    //asignar los datos del frame al context
    const asignarFrame = (colorFrame) => {
        if(colorFrame) {
            dispatch({
                type: ACTUALIZAR_FRAME,
                payload: colorFrame
            })
        }
    }    

    //asignar nombre de mascota al context
    const asignarNombreMascota = (nombre) => {
        if(nombre) {
            dispatch({
                type: ACTUALIZAR_NOMBRE_MASCOTA,
                payload: nombre
            })
        }
    }      

    //asignar tipo de fuente al context
    const asignarFuente = (fuente) => {
        if(fuente) {
            dispatch({
                type: ACTUALIZAR_FUENTE,
                payload: fuente
            })
        }
    }    

    //asignar tipo de fuente al context
    const asignarColorFuente = (colorFuente) => {
        if(colorFuente) {
            dispatch({
                type: ACTUALIZAR_COLOR_FUENTE,
                payload: colorFuente
            })
        }
    }    

    //asignar color del borde del texto al context
    const asignarColorBordeFuente = (colorBorde) => {
        if(colorBorde) {
            dispatch({
                type: ACTUALIZAR_COLOR_BORDE_FUENTE,
                payload: colorBorde
            })
        }
    }  

    return (
        <imageContext.Provider
            value={{
                public_Id: state.public_Id,
                secureUrl: state.secureUrl,
                rutaBackground: state.rutaBackground,
                tieneFrame: state.tieneFrame,
                nombreMascota: state.nombreMascota,
                guardarIdPublico,
                asignarBackground,
                asignarFrame,
                asignarNombreMascota,
                asignarFuente,
                asignarColorFuente,
                asignarColorBordeFuente
            }}
        >
            {children}
        </imageContext.Provider>
    )
 
};

export default imageState;