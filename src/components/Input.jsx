import React, { useId, forwardRef } from "react"

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()

    return (
        <div className="w-full mb-1">
            {label && (
                <label className="block mb-1.5 text-sm font-medium text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                ref={ref}
                id={id}
                className={`w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-150 ${className}`}
                {...props}
            />
        </div>
    )
})

Input.displayName = "Input"
export default Input