'use client';
import Predict from "../contexts/predict";

export default function PredictProvider({children}: {children: React.ReactNode}) {
    return (
        <Predict>
            {children}
        </Predict>
    );
};
