import React from 'react';
import firebase from '../../firebase/firebase'

const webHook = async (req, res) => {

    if (req.method === 'POST') {
        if(req.body) {
            const imagenSinBackground = {
                imagen_sin_background: {
                    asset_id: req.body.asset_id,
                    version: req.body.version,
                    public_id: req.body.public_id
                },
                creado: req.body.timestamp ? req.body.timestamp : Date.now()
            }
            
            try {                
                //insertar productos en la base de datos
                const arteRef = firebase.db.collection('mascotas')
                await arteRef.add(imagenSinBackground)
            } catch (error) {
                console.log(error)    
            }
            
            console.log("desde servidor", req.body)
            return res.status(200).json({msg: "ok"});
        }
    }
}
 
export default webHook;