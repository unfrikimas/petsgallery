import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';
import {  
    ACTUALIZAR_URL_IMAGEN,
} from '../../types';

const imageState = ({children}) => {

    const initialState = {
        version: "",
        public_Id: "",
        secureUrl: ""
    }

    const [ state, dispatch ] = useReducer(imageReducer, initialState); 

    //actualiza redes sociales
    const guardarImagenContext = (datosImagen) => {
        if(datosImagen) {
            dispatch({
                type: ACTUALIZAR_URL_IMAGEN,
                payload: datosImagen
            })
        }
    }

    return (
        <imageContext.Provider
            value={{
                version: state.version,
                public_Id: state.public_Id,
                secureUrl: state.secureUrl,
                guardarImagenContext
            }}
        >
            {children}
        </imageContext.Provider>
    )
 
};

export default imageState;