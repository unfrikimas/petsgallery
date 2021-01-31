import React from 'react';
import {  
    ACTUALIZAR_URL_IMAGEN,
} from '../../types';

const imageReducer = (state, action) => {
    switch(action.type) {
        case ACTUALIZAR_URL_IMAGEN:
            return {
                ...state,
                version: action.payload.version,
                public_Id: action.payload.public_id,
                secureUrl: action.payload.secure_url
            }
        default:
            return state;
    }
}
 
export default imageReducer;