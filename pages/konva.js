import Konva from 'konva';
import { useEffect, useState } from 'react';
import { Stage, Layer, Rect, Circle } from 'react-konva';

const PruebaKonva = () => {

    const [ screenWidth, setScreenWidth ] = useState(null)
    const [ screenHeight, setScreenHeight ] = useState(null)

    useEffect(() => {
        setScreenWidth(window.innerWidth)
        setScreenHeight(window.innerHeight)
    }, [])

  return (
    // Stage - is a div wrapper
    // Layer - is an actual 2d canvas element, so you can have several layers inside the stage
    // Rect and Circle are not DOM elements. They are 2d shapes on canvas
    
    <Stage width={600} height={600}>
      <Layer>
        <Rect width={50} height={50} fill="red" />
        <Circle x={200} y={200} stroke="black" radius={50} />
      </Layer>
    </Stage>
  );
}

export default PruebaKonva;