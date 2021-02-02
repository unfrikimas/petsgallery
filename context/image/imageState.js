import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';
import {  
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
} from '../../types';

const imageState = ({children}) => {

    const initialState = {
        version: "",
        public_Id: "",
        secure_url: ""
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

    return (
        <imageContext.Provider
            value={{
                version: state.version,
                public_Id: state.public_Id,
                secureUrl: state.secureUrl,
                guardarIdPublico
            }}
        >
            {children}
        </imageContext.Provider>
    )
 
};

export default imageState;