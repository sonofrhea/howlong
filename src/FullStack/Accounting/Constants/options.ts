export const STATUS_CHOICES = [
    'Active',
    'Inactive',
    'Suspended',
    'Prospect',
    'Pending',
] as const;

export const ID_TYPE_CHOICES = [
    'Business Registration Number',
    'New IC',
    'Old IC',
    'Passport',
    'Police ID',
    'Army ID',
] as const;

export const TAX_ID_CHOICES = [
    'BRN(New)',
    'NRIC',
    'Passport',
    'Army',
    'BRN(Old)',
] as const;

export const BANK_TYPE_CHOICES = [
    'Bank',
    'JoinPAY',
    'DualPay',
    'Other Bank',
] as const;

export const INCOME_EXPENSES_OPTIONS = [
    'INCOME',
    'EXPENSES',
] as const;

export const CASH_BOOK_OPTIONS = [
    'Cash Receipts',
    'Cash Payments',
    'Deposit',
    'Cheque',
] as const;