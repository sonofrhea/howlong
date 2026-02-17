import { JournalHeaderInputs } from "../../FullStack/Accounting/Constants/Types";
import { ControlAccountInterface } from "../../FullStack/ChartOfAccounts/Interfaces";


export type JournalEntryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
};


export type JournalEntryModalTypes = {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (data: JournalHeaderInputs) => void;
    isSubmitting?: boolean;
    accounts: ControlAccountInterface[];
};



export type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};


export type SessionTimeoutModalProps = {
  showPrompt: boolean;
  countdown: number;
  handleStayLoggedInValidation: () => Promise<void>;
};
