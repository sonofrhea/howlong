import React from "react";
import { EInvoiceStatusBadgeProps } from "./constants/Types";



const STATUS_CONFIG: Record<string, {
    bg: string;
    text: string;
    border: string;
    dot: string;
    label: string;
}> = {
    'Not Submitted': {
        bg: 'bg-gray-50',
        text: 'text-gray-500',
        border: 'border-gray-200',
        dot: 'bg-gray-400',
        label: 'Not Submitted',
    },
    'Submitted': {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        dot: 'bg-blue-500',
        label: 'Submitted',
    },
    'Valid': {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        dot: 'bg-green-500',
        label: 'Valid',
    },
    'Invalid': {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        dot: 'bg-red-500',
        label: 'Invalid',
    },
    'Cancelled': {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200',
        dot: 'bg-orange-500',
        label: 'Cancelled',
    },
    'Rejected by Buyer': {
        bg: 'bg-rose-50',
        text: 'text-rose-600',
        border: 'border-rose-200',
        dot: 'bg-rose-500',
        label: 'Rejected',
    },
    'Error': {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        dot: 'bg-yellow-500',
        label: 'Error',
    },
    'Pending': {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        dot: 'bg-purple-500',
        label: 'Pending',
    },
};


const EInvoiceStatusBadge: React.FC<EInvoiceStatusBadgeProps> = ({ status }) => {
    const config = STATUS_CONFIG[status] ?? STATUS_CONFIG['Not Submitted'];


    return (
        <span className={`
            inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
            border ${config.bg} ${config.text} ${config.border}
        `}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
};
export default EInvoiceStatusBadge;
