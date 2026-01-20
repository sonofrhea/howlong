import React from "react";
import ReactDOM from "react-dom";

import { JournalEntryModalProps } from "./Types";



const ForJournalEntry: React.FC<JournalEntryModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-4xl",
}) => {
    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/29"
                onClick={onClose}
            />

            {/* Modal box */}
            <div className={`relative bg-white rounded-2xl shadow-xl w-full ${width} mx-4`}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h2 className="text-lg font-medium text-gray-800">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-black text-xl"
                    >
                        x
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[80vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ForJournalEntry;