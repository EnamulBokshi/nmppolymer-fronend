import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder, required = false }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={name} className="block text-gray-700 text-sm font-bold mb-2">
                    {label}
                </label>
            )}
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    );
};

export default Input;