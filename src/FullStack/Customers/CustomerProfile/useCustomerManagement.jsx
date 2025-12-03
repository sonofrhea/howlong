import { useState } from 'react';

export function useCustomerManagement() {
  const [view, setView] = useState('list');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const navigateToList = () => {
    setView('list');
    setSelectedCustomerId(null);
  };

  const navigateToDetails = (customerId) => {
    setSelectedCustomerId(customerId);
    setView('details');
  };

  const navigateToEdit = (customerId) => {
    setSelectedCustomerId(customerId);
    setView('edit');
  };

  const navigateToForm = () => {
    setView('form');
  };

  const navigateBack = () => {
    // Smart navigation - goes back to previous view
    if (view === 'edit') {
      setView('details');
    } else {
      navigateToList();
    }
  };

  return {
    view,
    selectedCustomerId,
    setSelectedCustomerId,
    navigateToList,
    navigateToDetails,
    navigateToEdit,
    navigateToForm,
    navigateBack,
  };
}