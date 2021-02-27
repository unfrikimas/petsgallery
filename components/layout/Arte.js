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
        <Link href={`/download/${id}`} passHref>
          <a className="w-48 h-48 sombra rounded-2xl border-2 border-gray-800 overflow-hidden">
            <img src={url} />
          </a>
        </Link>
        <div className="flex justify-center flex-col items-center space-y-4">
          <Link href={`/download/${id}`} passHref>
            <a 
              className="flex items-center justify-center text-xs text-gray-800 bg-green-100 rounded-2xl font-normal p-2 border border-gray-800 sombrauno">
              <IconEditar width={30} height={30} stroke={"#1f2937"} />
            </a>
          </Link>
          <button
            // onClick={() => handleClick(id)} 
            onClick={() => setAlerta(true)}
            className="flex items-center justify-center text-xs text-gray-800 bg-red-100 rounded-2xl font-normal p-2 border border-gray-800 sombrauno">
            <IconDelete width={30} height={30} stroke={"#1f2937"} />
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
