import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
// import { useRouter } from "next/router"

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOWN: undefined,
}

function useAutenticacion() {

    const [ usuarioAutenticado, guardarUsuarioAutenticado ] = useState(USER_STATES.NOT_KNOWN);
    // const router = useRouter();

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(usuario => {
            if(usuario) {
                guardarUsuarioAutenticado(usuario);
            } else {
                guardarUsuarioAutenticado(USER_STATES.NOT_LOGGED);
            }
        });
        return () => unsuscribe();
    }, []);

    // useEffect(() => {
    //     usuarioAutenticado === USER_STATES.NOT_LOGGED && router.push("/iniciarsesion")
    // }, [usuarioAutenticado])

    return usuarioAutenticado;

}

export default useAutenticacion;
