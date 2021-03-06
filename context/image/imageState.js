import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';
import {  
    ACTUALIZAR_USUARIO_LOGUEADO,
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
    ACTUALIZAR_RUTA_BACKGROUND,
    ACTUALIZAR_FILTRO,
    ACTUALIZAR_FRAME,
    ACTUALIZAR_NOMBRE_MASCOTA,
    ACTUALIZAR_FUENTE,
    ACTUALIZAR_POSICION_TEXTO,
    ACTUALIZAR_COLOR_FUENTE,
    ACTUALIZAR_COLOR_BORDE_FUENTE,
    ACTUALIZAR_FREE_CREDITS
} from '../../types';

const imageState = ({children}) => {

    const initialState = {
        usuarioLogueado: false,
        creditos: 1,
        public_Id: {
            publicid: "",
            format: ""
        },
        secureUrl: "",
        rutaBackground: {
            nombre: "rayos",
            urlLocal: "https://res.cloudinary.com/petportrait/image/upload/v1614663001/petsgallery/backs/fondos_pets-06_hjgnzg.jpg",
            archivoConExtension: "fondos_pets-06_hjgnzg.jpg",
            archivoSinExtension: "fondos_pets-06_hjgnzg",
            idPublico: "petsgallery/backs/fondos_pets-06_hjgnzg",
            idPublicoModificado: "petsgallery:backs:fondos_pets-06_hjgnzg"
        },
        filtro: "none",
        tieneFrame: {
            anchoFrame: "730",
            gruesoBordeFrame: "40",
            colorFrame: "pink"
        },
        nombreMascota: {
            fuente: "Kanit",
            sizeFuente: "300",
            estiloFuente: "bold",
            tieneBorde: "stroke",
            textoMascota: "Your Pet",
            grosorBorde: "30",
            colorBorde: "white",
            colorTexto: "black",
            separacionTexto: "80",
            posicionTexto: "bottom"
        }
    }

    const [ state, dispatch ] = useReducer(imageReducer, initialState); 

    //actualiza si el usuario esta logueado
    const guardarUsuarioLogueado = (login) => {
        dispatch({
            type: ACTUALIZAR_USUARIO_LOGUEADO,
            payload: login
        })
    }

    //actualiza los creditos para remover background
    const asignarCredito = (credito) => {
        if(credito !== "") {
            dispatch({
                type: ACTUALIZAR_FREE_CREDITS,
                payload: credito
            })
        }
    }

    //actualiza id publico de imagen en el context
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

    //asignar el filtro al context
    const asignarFiltro = (filtro) => {
        if(filtro) {
            dispatch({
                type: ACTUALIZAR_FILTRO,
                payload: filtro
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

    //asignar posicion del texto al context
    const asignarPosicionTexto = (posicion) => {
        if(posicion) {
            dispatch({
                type: ACTUALIZAR_POSICION_TEXTO,
                payload: posicion
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
                usuarioLogueado: state.usuarioLogueado,
                creditos: state.creditos,
                public_Id: state.public_Id,
                secureUrl: state.secureUrl,
                rutaBackground: state.rutaBackground,
                filtro: state.filtro,
                tieneFrame: state.tieneFrame,
                nombreMascota: state.nombreMascota,
                guardarUsuarioLogueado,
                guardarIdPublico,
                asignarBackground,
                asignarFiltro,
                asignarFrame,
                asignarNombreMascota,
                asignarFuente,
                asignarPosicionTexto,
                asignarColorFuente,
                asignarColorBordeFuente,
                asignarCredito
            }}
        >
            {children}
        </imageContext.Provider>
    )
 
};

export default imageState;