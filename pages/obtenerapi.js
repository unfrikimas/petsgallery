import React, { useEffect, useState } from 'react';

const ObtenerApi = () => {

    const [ respuesta, setRespuesta ] = useState({})
    
    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('http://localhost:3000/api/webhook')
            .then(response => response.json())
            .then(data => setRespuesta(data));
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    });
    
    console.log("respuesta", respuesta)

    return (  
        <p className="w-full p-16 mx-auto">"Esperando..."</p>
    );
}
 
export default ObtenerApi;