import React from "react";
import ForCustomerProfile from "../../../components/Modals/ForCustomerProfile";
import CustomerForm from "./CustomerForm";
import { CustomerProfileModalTypes } from "../../../components/Modals/Types";




const CustomerProfileModal: React.FC<CustomerProfileModalTypes> = ({
    isOpen,
    onClose,
    onCreate,
    isSubmitting = false,
    currencies,
    banks,
}) => {


    return (
        <ForCustomerProfile
            isOpen={isOpen}
            onClose={onClose}
            title="Create Customer"
            width="max-w-4xl"
        >
            <CustomerForm
                onSubmit={(data) => {
                    onCreate(data);
                    onClose();
                }}
                isSubmitting={isSubmitting}
                onCancel={onClose}
                currencies={currencies}
                banks={banks}
            />

        </ForCustomerProfile>
    );
};
export default CustomerProfileModal;