'use client';

import { useContext } from "react";
import { PredictContext } from "./contexts/predict";

export default function Predict() {
    const {predict, setPredict} = useContext(PredictContext);

   return (
    <>
        {predict != undefined &&
            <div className="absolute top-0 left-0 z-20 bg-gray-400 flex justify-center items-center
                h-full w-full bg-opacity-50" onClick={(e: any) => {
                        e.stopPropagation()
                        setPredict(undefined);
                    }}>
                <div className="text-center w-56 h-32 rounded-lg border-2 border-white flex flex-col justify-start
                    items-center relative bg-[#0a0a0a]" onClick={(e: any) => {
                        e.stopPropagation()
                    }}>
                        <div className="text-xl font-bold mb-6">
                            Your predict is
                        </div>
                        <div className="text-xl">
                            {predict}
                        </div>
                        <button className="absolute top-0 right-0 px-2" 
                        onClick={(e: any) => {setPredict(undefined)}}>
                            x
                        </button>
                </div>
            </div>
        }
    </>
   );
};
