export const PURCHASE_INVOICE_STATUS = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'Suspended', label: 'Suspended' },
    { value: 'Pending', label: 'Pending' },
]as const;


export const PURCHASE_ORDER_STATUS = [
    { value: 'Paid', label: 'Paid' },
    { value: 'Partial', label: 'Partial' },
    { value: 'Unpaid', label: 'Unpaid' },
]as const;