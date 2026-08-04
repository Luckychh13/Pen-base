import React from 'react'
import Logo from '../Logo'

function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-gray-200 bg-gray-50 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap gap-10">
                    <div className="flex-1 min-w-50">
                        <Logo width="100px" />
                        <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-xs">
                            A place to write, share, and read stories that matter to you.
                        </p>
                    </div>

                    <div className="min-w-35">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Terms &amp; Conditions</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Licensing</a></li>
                        </ul>
                    </div>

                    <div className="min-w-35">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">
                            Connect
                        </h3>
                        <ul className="space-y-3">
                            <li><a href="mailto:hello@example.com" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Twitter</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">GitHub</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-400">
                        &copy; {currentYear} Penbase. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer