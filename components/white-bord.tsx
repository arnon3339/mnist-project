'use client';

import React, { useRef, useState, useEffect, useContext } from "react";
import pica from "pica";
import { PredictContext } from "./contexts/predict";

export default function WhiteBord() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 500, height: 500 });
    const [canvasLineWidth, setCanvasLineWidth] = useState(50);
    // const [predict, setPredict] = useState<number | undefined>(undefined);
    const {setPredict} = useContext(PredictContext);
    const picaInstance = pica();

    // Function to update the canvas size based on window width
    const updateCanvasSize = () => {
        if (window.innerWidth <= 768) {
            setCanvasSize({ width: 300, height: 300 });
            setCanvasLineWidth(25);
        } else {
            setCanvasSize({ width: 500, height: 500 });
            setCanvasLineWidth(50);
        }
    };

    const getPredict= async(e: any) => {
        e.preventDefault();
        
        if (canvasRef.current) {
            const targetWidth = 28;
            const targetHeight = 28;
            const srcCanvas = canvasRef.current;

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
                    grayArray[i / 4] = pixelArray[i + 3];
                }

                const res = await fetch('api/py/testimg', {
                    method: "POST",
                    body: JSON.stringify({
                        array: Array.from(grayArray|| [])
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                },
                });
                if (res.ok) {
                    const resData = await res.json();
                    setPredict(resData.predict)
                }
            }; 

        }
    }

    useEffect(() => {
        // Set initial canvas size
        updateCanvasSize();

        // Listen for window resize events
        window.addEventListener("resize", updateCanvasSize);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = "black";
            ctx.lineWidth = canvasLineWidth;
            ctxRef.current = ctx;
        }
    }, [canvasSize, canvasLineWidth]); // Re-initialize canvas when size changes

    // Start drawing when mouse is pressed
    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (!ctxRef.current) return;
        const { offsetX, offsetY } = getCoordinates(e);
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    // Draw when mouse moves
    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !ctxRef.current) return;
        const { offsetX, offsetY } = getCoordinates(e);
        ctxRef.current.lineTo(offsetX, offsetY);
        ctxRef.current.stroke();
    };

    // Stop drawing when mouse is released
    const stopDrawing = () => {
        if (!ctxRef.current) return;
        ctxRef.current.closePath();
        setIsDrawing(false);
    };

    // Get coordinates for mouse and touch events
    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { offsetX: 0, offsetY: 0 };

        let offsetX, offsetY;
        if ("touches" in e) {
            const rect = canvas.getBoundingClientRect();
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        } else {
            offsetX = e.nativeEvent.offsetX;
            offsetY = e.nativeEvent.offsetY;
        }
        return { offsetX, offsetY };
    };

    // Clear the canvas
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas || !ctxRef.current) return;
        ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">Brushing Board</h2>
            <canvas
                ref={canvasRef}
                className="border border-gray-400 cursor-crosshair bg-white"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                width={canvasSize.width}
                height={canvasSize.height}

            />
            <button
                onClick={clearCanvas}
                className="mt-3 px-4 py-2 bg-red-500 text-white rounded mb-4"
            >
                Clear Board
            </button>
            <button className="text-2xl font-bold border-2 border-foreground px-4 py-2 rounded-lg hover:bg-gray-800"
                onClick={getPredict}>
                Predict
            </button>
        </div>
    );
};