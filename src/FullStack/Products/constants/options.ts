export const BOOLEAN_OPTIONS = [
  { value: true, label: 'Active' },
  { value: false, label: 'Inactive' }
] as const;

export const COSTING_METHOD_OPTIONS = [
    { value: 'Fixed Costing', label: 'Fixed Costing'},
    { value: 'FIFO', label: 'FIFO' },
    { value: 'Weighted Average', label: 'Weighted Average' }
] as const;