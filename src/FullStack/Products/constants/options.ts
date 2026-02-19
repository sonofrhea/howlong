export const BOOLEAN_OPTIONS = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' }
] as const;

export const COSTING_METHOD_OPTIONS = [
  'Fixed Costing',
  'FIFO',
  'Weighted Average'
] as const;