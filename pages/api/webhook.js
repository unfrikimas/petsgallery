import firebase from '../../firebase/firebase'

const webHook = async (req, res) => {

    if (req.method === 'POST') {
        if(req.body) {         

            //.info_kind === 'cloudinary_ai'
             
            // const buscarAsset = (assetId) => {
            //     // console.log("assetid", assetId)
            //     return new Promise((resolve) => {
            //         const ref = firebase.db.collection("mascotas")
            //         ref
            //         .where('imagen_sin_background.asset_id', '==', assetId)
            //         .onSnapshot((querySnapshot) => {
            //             const pets = []
            //             querySnapshot.forEach((doc) => {
            //                 pets.push(doc.data())
            //             })
            //             resolve(pets[0])
            //             //setFreeCredit(freeCredit - 1) descontar de la base de datos.
            //         })
            //     })
            // }

            const imagenSinBackground = {
                imagen_sin_background: {
                    asset_id: req.body.asset_id,
                    version: req.body.version,
                    public_id: req.body.public_id,
                    format: "png"
                },
                creado: req.body.timestamp ? req.body.timestamp : Date.now()
            }

            try {
                const mascotaRef = firebase.db.collection('mascotas')
                mascotaRef.add(imagenSinBackground)
            } catch (error) {
                console.log(error)    
            }
            
            // buscarAsset(req.body.asset_id)
            //     .then((data) => {
            //         console.log({data})
            //         if(!data) {
            //             try {
            //                 const mascotaRef = firebase.db.collection('mascotas')
            //                 mascotaRef.add(imagenSinBackground)
            //             } catch (error) {
            //                 console.log(error)    
            //             }
            //         }
            //     })
            
        }
        console.log("desde webhook", req.body)
        return res.status(200).json({msg: "ok"});
    } else if (req.method === 'GET') {
        return res.status(200).json({msg: "ok"});   
    }
}
 
export default webHook;