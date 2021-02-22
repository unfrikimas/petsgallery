import React, { useState, useContext, useEffect } from "react"
import { useRouter } from "next/router"
import Link from "next/link";
import HeaderUser from "../components/layout/HeaderUser"
import { FirebaseContext } from "../firebase"
import useArtes from '../hooks/useArtes'
import imageContext from "../context/image/imageContext"
import Arte from "../components/layout/Arte"

const Dashboard = () => {
  //context de firebase
  const { usuario, firebase } = useContext(FirebaseContext)

  const { artes } = useArtes('creado', usuario)

  const ImageContext = useContext(imageContext)
  const { guardarIdPublico } = ImageContext

  const router = useRouter();

  return (
    <div className="relative max-w-lg mx-auto">
      <HeaderUser
        titulo={"Art dashboard"}
        usuario={usuario}
        firebase={firebase}
      />

      <div className="w-80 mx-auto py-8">
        <ul>
          {artes.map(arte => (
            <Arte
              key={arte.id}
              data={arte}
            />
          ))}
        </ul>
      </div>

    </div>
  );
};

export default Dashboard
