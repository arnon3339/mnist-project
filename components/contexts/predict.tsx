'use client';

import { Dispatch, SetStateAction, createContext, useState } from "react";

interface PredictContextType {
    predict: number | undefined;
    setPredict: Dispatch<SetStateAction<number | undefined>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const PredictContext = createContext<PredictContextType>({
    predict: undefined,
    setPredict: () => {},
    loading: false,
    setLoading: () => {}
});

export default function PredictProvider({children}: {children: React.ReactNode}) {
    const [predict, setPredict] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
   return (
    <PredictContext.Provider value={{predict, setPredict, loading, setLoading}}>
        {children}
    </PredictContext.Provider>
   ) ;
};
