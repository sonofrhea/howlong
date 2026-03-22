import React, { useEffect, useRef } from 'react';
import { EInvoiceQRCodeProps } from './constants/Types';











const EInvoiceQRCode: React.FC<EInvoiceQRCodeProps> = ({
    validationUrl,
    lhdnUuid,
    documentReference,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!validationUrl || !canvasRef.current) return;

        import('qrcode').then((QRCode) => {
            QRCode.toCanvas(canvasRef.current!, validationUrl, {
                width: 160,
                margin: 2,
                color: {
                    dark: '#1f2937',
                    light: '#ffffff',
                },
            });
        }).catch(console.error);
    }, [validationUrl]);

    if (!validationUrl || !lhdnUuid) {
        return null;
    }










    return (
        <div className="flex flex-col items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-2xl w-fit">
            {/* QR Code Canvas */}
            <canvas ref={canvasRef} className="rounded-lg" />

            {/* Label */}
            <div className="text-center">
                <p className="text-xs font-medium text-gray-700">LHDN Validation QR</p>
                <p className="text-xs text-gray-400 mt-0.5">{documentReference}</p>
            </div>

            {/* Validation link */}
            <a
                href={validationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Verify on MyInvois
            </a>

            {/* UUID display */}
            <div className="text-center">
                <p className="text-xs text-gray-400 font-mono break-all max-w-40">{lhdnUuid}</p>
            </div>
        </div>
    );
};
export default EInvoiceQRCode;
