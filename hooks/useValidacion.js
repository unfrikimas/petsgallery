import React, { useState, useEffect } from 'react';

const useValidacion = (stateInicial, validar, fn) => {
    
    const [ valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitForm, guardarSubmitForm ] = useState(false);
    
    useEffect(() => {
        if(submitForm) {
            // console.log(Object.keys(errores).length);
            const noErrores = Object.keys(errores).length === 0;
            if(noErrores) {
                fn(); // funcion que se ejecuta en el componente
            };
            guardarSubmitForm(false);
        }
    }, [errores]);

    //Funcion que se ejecuta cuando el usuario escribe en un input
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        });
    };


    //Funcion que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();     
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    };

    //cuando el usuario se sale del input. Evento Blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);        
    }

    return {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBlur
    };
}
 
export default useValidacion;