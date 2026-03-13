import React from "react";
import ReactDOM from "react-dom";
import { JournalEntryModalProps } from "./Types";
import { X } from "lucide-react";

const ForJournalEntry: React.FC<JournalEntryModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-6xl",
}) => {

    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/30"
                onClick={onClose}
            />

            {/* Slide container */}
            <div className="absolute inset-y-0 right-0 flex max-w-6xl">

                {/* Panel */}
                <div
                    className={`w-screen ${width} bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h2 className="text-lg font-medium text-gray-800">
                            {title}
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-black text-xl"
                        >
                            <X style={{ width: 16, height: 16 }} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-12 h-[90%] overflow-y-auto">
                        {children}
                    </div>

                </div>
            </div>

        </div>,
        document.body
    );
};

export default ForJournalEntry;