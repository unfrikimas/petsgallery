import React, { useReducer } from 'react';
import imageContext from './imageContext';
import imageReducer from './imageReducer';
import {  
    ACTUALIZAR_ID_PUBLICO_IMAGEN,
    ACTUALIZAR_RUTA_BACKGROUND,
    ACTUALIZAR_FRAME
} from '../../types';

const imageState = ({children}) => {

    const initialState = {
        public_Id: "",
        secureUrl: "",
        rutaBackground: "",
        tieneFrame: {
            anchoFrame: 810,
            gruesoBordeFrame: 40,
            colorFrame: ""
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

    return (
        <imageContext.Provider
            value={{
                public_Id: state.public_Id,
                secureUrl: state.secureUrl,
                rutaBackground: state.rutaBackground,
                tieneFrame: state.tieneFrame,
                guardarIdPublico,
                asignarBackground,
                asignarFrame
            }}
        >
            {children}
        </imageContext.Provider>
    )
 
};

export default imageState;