import React from 'react';
import firebase from '../../firebase/firebase'
import { subirACloudinaryEfectoTrim } from '../../utils/helper'

const webHook = (req, res) => {
    if (req.method === 'POST') {
        if(req.body) {
            subirACloudinaryEfectoTrim(req.body.public_id)
                .then(data => {
                    const imagenSinBackground = {
                        imagen_sin_background: {
                            asset_id: data.asset_id,
                            version: data.version,
                            public_id: data.public_id,
                            format: "png"
                        },
                        creado: data.timestamp || Date.now()
                    }
                    try {                
                        //insertar productos en la base de datos
                        const arteRef = firebase.db.collection('mascotas')
                        arteRef.add(imagenSinBackground)
                    } catch (error) {
                        console.log(error)    
                    }             
                })

            // const imagenSinBackground = {
            //     imagen_sin_background: {
            //         asset_id: req.body.asset_id,
            //         version: req.body.version,
            //         public_id: req.body.public_id,
            //         format: "png"
            //     },
            //     creado: req.body.timestamp ? req.body.timestamp : Date.now()
            // }
            
            // try {                
            //     //insertar productos en la base de datos
            //     const arteRef = firebase.db.collection('mascotas')
            //     await arteRef.add(imagenSinBackground)
            // } catch (error) {
            //     console.log(error)    
            // }
            
            console.log("desde webhook", req.body)
            return res.status(200).json({msg: "ok"});
        }
    }
}
 
export default webHook;