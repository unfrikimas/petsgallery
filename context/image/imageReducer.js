import React from 'react';
import {  
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
    ACTUALIZAR_RUTA_BACKGROUND,
    ACTUALIZAR_FRAME
} from '../../types';

const imageReducer = (state, action) => {
    switch(action.type) {
        case ACTUALIZAR_ID_PUBLICO_IMAGEN:
            return {
                ...state,
                public_Id: action.payload
            }
        case ACTUALIZAR_RUTA_BACKGROUND:
            return {
                ...state,
                rutaBackground: action.payload
            }
        case ACTUALIZAR_FRAME:
            return {
                ...state,
                tieneFrame: {
                    ...state.tieneFrame,
                    colorFrame: action.payload
                }
            }
        default:
            return state
    }
}
 
export default imageReducer;