import React from "react";
import Link from 'next/link'
import {useRouter} from 'next/router'
import IconEditar from '../icons/Edit'
import IconDelete from '../icons/Delete'

const Arte = ({url, id}) => {

  const router = useRouter()

  return (
    <li className="w-full">
      <div className="flex items-center justify-center space-x-8 bg-white p-5">
        <Link href={`/download/${id}`}>
          <a className="w-48 h-48 sombra rounded-2xl border-2 border-gray-800 overflow-hidden">
            <img src={url} />
          </a>
        </Link>
        <div className="flex justify-center flex-col items-center space-y-4">
          <Link href={`/download/${id}`}>
            <a className="flex items-center justify-center text-xs text-gray-800 bg-green-100 rounded-2xl font-normal p-2 border border-gray-800 sombrauno">
              <IconEditar width={30} height={30} stroke={"#1f2937"} />
            </a>
          </Link>
          <button className="flex items-center justify-center text-xs text-gray-800 bg-red-100 rounded-2xl font-normal p-2 border border-gray-800 sombrauno">
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
