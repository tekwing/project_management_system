import React from "react";

type InputFieldProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    placeholder?: string; // Made optional
    type?: string;        // Added this line to fix the TS error
    required?: boolean;
}

function InputComponent({ 
    value, 
    onChange, 
    label, 
    placeholder, 
    type = "text"   ,      // Default to "text" if no type is provided
    required = false
}: InputFieldProps) {
    return (
        <>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                {label}
                {required && 
                <span className="text-rose-500">*</span>}
            </label>
            <input
                type={type}       // Passed the type prop here
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );
}

export default InputComponent;