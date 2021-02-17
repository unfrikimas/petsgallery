import React from 'react';
import {  
    ACTUALIZAR_USUARIO_LOGUEADO,
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
    ACTUALIZAR_RUTA_BACKGROUND,
    ACTUALIZAR_FILTRO,
    ACTUALIZAR_FRAME,
    ACTUALIZAR_NOMBRE_MASCOTA,
    ACTUALIZAR_FUENTE,
    ACTUALIZAR_COLOR_FUENTE,
    ACTUALIZAR_COLOR_BORDE_FUENTE,
    ACTUALIZAR_FREE_CREDITS
} from '../../types';

const imageReducer = (state, action) => {
    switch(action.type) {
        case ACTUALIZAR_USUARIO_LOGUEADO:
            return {
                ...state,
                usuarioLogueado: action.payload
            }
        case ACTUALIZAR_ID_PUBLICO_IMAGEN:
            return {
                ...state,
                public_Id: action.payload
            }
        case ACTUALIZAR_FREE_CREDITS:
            return {
                ...state,
                creditos: action.payload
            }
        case ACTUALIZAR_RUTA_BACKGROUND:
            return {
                ...state,
                rutaBackground: action.payload
            }
        case ACTUALIZAR_FILTRO:
            return {
                ...state,
                filtro: action.payload
            }
        case ACTUALIZAR_FRAME:
            return {
                ...state,
                tieneFrame: {
                    ...state.tieneFrame,
                    colorFrame: action.payload
                }
            }
        case ACTUALIZAR_NOMBRE_MASCOTA:
            return {
                ...state,
                nombreMascota: {
                    ...state.nombreMascota,
                    textoMascota: action.payload
                }
            }
        case ACTUALIZAR_FUENTE:
            return {
                ...state,
                nombreMascota: {
                    ...state.nombreMascota,
                    fuente: action.payload
                }
            }
        case ACTUALIZAR_COLOR_FUENTE:
            return {
                ...state,
                nombreMascota: {
                    ...state.nombreMascota,
                    colorTexto: action.payload
                }
            }
        case ACTUALIZAR_COLOR_BORDE_FUENTE:
            return {
                ...state,
                nombreMascota: {
                    ...state.nombreMascota,
                    colorBorde: action.payload
                }
            }
        default:
            return state
    }
}
 
export default imageReducer;