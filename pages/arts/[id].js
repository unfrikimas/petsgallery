import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../../firebase";
import { useRouter } from "next/router";
import EditorArte from "../../components/layout/EditorArte";
import EsqueletonEditor from "../../components/layout/EsqueletonEditor";

const EditarArte = () => {
  //context de firebase
  const { firebase } = useContext(FirebaseContext);

  //states
  const [arte, setArte] = useState("")
  const [consultarDB, setConsultarDB] = useState(true)
  const [error, setError] = useState(false)

  const router = useRouter();
  const {
    query: { id },
  } = router;

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerArte = async () => {
        const arteQuery = await firebase.db.collection("artes").doc(id);
        const arteItem = await arteQuery.get();
        if (arteItem.exists) {
          return arteItem;
        }
      }
      obtenerArte()
        .then((arte) => {
            setArte(arte.data());
            setConsultarDB(false);
        })
        .catch(() => {
            setError(true);
            setConsultarDB(false);
        })
    }
  }, [id]);

  return (
    <>
      {arte ?
        <EditorArte 
            arte={arte}
        />
        :
        <div>
            {error && (
                <p className="w-80 mx-auto text-center py-16">
                    Art id does not exist!
                </p>
            )}
            {!error && (
                <EsqueletonEditor />
            )}
        </div>
      }
    </>
  );
};

export default EditarArte;
