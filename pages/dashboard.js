import React, { useContext, useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import HeaderUser from "../components/layout/HeaderUser"
import { FirebaseContext } from "../firebase"
import Arte from "../components/layout/Arte"

const Dashboard = () => {
  //context de firebase
  const { usuario, firebase } = useContext(FirebaseContext)

  const [artes, setArtes] = useState([])
  const [consultarDB, setConsultarDB] = useState(true)
  
  const router = useRouter()
  const ruta = router.pathname

  // const isRenderingOnServer = typeof window === 'undefined'

  const obtenerArtes = () => {
    try {   
      firebase.db.collection('artes')
        .where('creador.uid', '==', usuario.uid)
        .orderBy('creado', 'desc')
        .onSnapshot((querySnapshot) => {
          const items = []
          querySnapshot.forEach((doc) => {
            items.push({id: doc.id, ...doc.data()})
          })
          setConsultarDB(false)
          setArtes(items)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(usuario && consultarDB) {
      obtenerArtes()
    }
  }, [usuario, consultarDB])

  return (
    <div className="relative max-w-lg mx-auto">
      <HeaderUser
        titulo={"Art dashboard"}
        usuario={usuario}
        firebase={firebase}
      />

      {usuario && artes.length > 0 ?
        <div className="w-80 mx-auto py-4">
          <ul>
            {artes.map(arte => (
              <Arte
                key={arte.id}
                url={arte.url}
                id={arte.id}
                // handleClick={e => handleClick(e)}
              />
            ))}
          </ul>
        </div> 
      : usuario && artes.length === 0 ?
        <p className="w-80 mx-auto text-center py-16">
        There are no Arts.
        <Link href={'/createart/imageupload'} passHref>
          <a className="text-amarillo font-bold"> Upload image</a>
        </Link>
        </p>
        : !usuario ?
          <p className="w-80 mx-auto text-center py-16">
            There is no user.
            <Link href={{pathname: '/login', query: {path: `${ruta}`} }} passHref>
              <a className="text-amarillo font-bold"> Sign up</a>
            </Link>
          </p>
          :
            <div className="z-10 w-80 h-80 bg-gray-200 animate-pulse mt-4 flex items-center justify-center mx-auto rounded-2xl">
            </div>
          }

    </div>
  );
};

export default Dashboard
