import React, { useState, useEffect, useRef } from "react"

export const DOGS = {
    uno: "https://res.cloudinary.com/petportrait/image/upload/v1611472119/petsgallery/matf6gbxivrkba806njo.png"
  }
  
export const IMAGEN_VECTOR = {
    uno: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:15:despeckle:0.2:corners:100:detail:500/v1611472119/petsgallery/matf6gbxivrkba806njo.svg",
    dos: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:20:corners:100:detail:500/v1611487750/petsgallery/l8j7xxbytezemay2nwaj.svg",
    tres: "https://res.cloudinary.com/petportrait/image/upload/e_vectorize:paths:90:colors:20:corners:100:detail:500/v1611572779/petsgallery/q5ozredkqtexl6ldx5d3.png"
}
  

const CatMeme = () => {

  const [image, setImage] = useState(null)
  const canvas = useRef(null)
  const [topText, setTopText] = useState('')
  const [bottomText, setBottomText] = useState('')
  const [ heightCanvas, setHeightCanvas ] = useState('')

  useEffect(() => {
    const catImage = new Image();
    catImage.src = IMAGEN_VECTOR.tres
    catImage.onload = () => setImage(catImage)
  }, [])

  useEffect(() => {
    if(image && canvas) {
      const ctx = canvas.current.getContext("2d")
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, 400, 400)

      let w = 400;
      let nw = image.naturalWidth;   //1350
      let nh = image.naturalHeight;  //900
      let aspect = nw / nh;
      let h = w / aspect;
      console.log('canvas width', w)
      console.log('height', h)
      setHeightCanvas(h);
      ctx.drawImage(image, 0, 0, w, h);

    //   ctx.drawImage(image, 0, 0, 400, 400)

      ctx.font = "20px Comic Sans MS"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"

      ctx.fillText(topText, (400 / 2), 25)
      ctx.fillText(bottomText, (400 / 2), 256 + 40 + 25)

    }
  }, [image, canvas, topText, bottomText, heightCanvas])

  return (
    <div>
      <h1>My pet</h1>

      <div>
        <canvas 
          ref={canvas}
          width={400}
          height={heightCanvas}
        />
      </div>

      <div>
        <input type="text"
          value={topText}
          onChange={e => setTopText(e.target.value)}
        />
        <br />
        <input type="text"
          value={bottomText}
          onChange={e => setBottomText(e.target.value)}
        />
      </div>

    </div>
  )
}

export default CatMeme