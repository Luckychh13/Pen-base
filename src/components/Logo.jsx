import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div style={{ width }} className="flex items-center gap-1 font-bold text-xl select-none">
            <span className="text-blue-600">Pen</span>
            <span className="text-gray-800">base</span>
        </div>
    )
}

export default Logo