import React, {useState, useContext} from "react"
import { FirebaseContext } from "../../firebase"
import Link from 'next/link'
import IconEditar from '../icons/Edit'
import IconDelete from '../icons/Delete'
import ModalAlerta from '../layout/Alerta'

const Arte = ({url, id}) => {

  //context de firebase
  const { firebase } = useContext(FirebaseContext)
  const [alerta, setAlerta] = useState(false)

  const handleClose = e => {
    setAlerta(e)
  }

  const handleDelete = e => {
    deleteArte(e)
    setAlerta(false)
  }

  const deleteArte = (id) => {
    firebase.db.collection('artes')
      .doc(id)
      .delete()
      .catch((error) => {
        console.error(error);
      })
  }

  return (
    <li className="w-full">

      {alerta && 
        <ModalAlerta 
          id={id}
          handleClose={e => handleClose(e)}
          handleDelete={e => handleDelete(e)}
        />
      }

      <div className="flex items-center justify-center space-x-8 bg-white p-5">
        <Link href={`/arts/${id}`} passHref>
          <a className="relative w-48 h-48 overflow-hidden">
            <div className="absolute top-2 right-2">
              <div
                className="flex items-center justify-center text-xs text-gray-800 bg-white bg-opacity-50 rounded-lg font-normal p-1 border border-gray-800 sombrauno">
                <IconEditar width={20} height={20} stroke={"#1f2937"} />
              </div>
            </div>
            <img src={url} />
          </a>
        </Link>
        <div className="flex justify-center flex-col items-center space-y-4">
          <button
            onClick={() => setAlerta(true)}
            className="flex items-center justify-center text-xs text-gray-800 bg-red-100 rounded-xl font-normal p-2 border border-red-800 sombrauno">
            <IconDelete className="text-red-800" width={25} height={25} stroke={"currentColor"} />
          </button>
        </div>
      </div>
      <style jsx>
        {`
          .sombra {
            box-shadow: 0px 4px 0px #18191f;
          }
          .sombrauno {
            box-shadow: 0px 1px 0px #18191f;
          }
        `}
      </style>
    </li>
  );
};

export default Arte;
