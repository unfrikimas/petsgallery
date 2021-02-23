import React, { useContext } from "react"
import { useRouter } from "next/router"
import Link from "next/link";
import HeaderUser from "../components/layout/HeaderUser"
import { FirebaseContext } from "../firebase"
import useArtes from '../hooks/useArtes'
import Arte from "../components/layout/Arte"

const Dashboard = () => {
  //context de firebase
  const { usuario, firebase } = useContext(FirebaseContext)

  //Hook para obtener los artes
  const { artes } = useArtes('creado', usuario)
  
  const router = useRouter();
  const ruta = router.pathname

  // useEffect(() => {
  //   console.log({usuario})
  //     if(usuario === "null"){
  //       router.replace('/createart/imageupload')
  //     }
  // }, [usuario])

  return (
    <div className="relative max-w-lg mx-auto">
      <HeaderUser
        titulo={"Art dashboard"}
        usuario={usuario}
        firebase={firebase}
      />

      {usuario ?
        <div className="w-80 mx-auto py-4">
          <ul>
            {artes.map(arte => (
              <Arte
                key={arte.id}
                url={arte.url}
                id={arte.id}
              />
            ))}
          </ul>
        </div> 
      : 
        <p className="w-80 mx-auto text-center py-16">
          There is no user.
          <Link href={{pathname: '/login', query: {path: `${ruta}`} }} passHref>
            <a className="text-amarillo font-bold"> Sign up</a>
          </Link>
        </p>
      }

    </div>
  );
};

export default Dashboard
