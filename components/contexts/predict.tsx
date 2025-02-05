'use client';

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface PredictContextType {
    predict: number | undefined;
    setPredict: Dispatch<SetStateAction<number | undefined>>;
}

export const PredictContext = createContext<PredictContextType>({
    predict: undefined,
    setPredict: () => {}
});

export default function PredictProvider({children}: {children: React.ReactNode}) {
    const [predict, setPredict] = useState<number | undefined>(undefined);
   return (
    <PredictContext.Provider value={{predict, setPredict}}>
        {children}
    </PredictContext.Provider>
   ) ;
};
