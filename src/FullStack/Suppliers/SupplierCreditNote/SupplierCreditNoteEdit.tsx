import React, { useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { SupplierCreditNoteEditProps,
    SupplierCreditNoteInputs,
    SupplierInvoiceResponse,
    SupplierProfileResponse } from "../constants/Types";
import { buttons, forms, labelStyles, layout, tables, text, utils } from "../constants/Styles";
import { Trash2 } from "lucide-react";
import { ProductItemCreateResponse } from "../../Products/constants/Types";
import { supplierCreditNoteInvoiceTotal, supplierDebitNoteAccountHandler } from "../../handlers";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import JournalEntryModal from "../../Accounting/JournalEntry/JournalEntryModal";






const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};

const formatProductItemCode = () => {
    return `SKU`;
};


const formatSupplierInvoiceNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SI-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SCN-${currentYear}-`;
};






const SupplierCreditNoteEdit: React.FC<SupplierCreditNoteEditProps> = ({
    supplierCreditNote,
    onSubmit,
    isSubmitting,
    onCancel,
    supplierInvoices, currencies, accounts, agents, supplierProfiles, productItems,
    onCreateJournalEntry, isCreatingJournalEntry 
}) => {
    const [isJournalEntryOpen, setIsJournalEntryOpen] = useState(false);
    const supplierCreditNoteId = supplierCreditNote.credit_note_number;
                                    
    const productOptions = useMemo(() => 
        productItems.map((product: ProductItemCreateResponse) => (
        <option key={product.item_code} value={product.item_code}>
            SKU-{product.item_code} | {product.item_description}
        </option>
    )), [productItems])


    const { register, handleSubmit, watch, setValue, control,
        formState: { errors }, reset } = useForm<SupplierCreditNoteInputs>({
            defaultValues: supplierCreditNote
        });


    React.useEffect(() => {

        const updated = {
            ...supplierCreditNote,
            date: supplierCreditNote.date
                ? new Date(supplierCreditNote.date).toISOString().split("T")[0]
                : "",
        };

        reset(updated);
    }, [supplierCreditNote, reset]);



    const { fields, append, remove } = useFieldArray({
        name: "related_credit_note",
        control
    });
    

    const accountChange = supplierDebitNoteAccountHandler(accounts, setValue);
    const invoiceTotalChange = supplierCreditNoteInvoiceTotal(supplierInvoices, setValue);





    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-center space-y-6 px-6 py-3 gap-4">
                            <div className={layout.badge}>
                                <p className={text.badgeLarge}>
                                    SUPPLIER CREDIT NOTE DETAILS
                                </p>
                                <p className={labelStyles}>
                                    {formatNumber()}{supplierCreditNote.credit_note_number}
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
                            className={forms.input.date}
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>
                                                
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Account</p>
                        <select
                            {...register("account.account_code", {required: false})}
                            className={forms.select.partial}
                            onChange={accountChange}
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Supplier</p>
                        <select
                            {...register("supplier")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => supplierProfiles.map((supplier: SupplierProfileResponse) => (
                                <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                    {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                </option>
                            )), [supplierProfiles])}
                        </select>
                    </div>
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice</p>
                        <select
                            {...register("related_invoice")}
                            className={forms.select.partial}
                            onChange={invoiceTotalChange}
                        >
                            <option value="">select...</option>
                            {useMemo(() => supplierInvoices.map((invoice: SupplierInvoiceResponse) => (
                                <option key={invoice.invoice_number} value={invoice.invoice_number}>
                                    {formatSupplierInvoiceNumber()}{invoice.invoice_number} | {invoice.aggregate_total}
                                </option>
                            )), [supplierInvoices])}
                        </select>
                    </div>
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Invoice Total</p>
                        <input 
                            type="number"
                            {...register("related_invoice_total")}
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
                            {currencies.map((currency: CurrencyInterface) => (
                                <option key={currency.currency_code} value={currency.currency_code}>
                                    {currency.currency_code}
                                </option>
                            ))}
                        </select>
                    </div>
                                                
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Agent</p>
                        <select
                            {...register("agent")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => agents.map((agent: AgentInterface) => (
                                <option key={agent.email} value={agent.email}>
                                    {agent.name}
                                </option>
                            )), [agents])}
                        </select>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />
                
                <div>
                    <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Description</p>
                    <textarea 
                        {...register("description")}
                        className={forms.description}
                        rows={2}
                    />

                    <p className={forms.secondLevelLabel}>Cancelled</p>
                    <input 
                        type="checkbox"
                        {...register("cancelled")}
                    />
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className={tables.base}>
                            <colgroup>
                                {[
                                    'w-1/7 text-center',
                                    'w-1/7 text-center',
                                    'w-1/7 text-center',
                                    'w-1/7 text-center',
                                    'w-1/7 text-center',
                                    'w-1/7 text-center',
                                    'w-1/7 text-center',
                                    'w-[7%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Item</th>
                                    <th className={tables.headerCell}>Description</th>
                                    <th className={tables.headerCell}>Amount</th>
                                    <th className={tables.headerCell}>Tax Inclusive</th>
                                    <th className={tables.headerCell}>Tax %</th>
                                    <th className={tables.headerCell}>SubTotal(After Tax)</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => {


                                    const detailsAmount = Number(watch(`related_credit_note.${index}.amount`) || 0.00);
                                    const tax_percentage = Number(watch(`related_credit_note.${index}.tax_amount`) || 0.00) / 100;
                                    const taxAmount = tax_percentage * detailsAmount;
                                    const netTotal = detailsAmount + taxAmount;



                                    return(
                                    <tr key={field.id} className={tables.row}>
                                        <td>
                                            <select 
                                                {...register(`related_credit_note.${index}.credit_note_item`)}
                                                className={forms.select.small}
                                            >
                                                <option value=""></option>
                                                {productOptions}
                                            </select>
                                        </td>
                                        
                                        <td className={tables.cell}>
                                            <input
                                                {...register(`related_credit_note.${index}.description`)}
                                                className={tables.text}
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                type="number"
                                                {...register(`related_credit_note.${index}.amount`)}
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
                                                {...register(`related_credit_note.${index}.tax_inclusive`)} 
                                            />
                                        </td>
                                        
                                        <td className={text.numbers}>
                                            <input 
                                                type="number"
                                                {...register(`related_credit_note.${index}.tax_amount`)}
                                                className={forms.input.number}
                                                placeholder="0.00"
                                                step="0.01" min="0.00" onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}
                                            />
                                        </td>
                                        
                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(netTotal)}
                                        </td>
                                        
                                        <td className={tables.cell}>
                                            <input
                                                type="checkbox"
                                                {...register(`related_credit_note.${index}.cancelled`)} 
                                            />
                                        </td>
                                        
                                        <td>
                                            <button 
                                                type="button"
                                                title="remove"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={16} strokeWidth={2}/>
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
                                                credit_note_item: "",
                                                description: "",
                                                amount: 0.00,
                                                tax_inclusive: false,
                                                tax_amount: 0.00,
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
                                    <div>Tax %</div>
                                    <input 
                                        type="number"
                                        {...register("tax_amount")}
                                        className={forms.input.smallNumber}
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = decimalPlaces(Number(e.target.value));
                                            }
                                        }}
                                    
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Cancelled?</div>
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

                    {/* SUBMIT BUTTON */}
                    <div className={layout.submitSection}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={buttons.primary}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className={utils.spinner}></div>
                                    Updating Supplier Credit Note...
                                </span>
                            ) : (
                                'Update Supplier Credit Note'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(supplierCreditNoteId)}
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
export default SupplierCreditNoteEdit;