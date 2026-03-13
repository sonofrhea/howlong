import React from "react";
import ReactDOM from "react-dom";
import { CustomerProfileModalProps } from "./Types";
import { X } from "lucide-react";



const ForCustomerProfile: React.FC<CustomerProfileModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    width = "max-w-4xl"
}) => {


    return ReactDOM.createPortal(
        <div>
            {`
                @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap");


                .section-title {
                    font-family: 'Montserrat', sans-serif;
                    font-size: clamp(1.9rem, 3.5vw, 2.8rem);
                    font-weight: 800; line-height: 1.1; letter-spacing: -0.02em;
                    color: var(--dark); margin-bottom: 1.2rem;
                }
            `}

            <div
                className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >

                <div
                    className="absolute inset-0 bg-black/30"
                    onClick={onClose}
                />

                <div className="absolute inset-y-0 right-0 flex max-w-4xl">

                    {/* Panel */}
                    <div
                        className={`w-screen ${width} bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
                            isOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <h2 className="section-title text-lg font-medium text-gray-800" style={{ fontFamily: 'Montserrat, system-ui' }}>
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
                
            </div>
        </div>,
        document.body
    );

};
export default ForCustomerProfile;
