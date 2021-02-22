import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../firebase'

const useArtes = (orden, usuario) => {

  const { firebase } = useContext(FirebaseContext)
  const [ artes, setArtes ] = useState([])
  
    useEffect(() => {
      if(usuario) {
        const obtenerArtes = () => {
          firebase.db.collection('artes')
            .where('creador.uid', '==', usuario.uid)
            .orderBy(orden, 'desc')
            .onSnapshot(manejarSnapshot)
        }
        obtenerArtes()
      }
    }, [usuario])
  
    function manejarSnapshot(snapshot) {
      const listadoArtes = snapshot.docs.map(doc => {
        return {
          ...doc.data()
        }
      })
      setArtes(listadoArtes)
    }  

    return {
      artes
    }
}
 
export default useArtes