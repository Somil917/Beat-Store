'use client'

import { Description } from "@radix-ui/react-dialog";
import React, { createContext, useState, useContext, useEffect } from "react";

interface FormProviderProps {
    children: React.ReactNode;
}

interface BeatInfo {
    title: string;
    key: string;
    bpm: number | null;
    description: string;
    tags: string[];
    genres: string[]; 
    coverArt: File | null
}

interface Files {
    mp3?: File | null;
    wav?: File | null;
    zip?: File | null;
}

interface FormData {
    files: Files;
    beatinfo: BeatInfo;
    metadata: Record<string, unknown>;
    pricing: Record<string, unknown>;
}



const defaultFormData:  FormData = {

    files: {
        mp3: null,
        wav: null,
        zip: null,
    },
    beatinfo: {
        title: "",
        key: "",
        bpm: null,
        description: "",
        tags: [],
        genres: [],
        coverArt: null,
    },
    metadata: {},
    pricing: {},
};

// Define the type for the form data and the update function
interface FormContextProps {
    formData: FormData;
    updateFormData: (step: keyof FormData, data: object) => void;
}

// Create the context with initial value as `undefined`
export const FormContext = createContext<FormContextProps | undefined>(undefined);

// Custom hook to use the FormContext and throw an error if used outside the provider
export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window !== 'undefined'){
            const savedFormData = localStorage.getItem('formData');
            return savedFormData ? JSON.parse(savedFormData) : defaultFormData;
        }
        return defaultFormData
    });

    useEffect(() => {
        
        const { files, ...dataWithoutFiles } = formData;
        localStorage.setItem('formData', JSON.stringify(dataWithoutFiles))
      }, [formData]);

    const updateFormData = <T extends keyof FormData>(step: T, data: FormData[T]) => {
        setFormData((prevFormData) => ({ ...prevFormData, [step]: data }));
    };


    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};
