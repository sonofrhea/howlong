import React, { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { DebitNoteInputs, DebitNoteEditProps, CustomerCreateResponse } from "../constants/Types";
import { debitNoteRelatedPaymentHandler,
     supplierDebitNoteAccountHandler } from "../../handlers";
import { buttons, forms, labelStyles, layout, tables, text, utils } from "../constants/Styles";
import { Trash2 } from "lucide-react";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { CustomerPaymentResponse, lhdnClassificationCodesInterface } from "../../Sales/Constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";

import { formatCurrency } from "../../../components/store";
import { LHDN_TAX_TYPE_CHOICES,
    SST_DIRECTION, EINVOICE_SUPPLY_TYPE_CHOICES,
EINVOICE_PAYMENT_MODE_CHOICES } from "../constants/Options";





const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};

const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
};



const formatDebitNoteNumber = () => {
    const currentYear = new Date().getFullYear();
    return `DN-${currentYear}-`;
};








const DebitNoteEdit: React.FC<DebitNoteEditProps> = ({
    debitNote,
    onSubmit,
    isSubmitting,
    onBack,
    onCancel,
    customers,
    customerPayments,
    currencies,
    accounts,
    lhdnClassificationCodes,
    agents, onCreateJournalEntry, isCreatingJournalEntry }) => {
        
        const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
        const debitNoteId = debitNote?.debit_note_number;


    const { register, handleSubmit, watch, setValue, control,
        formState: { errors }, reset } = useForm<DebitNoteInputs>({
            defaultValues: debitNote
        });
    
    React.useEffect(() => {
        reset(debitNote);
    }, [debitNote, reset]);
    
    
    const { fields, append, remove } = useFieldArray({ 
        name: "debit_note_details",
        control
    });
    
    
    
    const controlAccountChange = supplierDebitNoteAccountHandler(accounts, setValue);

    const relatedPayment = debitNoteRelatedPaymentHandler(customerPayments, setValue);


    const classificationCodes = useMemo(() => lhdnClassificationCodes.map((
        code: lhdnClassificationCodesInterface) => (
            <option key={code.code} value={code.code}>
                {code.code} - {code.description}
            </option>
    )), [lhdnClassificationCodes])



    const eInvoiceSupplyType = useMemo(() => EINVOICE_SUPPLY_TYPE_CHOICES.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        )), [EINVOICE_SUPPLY_TYPE_CHOICES])

    const eInvoicePaymentMode = useMemo(() => EINVOICE_PAYMENT_MODE_CHOICES.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        )), [EINVOICE_PAYMENT_MODE_CHOICES])














    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`${forms.body}`}>
                <div className={layout.header}>
                    <div className={layout.tag}>
                    
                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    DEBIT NOTE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatDebitNoteNumber()}{debitNote.debit_note_number}
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Date</p>
                        <input 
                            type="date"
                            {...register("date", {required: "Date is required"})}
                            className={forms.input.dateBig}
                        />
                        {errors.date && <p className="text-red-800 text-xs mt-1">
                            {errors.date.message}
                        </p>}
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Bill To...</p>
                        <select
                            {...register("customer")}
                            className={`cursor-pointer ${forms.select.partial}`}
                        >
                            <option value="">select...</option>
                            {useMemo(() => customers.map((customer: CustomerCreateResponse) => (
                                <option key={customer.customer_number} value={customer.customer_number}>
                                    {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name || '--'}
                                </option>
                            )), [customers])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Account</p>
                        <select
                            {...register("account.account_code")}
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

                        <input type="hidden" {...register("account.account_name")} />
                        <input type="hidden" {...register("account.account_type")} />
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Agent</p>
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

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Payment</p>
                        <select
                            {...register("related_payment")}
                            className={forms.select.partial}
                            onChange={relatedPayment}
                        >
                            <option value="">select...</option>
                            {useMemo(() => customerPayments.map((payment: CustomerPaymentResponse) => (
                                <option key={payment.payment_number} value={payment.payment_number}>
                                    POST-{payment.payment_number} | Paid Amount: {payment.paid_amount}
                                </option>
                            )), [customerPayments])}
                        </select>
                    </div>
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Previously Paid Amount</p>
                        <input 
                            {...register("initial_paid_amount")}
                            type="number"
                            readOnly
                            className={forms.input.midNumber}
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = decimalPlaces(Number(e.target.value));
                                }
                            }}
                        />
                    </div>
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Extra Amount Owed</p>
                        <input 
                            {...register("amount_owed")}
                            type="number"
                            className={forms.input.midNumber}
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = decimalPlaces(Number(e.target.value));
                                }
                            }}
                        />
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Currency</p>
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                            E-invois supply type
                        </p>
                        <select className={forms.select.partial}
                            {...register("einvoice_supply_type", {
                                setValueAs: (value) => value === "" ? undefined : value
                            })}>
                                <option value="">can leave empty...</option>
                                {eInvoiceSupplyType}
                        </select>
                    </div>
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                            E-invois payment mode
                        </p>
                        <select className={forms.select.partial}
                            {...register("einvoice_payment_mode", {
                                setValueAs: (value) => value === "" ? undefined : value
                            })}>
                                <option value="">can leave empty...</option>
                                {eInvoicePaymentMode}
                        </select>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className={tables.base}>
                            <colgroup>
                                {[
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-1/9 text-center',
                                    'w-[9%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Date</th>
                                    <th className={tables.headerCell}>Description</th>
                                    <th className={tables.headerCell}>Amount</th>
                                    <th className={tables.headerCell}>Taxable?</th>
                                    <th className={tables.headerCell}>SST Direction</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>e-invoice <br />classification code</th>
                                    <th className={tables.headerCell}>e-invoice <br />tax type</th>
                                    <th className={tables.headerCell}>e-invoice tax <br />exemption reason</th>
                                    <th className={tables.headerCell}>Current Total<br></br>(After SST)</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => {

                                    const detailsAmount = Number(watch(`debit_note_details.${index}.amount`) || 0.00);
                                    const tax_percentage = Number(watch(`debit_note_details.${index}.sst_percent`) || 0.00) / 100;
                                    let tax_inclusive = watch(`debit_note_details.${index}.taxable`) || false;
                                    let taxAmount = detailsAmount * tax_percentage;

                                    if (!tax_inclusive) {
                                        taxAmount = 0.00;
                                    }
                                    const netTotal = detailsAmount - taxAmount;

                                    return(
                                    <tr key={field.id} className={tables.row}>
                                        <td className={tables.cell}>
                                            <input 
                                                type="date"
                                                {...register(`debit_note_details.${index}.date`)}
                                                className={tables.text}
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`debit_note_details.${index}.description`)}
                                                className={tables.text}
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                {...register(`debit_note_details.${index}.amount`)}
                                                type="number"
                                                className={forms.input.number}
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}                                                
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <input 
                                                type="checkbox"
                                                {...register(`debit_note_details.${index}.taxable`)}
                                                className="text-black cursor-pointer"
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <select
                                                className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                {...register(`debit_note_details.${index}.sst_direction`)}
                                                >
                                                    {useMemo(() => SST_DIRECTION.map(option => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    )), [SST_DIRECTION])}
                                            </select>
                                        </td>

                                        <td className={text.numbers}>
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                                <input 
                                                    {...register(`debit_note_details.${index}.sst_percent`) || 0.00}
                                                    type="number"
                                                    className={forms.input.number}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = decimalPlaces(Number(e.target.value));
                                                        }
                                                    }}
                                                    
                                                    style={{ paddingRight: '20%' }}
                                                />
                                                <span style={{ 
                                                    position: 'absolute', 
                                                    right: '5px', 
                                                    top: '50%', 
                                                    transform: 'translateY(-50%)',
                                                    pointerEvents: 'none',
                                                    color: '#666'
                                                }}>%</span>
                                            </div>
                                        </td>
                                        
                                        <td className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                            <select
                                                {...register(`debit_note_details.${index}.einvoice_classification_code`, {
                                                    setValueAs: (value) => value === "" ? undefined : value
                                                })}
                                                className={forms.select.full}
                                            >
                                                <option value="">select...</option>
                                                {useMemo(() => lhdnClassificationCodes.map((
                                                    code: lhdnClassificationCodesInterface) => (
                                                        <option key={code.code} value={code.code}>
                                                            code: {code.code} / desc: {code.description}
                                                        </option>
                                                    )), [lhdnClassificationCodes])}
                                            </select>
                                        </td>
                                        
                                        <td className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                            <select
                                                {...register(`debit_note_details.${index}.einvoice_tax_type`, {
                                                    setValueAs: (value) => value === "" ? null : value
                                                })}
                                                className={forms.select.full}
                                            >
                                                {useMemo(() => LHDN_TAX_TYPE_CHOICES.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                )), [LHDN_TAX_TYPE_CHOICES])}
                                            </select>
                                        </td>
                                                                                                                        
                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`debit_note_details.${index}.einvoice_tax_exemption_reason`)}
                                                className={tables.text}
                                            />
                                        </td>

                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(netTotal)}
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
                                    );
                                })}
                                <tr className={tables.headerCell}>
                                    <td >
                                        <button
                                            type="button"
                                            onClick={() => append({
                                                date: "",
                                                description: "",
                                                amount: 0.00,
                                                taxable: false,
                                                sst_direction: 'Add',
                                                sst_percent: 0.00,
                                                cancelled: false,
                                                einvoice_classification_code: undefined,
                                                einvoice_tax_type: "06",
                                                einvoice_tax_exemption_reason: undefined,
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
                                    <div>Taxable</div>
                                    <input 
                                    {...register("taxable")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax%</div>
                                        <input 
                                            type="number"
                                            {...register("tax_percent", { valueAsNumber: true })}
                                            className={forms.input.smallNumber}
                                            placeholder="0.00"
                                            defaultValue={0.00}
                                            step="0.01" min="0.00" onBlur={(e) => {
                                                if (e.target.value) {
                                                    e.target.value = decimalPlaces(Number(e.target.value));
                                                }
                                            }}
                                            
                                        />
                                </div>
                                
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Cancelled</div>
                                    <input 
                                    {...register("cancelled")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
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
                                    Updating Debit Note...
                                </span>
                            ) : (
                                'Update Debit Note'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(debitNoteId)}
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
}
export default DebitNoteEdit;