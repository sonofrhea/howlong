import React from "react";
import ForJournalEntry from "../../../components/Modals/ForJournalEntry";
import JournalEntryForm from "./JournalEntryForm"
import { JournalHeaderInputs } from "../Constants/Types";
import { JournalEntryModalTypes } from "../../../components/Modals/Types";
 


const JournalEntryModal: React.FC<JournalEntryModalTypes> = ({
  isOpen,
  onClose,
  onCreate,
  isSubmitting = false,
  accounts,
}) => {

    return(
        <ForJournalEntry
            isOpen={isOpen}
            onClose={onClose}
            title="Create Journal Entry"
            width="max-w-6xl"
        >
            <JournalEntryForm 
                onSubmit={(data) => {
                    onCreate(data);
                    onClose();
                }}
                isSubmitting={isSubmitting}
                onCancel={onClose}
                accounts={accounts}
            />
        </ForJournalEntry>
    );
};
export default JournalEntryModal;