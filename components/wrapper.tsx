"use client";

import { useState } from "react";
import ImageUpload from "./image-upload";
import WhiteBord from "./white-bord";

export default function Wrapper() {
    const [mode, setMode] = useState(false);

   return (
    <div className="flex flex-col justify-center items-center">
        <div className="flex justify-center gap-x-2 mb-4">
            <button className={`w-56 ${!mode? "border border-white px-4 py-2 rounded-md bg-transparent": ""}`}
            onClick={(e: any) => {
                e.preventDefault();
                setMode(false);
            }}>
                Image</button>
            <button className={`w-56 ${mode? "border border-white px-4 py-2 rounded-md bg-transparent": ""}`}
            onClick={(e: any) => {
                e.preventDefault();
                setMode(true);
            }}>
                Drawing</button>
        </div>
        {!mode &&
            <ImageUpload />
        }
        {mode &&
            <WhiteBord />
        }
    </div>
   );
};
