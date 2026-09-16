import React from "react";

type TextAreaFields ={
    placeholder: string;
    value:string;
    label:string;
    onChange: (e:React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextareaComponent({
    label,
    value,
    onChange,
    placeholder,}:TextAreaFields){
    return(
        <>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">{label}</label>
            <textarea
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    )
}

export default TextareaComponent;