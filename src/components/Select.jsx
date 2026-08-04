import React, { useId } from 'react'

function Select({ options, label, className = "", ...props }, ref) {
    const id = useId()
    return (
        <div className="w-full mb-1">
            {label && (
                <label htmlFor={id} className="block mb-1.5 text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150 ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

Select.displayName = "Select"
export default React.forwardRef(Select)