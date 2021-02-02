import React from 'react';
import {  
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
} from '../../types';

const imageReducer = (state, action) => {
    switch(action.type) {
        case ACTUALIZAR_ID_PUBLICO_IMAGEN:
            return {
                ...state,
                public_Id: action.payload,
            }
        default:
            return state;
    }
}
 
export default imageReducer;