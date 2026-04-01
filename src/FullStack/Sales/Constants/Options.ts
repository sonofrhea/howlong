export const PAYMENT_TYPE_OPTIONS = [
    'Cash',
    'Card',
    'Online'
] as const;

export const LHDN_TAX_TYPE_CHOICES = [
    { value: '01', label: 'Sales Tax' },
    { value: '02', label: 'Service Tax' },
    { value: '03', label: 'Tourism Tax' },
    { value: '04', label: 'High Value Goods Tax' },
    { value: '05', label: 'Sales Tax on Low Value Goods' },
    { value: '06', label: 'Not Applicable' },
    { value: 'E',  label: 'Tax Exemption' },
] as const;


export const EINVOICE_STATUS_CHOICES = [
  'Not Submitted',
  'Submitted',
  'Valid',
  'Invalid',
  'Cancelled',
  'Rejected by Buyer',
] as const;


export const EINVOICE_TYPE_CHOICES = [
  { value: '01', label: '01 — Invoice' },
  { value: '02', label: '02 — Credit Note' },
  { value: '03', label: '03 — Debit Note' },
  { value: '04', label: '04 — Refund Note' },
  { value: '11', label: '11 — Self-Billed Invoice' },
  { value: '12', label: '12 — Self-Billed Credit Note' },
  { value: '13', label: '13 — Self-Billed Debit Note' },
  { value: '14', label: '14 — Self-Billed Refund Note' },
] as const;

export const SUPPLY_TYPE_CHOICES = [
  'B2B',
  'B2C',
  'B2G',
] as const;

export const PAYMENT_MODE_CHOICES = [
  { value: '01', label: 'Cash' },
  { value: '02', label: 'Cheque' },
  { value: '03', label: 'Bank Transfer' },
  { value: '04', label: 'Credit Card' },
  { value: '05', label: 'Debit Card' },
  { value: '06', label: 'e-Wallet' },
  { value: '07', label: 'Digital Bank' },
  { value: '08', label: 'Others' },
] as const;



export const PAYMENT_STATUS_CHOICES = [
  'Unpaid',
  'Partial',
  'Paid'
] as const;
