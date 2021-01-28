import React, { useEffect, useRef, useState } from 'react';

const CanvasDos = () => {

    const canvasRef = useRef();
    const [ ctx, setCtx ] = useState(null)
    const [ texto, setTexto ] = useState("")

    useEffect(() => {
        // canvas = document.getElementById('canvas');
        const context = canvasRef.current.getContext('2d'); //webgl, webgl2
        setCtx(context)
        // if( texto === "" ){
        //     setTexto('Please give me a message.');
        // }
        // drawRect();
        // drawEllipse();
        // drawRect();
    }, [])

    const drawRect = () => {

        ctx.beginPath();
        ctx.rect(100, 100, 100, 100); //x, y, width, height
        
        //define the stroke
        ctx.strokeStyle = `green`;
        ctx.lineWidth = 10;
        
        //define the fill
        ctx.fillStyle = `skyblue`;
        
        //fill and stroke
        ctx.fill();
        ctx.stroke();
        //ctx.fill();
        
        //draw a rect fill or stroke x, y, w, h
        // ctx.fillRect(200, 300, 100, 50);
        // ctx.strokeRect(100, 100, 100, 50);
        
        //delete a rect
        //ctx.clearRect(x, y, width, height)
        // ctx.clearRect(150, 50, 100, 500)
    }

    const drawEllipse = () => {
        ctx.beginPath();
        //ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlock);
        ctx.ellipse(200, 200, 60, 100, 0, 0, (Math.PI*2), false);

        //define the stroke
        ctx.strokeStyle = `blue`;
        ctx.lineWidth = 10;

        //define the fill
        ctx.fillStyle = `red`;

        ctx.fill();
        ctx.stroke();
        
        // ctx.beginPath();
        // //ctx.arc(x, y, radius, startAngle, endAngle, anticlock);
        // ctx.arc(100, 200, 50, 0, (Math.PI * 1.5), false);
        // ctx.fill();
        // ctx.stroke();
    }

    let oldTxt, f;

    const drawText = (e) => {
        // normal, italic, bold
        // px pt cm in rem em
        // any installed or imported font
        
        let fontFamily = 'Allerta Stencil';
        ctx.font = `bold 80px xyz, ${fontFamily}, Helvetica, Arial, monospace`;
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        //textAlign center, left, right, end, start
        ctx.textAlign = 'start';
        //textBaseline top, hanging, middle, bottom,ideographic, alphabetic
        ctx.textBaseline = 'alphabetic';
        //direction ltr, rtl, inherit
        ctx.direction = 'ltr';
        
        setTexto(e.target.value)
        let txt = document.getElementById('msg').value;
        let metrics = ctx.measureText(oldTxt);
        let w = metrics.width;
        ctx.clearRect(50, 110, w, -50);
        
        ctx.fillText(txt, 50, 100);
        ctx.strokeText(txt, 50, 100);
        oldTxt = txt;
        
        ctx.fillStyle = '#999';
        ctx.font = 'italic 20px Arial';
        let m = `Message is ${w}px wide`;
        ctx.clearRect(50, 310, 500, -30);
        ctx.fillText(m, 50, 300);
    }

    return (  
        <>
        <canvas
            ref={canvasRef}
            id="canvas"
            width={600}
            height={400}
        >
        </canvas>
        <input 
            id="msg"
            className="py-2 px-2 border border-gray-700"
            type="text"
            value={texto}
            onChange={e => drawText(e)}
        />
        <div>
            <button
                onClick={drawRect}
            >
                Pintar cuadro
            </button>
        </div>
        <div>
            <button
                onClick={drawEllipse}
            >
                Pintar elippse
            </button>
        </div>

        <style jsx>{`
            *{
                padding: 0;
                margin: 0;
                box-sizing: border-box;
            }
            #canvas{
                border: 2px solid #999;
                margin: 1rem auto;
                display: block; 
            }
        `}
        </style>        
        </>
    );
}


// /* default is inline */
//     /*            background-color: antiquewhite;*/
//         /*
//         CSS width and height will stretch the display
//         if you need to have pixel perfect positioning
//         inside the canvas then use JavaScript
//         width and height
//         */
//     /*
//         width: 200px;
//         height: 400px;
//     */

export default CanvasDos;