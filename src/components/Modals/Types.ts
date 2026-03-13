import { JournalHeaderInputs } from "../../FullStack/Accounting/Constants/Types";
import { ControlAccountInterface } from "../../FullStack/ChartOfAccounts/Interfaces";
import { BankInterface, CurrencyInterface } from "../../FullStack/Core/constants/Types";
import { CustomerInputs } from "../../FullStack/Customers/constants/Types";


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





export type CustomerProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  width?: string;
  children: React.ReactNode;
};



export type CustomerProfileModalTypes = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: CustomerInputs) => void;
  isSubmitting?: boolean;
  currencies: CurrencyInterface[];
  banks: BankInterface[];
};
