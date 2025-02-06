'use client';

import Img from "next/image";
import { useContext, useEffect, useState } from "react";
import pica from "pica";
import { PredictContext } from "./contexts/predict";

export default function ImageUpload() {
    const [file, setFile] = useState<string | undefined>(undefined);
    const [imageArray, setImageArray] = useState<Uint8Array | null>(null);
    const picaInstance = pica();
    const {setPredict} = useContext(PredictContext);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length != 0) {
            const file = e.target.files?.[0];
            setFile(URL.createObjectURL(file));
            const reader = new FileReader();
            reader.readAsArrayBuffer(file); // Read file as binary

            const targetWidth = 28;  // Desired resized width
            const targetHeight = 28; // Desired resized height

            reader.onload = () => {
                            const img = new Image();
            img.src = URL.createObjectURL(file) ;
            img.crossOrigin = "Anonymous"; // Prevent CORS issues

            img.onload = async () => {
                // Create source and destination canvases
                const srcCanvas = document.createElement("canvas");
                srcCanvas.width = img.width;
                srcCanvas.height = img.height;
                const srcCtx = srcCanvas.getContext("2d");
                srcCtx?.drawImage(img, 0, 0);

                const destCanvas = document.createElement("canvas");
                destCanvas.width = targetWidth;
                destCanvas.height = targetHeight;

                // Use Pica.js for Lanczos resampling
                await picaInstance.resize(srcCanvas, destCanvas);

                const ctx = destCanvas.getContext("2d");
                if (ctx) {
                    const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
                    const pixelArray = imageData.data;

                    // Convert to grayscale
                    const grayArray = new Uint8Array(targetWidth * targetHeight);
                    for (let i = 0; i < pixelArray.length; i += 4) {
                        const r = pixelArray[i];
                        const g = pixelArray[i + 1];
                        const b = pixelArray[i + 2];

                        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
                        grayArray[i / 4] = gray;
                    }
                        // setGrayData({ width: targetWidth, height: targetHeight, array: grayArray });
                        setImageArray(grayArray)
                        // console.log("Resized Grayscale Array:", grayArray);
                    }
                }; 
            };

            reader.onerror = () => {
                console.error("Error reading file.");
            }; 
        }
        else {
            return
        }
    }

    const getPredict= async(e: any) => {
        e.preventDefault();
        const res = await fetch('api/py/testimg', {
            method: "POST",
            body: JSON.stringify({
                array: Array.from(imageArray || [])
            }),
            headers: {
                'Content-Type': 'application/json',
        },
        });
        if (res.ok) {
            const resData = await res.json();
            setPredict(resData.predict)
        }
    }

   return (
        <div className="flex flex-col gap-y-1">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <div className="flex flex-col justify-center items-center gap-y-2">
                {file &&
                <>
                    <div className="w-[500px] relative flex flex-col justify-center items-center
                    max-md:w-[300px]">
                        <Img
                            src={file}
                            layout="intrinsic"
                            alt="test image"
                            objectFit="contain"
                            width={500}
                            height={0}
                            // style={{ width: "auto", height: "auto" }}
                        />
                    </div>
                    <button className="text-2xl font-bold border-2 border-foreground px-4 py-2 rounded-lg hover:bg-gray-800"
                        onClick={getPredict}>
                        Predict
                    </button>
                </>
                }
                {!file &&
                    <div className="block w-[500px] h-[500px] max-md:w-[300px] max-md:h-[300px] bg-transparent"></div>
                }
            </div>
        </div>
   );
};