import React, { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { CreditNoteCreateResponse, CustomerCreateResponse,
    CustomerRefundInputs, CustomerRefundProps } from "../constants/Types";
import { RefundAccountHandler, refundRelatedcreditNoteHandler } from "../../handlers";
import { buttons, forms, labelStyles, layout, tables, text, utils } from "../constants/Styles";
import { EINVOICE_PAYMENT_MODE_CHOICES, EINVOICE_SUPPLY_TYPE_CHOICES, LHDN_TAX_TYPE_CHOICES, REFUND_TYPE_OPTIONS } from "../constants/Options";
import { Trash2 } from "lucide-react";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";
import { lhdnClassificationCodesInterface } from "../../Sales/Constants/Types";






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
  customers, currencies, accounts, agents, creditNotes, lhdnClassificationCodes,
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
const creditNoteChange = refundRelatedcreditNoteHandler(creditNotes, setValue);
//console.log("ALL CREDIT NOTES", creditNotes)


    
    
    
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














    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-right">
                            <div className={layout.redBadge}>
                                <p className={text.badgeLarge} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    CUSTOMER REFUND DETAILS
                                </p>
                                <span className={labelStyles} style={{ fontFamily: 'Montserrat, system-ui' }}>
                                    {formatRefundNumber()}{refund.refund_number}
                                </span>
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
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Pay To...</p>
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Account</p>
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Credit Note</p>
                        <select
                            {...register("related_credit_note")}
                            className={forms.select.partial}
                            onChange={creditNoteChange}
                        >
                            <option value="">select...</option>
                            {useMemo(() => creditNotes.map((creditNotes: CreditNoteCreateResponse) => (
                                <option key={creditNotes.credit_note_number} value={creditNotes.credit_note_number}>
                                    {formatCreditNoteNumber()}{creditNotes.credit_note_number} | Outstanding: {creditNotes?.credit_note_outstanding || '--'}
                                </option>
                            )), [creditNotes])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Expected Refund Amount</p>
                        <input 
                            {...register("expected_refund", {min: 0})}
                            type="number"
                            readOnly
                            title="credit note outstanding..."
                            className={forms.select.partial}
                            placeholder="0.00"
                            step="0.01" min="0.00" onBlur={(e) => {
                                if (e.target.value) {
                                    e.target.value = decimalPlaces(Number(e.target.value));
                                }
                            }}
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                            E-invois supply type
                        </p>
                        <select className={forms.select.partial}
                            {...register("einvoice_supply_type", {
                                setValueAs: (value) => value === "" ? null : value
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
                                setValueAs: (value) => value === "" ? null : value
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
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-1/12 text-center',
                                    'w-[7%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Date</th>
                                    <th className={tables.headerCell}>Amount</th>
                                    <th className={tables.headerCell}>Taxable</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>SST Amount</th>
                                    <th className={tables.headerCell}>Payment Type</th>
                                    <th className={tables.headerCell}>e-invoice <br />classification code</th>
                                    <th className={tables.headerCell}>e-invoice <br />tax type</th>
                                    <th className={tables.headerCell}>e-invoice tax <br />exemption reason</th>
                                    <th className={tables.headerCell}>Total</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => {
                                    const Amount = Number(watch(`related_customer_refund.${index}.refund_amount`) || 0.00)
                                    const sst = Number(watch(`related_customer_refund.${index}.sst_percent`) || 0.00)
                                    let tax_inclusive = watch(`related_customer_refund.${index}.taxable`) || false;
                                    let sstPercent = sst/100.00
                                    let taxAmount = Amount * sstPercent

                                    if (!tax_inclusive) {
                                        taxAmount = 0.00;
                                    };
                                    const total = Amount + taxAmount



                                    return(
                                    <tr key={field.id} className={tables.row}>
                                        <td>
                                            <input 
                                                type="date"
                                                {...register(`related_customer_refund.${index}.date`, {
                                                    setValueAs: (value) => value === "" ? null : value
                                                })}
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
                                        
                                        <td className={tables.cell}>
                                            <input 
                                                type="checkbox"
                                                {...register(`related_customer_refund.${index}.taxable`)}
                                                className="text-black cursor-pointer"
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <input 
                                                type="number"
                                                {...register(`related_customer_refund.${index}.sst_percent`)}
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
                                        
                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(taxAmount)}
                                        </td>

                                        <td className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                            <select
                                                {...register(`related_customer_refund.${index}.payment_type`)}
                                                className={forms.select.full}
                                            >
                                                {useMemo(() => REFUND_TYPE_OPTIONS.map(option => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                )), [REFUND_TYPE_OPTIONS])}
                                            </select>
                                        </td>

                                        <td className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                            <select
                                                {...register(`related_customer_refund.${index}.einvoice_classification_code`, {
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
                                                {...register(`related_customer_refund.${index}.einvoice_tax_type`, {
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
                                                {...register(`related_customer_refund.${index}.einvoice_tax_exemption_reason`)}
                                                className={tables.text}
                                            />
                                        </td>
                                        
                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(total)}
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
                                );
                                })}
                                <tr>
                                    <td className={tables.headerCell}>
                                        <button
                                            type="button"
                                            onClick={() => append({
                                                date: undefined,
                                                refund_amount: 0.00,
                                                taxable: false,
                                                sst_percent: 0.00,
                                                payment_type: "Cash",
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
                                    <div>Taxable?</div>
                                    <input 
                                    {...register("taxable")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax percent</div>
                                    <input 
                                        type="number"
                                        {...register("tax_percent")}
                                        className={forms.input.smallNumber}
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = decimalPlaces(Number(e.target.value));
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