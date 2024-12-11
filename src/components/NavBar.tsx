import { Github, Calendar } from "lucide-react";

export function Navbar() {
    return (
        <nav className="flex items-center justify-between px-4 py-2 mb-2 shadow-md">
            <div className="w-1/3">
            </div>
            <div className="flex items-center justify-center w-1/3 p-2">
                <Calendar className="w-10 h-6 rounded-full" />
            </div>
            <div className="flex justify-end w-1/3">
                <a
                    href="https://github.com/TheGhossst"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                    <Github className="w-6 h-6" />
                </a>
            </div>
        </nav>
    );
}