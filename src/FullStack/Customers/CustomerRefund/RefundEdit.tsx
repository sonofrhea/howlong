import React, { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CreditNoteCreateResponse, CustomerCreateResponse,
    CustomerRefundInputs, CustomerRefundProps } from "../constants/Types";
import { RefundAccountHandler } from "../../handlers";
import { buttons, forms, labelStyles, layout, tables, text, utils } from "../constants/Styles";
import { REFUND_TYPE_OPTIONS } from "../constants/Options";
import { Trash2 } from "lucide-react";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";






const formatCreditNoteNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CN-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};

const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const formatRefundNumber = () => {
    const currentYear = new Date().getFullYear();
    return `REF-${currentYear}-`;
};






const RefundEdit: React.FC<CustomerRefundProps> = ({
  refund,
  onSubmit,
  isSubmitting,
  onBack,
  onCancel,
  customers, currencies, accounts, agents, creditNotes,
  onCreateJournalEntry, isCreatingJournalEntry
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const refundId = refund?.refund_number;


    const { register, handleSubmit, watch, setValue, control,
        formState: { errors }, reset } = useForm<CustomerRefundInputs>({
            defaultValues: refund
        });
    
        
    const { fields, append, remove } = useFieldArray({
        name: "related_customer_refund",
        control
    });
        
    React.useEffect(() => {
        if (!refund) return;

        const updated = {
            ...refund,
            related_customer_refund: refund.related_customer_refund
                ? refund.related_customer_refund?.map(child => ({
                    ...child,
                    date: child.date
                        ? new Date(child.date).toISOString().split("T")[0]
                        : "",
                })) : [],
        };
        reset(updated);
    }, [refund, reset]);



const controlAccountChange = RefundAccountHandler(accounts, setValue);





    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-right">
                            <div className={layout.redBadge}>
                                <p className={text.badgeLarge}>
                                    CUSTOMER REFUND DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatRefundNumber()}{refund.refund_number}
                                </p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsJournalEntryOpen(true)}
                        className="bg-purple-900 text-white px-4 py-2 hover:bg-amber-900 rounded-lg flex items-center gap-2"
                    >
                        + Create Journal Entry
                    </button>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className={layout.formSectionCol3}>
                    <div>
                        <p className={forms.label}>Date</p>
                        <input 
                            type="date"
                            {...register("date", {required: "Date is required"})}
                            className={forms.input.date}
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>
                    
                    <div>
                        <p className={forms.label}>Pay To...</p>
                        <select
                            {...register("pay_to")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {customers.map((customer: CustomerCreateResponse) => (
                                <option key={customer.customer_number} value={customer.customer_number}>
                                    {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name || '--'}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <p className={forms.label}>Account</p>
                        <select
                            {...register("payment_account.account_code")}
                            className={forms.select.partial}
                            onChange={controlAccountChange}
                        >
                            <option value="">select...</option>
                            {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                <option key={account.account_code} value={account.account_code}>
                                    {account.account_code} ({account.account_name})
                                </option>
                            )), [accounts])}
                        </select>

                        <input type="hidden" {...register("payment_account.account_name")} />
                        <input type="hidden" {...register("payment_account.account_type")} />
                    </div>

                    <div>
                        <p className={forms.label}>Related Credit Note</p>
                        <select
                            {...register("related_credit_note")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => creditNotes.map((creditNotes: CreditNoteCreateResponse) => (
                                <option key={creditNotes.credit_note_number} value={creditNotes.credit_note_number}>
                                    {formatCreditNoteNumber()}{creditNotes.credit_note_number} | Outstanding: {creditNotes.credit_note_outstanding || '--'}
                                </option>
                            )), [creditNotes])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label}>Expected Refund Amount</p>
                        <input 
                            {...register("expected_refund")}
                            type="number"
                            title="enter expected amount..."
                            className={forms.select.partial}
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = decimalPlaces(Number(e.target.value));
                                }
                            }}
                        />
                    </div>
                    
                    <div>
                        <p className={forms.label}>Currency</p>
                        <select 
                            {...register("currency")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => currencies.map((currency: CurrencyInterface) => (
                                <option key={currency.currency_code} value={currency.currency_code}>
                                    {currency.currency_code}
                                </option>
                            )), [currencies])}
                        </select>
                    </div>
                    
                    <div>
                        <p className={forms.label}>Agent</p>
                        <select className={forms.select.partial}
                            {...register("agent")}>
                                <option value="">select...</option>
                                {useMemo(() => agents.map((agent: AgentInterface) => (
                                    <option key={agent.email} value={agent.email}>
                                        {agent.name} | {agent.email}
                                    </option>
                                )), [agents])}
                        </select>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className={tables.base}>
                            <colgroup>
                                {[
                                    'w-1/6 text-center',
                                    'w-1/6 text-center',
                                    'w-1/6 text-center',
                                    'w-1/6 text-center',
                                    'w-1/6 text-center',
                                    'w-1/6 text-center',
                                    'w-[7%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Date</th>
                                    <th className={tables.headerCell}>Amount</th>
                                    <th className={tables.headerCell}>Additional Charges</th>
                                    <th className={tables.headerCell}>Payment Type</th>
                                    <th className={tables.headerCell}>Total<br></br>(After Charges)</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => (
                                    <tr key={field.id} className={tables.row}>
                                        <td>
                                            <input 
                                                type="date"
                                                {...register(`related_customer_refund.${index}.date`)}
                                                className={forms.select.full}
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                type="number"
                                                {...register(`related_customer_refund.${index}.refund_amount`)}
                                                className={forms.input.number}
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }} 
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                type="number"
                                                {...register(`related_customer_refund.${index}.additional_charges`)}
                                                className={forms.input.number}
                                                placeholder="0.00"
                                                defaultValue="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = parseFloat(e.target.value).toFixed(2);
                                                    }
                                                }} 
                                            />
                                        </td>

                                        <td className={forms.label}>
                                            <select
                                                {...register(`related_customer_refund.${index}.payment_type`)}
                                                className={forms.select.full}
                                            >
                                                <option value="">select...</option>
                                                {REFUND_TYPE_OPTIONS.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        
                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(
                                                (Number(watch(`related_customer_refund.${index}.refund_amount`) || 0.00) +
                                                Number(watch(`related_customer_refund.${index}.additional_charges`) || 0.00))
                                            )}
                                        </td>
                                        
                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`related_customer_refund.${index}.cancelled`)}
                                                type="checkbox"
                                                className={forms.input.base}
                                            />
                                        </td>
                                        
                                        <td>
                                            <button
                                                type="button"
                                                title="remove"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={16} strokeWidth={1.5}
                                                className="text-black cursor-pointer" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className={tables.headerCell}>
                                        <button
                                            type="button"
                                            onClick={() => append({
                                                date: "",
                                                refund_amount: 0.00,
                                                additional_charges: 0.00,
                                                payment_type: "" as any,
                                                cancelled: false
                                            })}
                                            className={buttons.addLine}
                                        >
                                            ++ New Line
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                                        
                    <div className="mt-6 sm:flex sm:items-center sm:justify-end">
                    <div className="w-full sm:w-1/2 lg:w-1/3">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="bg-gray-100 p-4 rounded-lg drop-shadow-md shadow-gray-300 shadow-lg">

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax Inclusive?</div>
                                    <input 
                                    {...register("tax_inclusive")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax Amount</div>
                                    <input 
                                        type="number"
                                        {...register("tax_amount")}
                                        className={forms.input.smallNumber}
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                            }
                                        }}
                                        
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className={layout.submitSection}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={buttons.primary}
                        >
                            {isSubmitting ? (
                                <span className="flex  items-center gap-2">
                                    <div className={utils.spinner}></div>
                                    Updating Refund...
                                </span>
                            ) : (
                                'Update Refund'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(refundId)}
                            className={buttons.secondary}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                <JournalEntryModal
                    isOpen={isJournalEntryOpen}
                    onClose={() => setIsJournalEntryOpen(false)}
                    onCreate={onCreateJournalEntry}
                    isSubmitting={isCreatingJournalEntry}
                    accounts={accounts}
                />
            </div>
        </form>
    );

};
export default RefundEdit;