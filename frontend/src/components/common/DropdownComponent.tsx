import React from "react";

type DropdownOption = {
    value: string;
    label: string;
};

type DropdownFieldProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: DropdownOption[];
    placeholder?: string;
    required?: boolean;
};

function DropdownComponent({
    label,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    required = false,
}:DropdownFieldProps){
    return(
        <>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
                {label} 
                {required && (
                    <span className="text-rose-500"> *</span>
                )}
            </label>
            <select
                className="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition appearance-none cursor-pointer"
                onChange={onChange}
                value={value}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map((option)=>(
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </>
    );
}

export default DropdownComponent;