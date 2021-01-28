import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

const url = 'https://konvajs.github.io/assets/yoda.jpg';
const urlLion = 'https://konvajs.github.io/assets/lion.png';

const LionImage = () => {
    const [image] = useImage(url);
    return <Image image={image} />;
};

export default function SimpleApp() {  

  return (
    <div className="max-w-xl mx-auto">
    <Stage width={900} height={900}>
    <Layer>
      <LionImage />
    </Layer>
    </Stage>
    </div>
  );

}

// function ComplexApp() {
//   // set crossOrigin of image as second argument
//   const [image, status] = useImage(url, 'Anonymous');

//   // status can be "loading", "loaded" or "failed"

//   return (
//     <Image image={image} />
//   );
// }