export default function Button({
    children,
    type = "button",
    bgColor = "bg-indigo-600 hover:bg-indigo-700",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${bgColor} ${textColor} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}