import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { CustomerCreateResponse } from "../../Customers/constants/Types"
import { InvoiceFormProps, InvoiceInputs, lhdnClassificationCodesInterface, QuotationDetails } from "../Constants/Types";
import { CurrencyInterface, AgentInterface } from "../../Core/constants/Types"
import { ProductItemCreateResponse } from "../../Products/constants/Types"


import { Trash2 } from "lucide-react";
import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";
import { quotationInvoiceHandler } from "../../handlers";
import { LHDN_TAX_TYPE_CHOICES } from "../Constants/Options";
import { EINVOICE_PAYMENT_MODE_CHOICES, EINVOICE_SUPPLY_TYPE_CHOICES } from "../../Customers/constants/Options";


const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};


const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};

const formatQuotationNumber = () => {
    const currentYear = new Date().getFullYear();
    return `QT-${currentYear}-`;
};













const InvoiceForm: React.FC<InvoiceFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    customers, 
    currencies, agents, projects, productItems, quotations, lhdnClassificationCodes
}) => {

        

    const { register, handleSubmit, watch, setValue, 
        control, formState: { errors } } = useForm<InvoiceInputs>({
            defaultValues: {
                taxable: false,
                tax_percent: 0.00,
                related_invoice: [
                    {
                        item: undefined, 
                        description: undefined,
                        quantity: 0, 
                        unit_of_measure: undefined, 
                        price_per_unit: 0.00,
                        cancelled: false,
                        taxable: false, 
                        sst_percent: 0.00,
                    }
                ],
                discount: false,
                discount_percent: 0.00,
                cancelled: false
            }
    });


    const { fields, append, remove, replace } = useFieldArray({
        name: "related_invoice",
        control
    });



    const onQuotationChange = quotationInvoiceHandler(quotations, setValue, replace);


    const productOptions = useMemo(() => 
        productItems.map((product: ProductItemCreateResponse) => (
        <option key={product.item_code} value={product.item_code}>
            SKU-{product.item_code} | {product.item_description}
        </option>
    )), [productItems])
                
                
                
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
                            <div className={layout.badge}>
                                <div className={text.badgeSmall}>NEW</div>
                                <div className={text.badgeLarge}>
                                    CUSTOMER INVOICE
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />
                                                    
                <div className={layout.formSectionCol3}>
                    <div>
                        <a className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Due Date</a><br />
                        <input 
                            type="date"
                            {...register("invoice_due_date", {required: "Due date is required"})}
                            className={forms.input.date}
                        />
                        {errors.invoice_due_date && <p className="text-amber-600 text-sm">{errors.invoice_due_date?.message}</p>}
                    </div>
                
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related quotation</p>
                        <select
                            {...register("related_quotation")}
                            className={forms.select.partial}
                            onChange={onQuotationChange}
                        >
                            <option value="">select...</option>
                            {useMemo(() => quotations.map((quotation: QuotationDetails) => (
                                <option key={quotation.quotation_number} value={quotation.quotation_number}>
                                    {formatQuotationNumber()}{quotation.quotation_number} | {quotation.customer_name || '--'}
                                </option>
                            )), [customers])}
                        </select>
                    </div>
                
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Customer</p>
                        <select
                            {...register("customer")}
                            className={forms.select.partial}
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Customer Details</p>
                            <input 
                                type="text"
                                {...register("customer_details")}
                                className={forms.description}
                            />
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Description</p>
                            <input 
                                type="text"
                                {...register("description")}
                                className={forms.description}
                            />
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Prepared By</p>
                        <select
                            {...register("agent")}
                            className={forms.select.partial}
                        >
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

                <div className={layout.formSectionCol3}>
                    <div >
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Project</p>
                        <select
                            {...register("project")}
                            className={forms.select.partial}
                        >
                            <option value="">select...</option>
                            {useMemo(() => projects.map((project: ProjectProfileResponse) => (
                                <option key={project.project_code} value={project.project_code}>
                                    {project.project_name} - {formatProjectNumber()}{project.project_code}
                                </option>
                            )), [projects])}
                        </select>
                    </div>
                    
                    
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Currency...</p>
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
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Cancelled</p>
                        <input 
                            type="checkbox"
                            {...register("cancelled")}
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
                
                {/* LINES */}
                <div className="p-6">
                    <div className="w-full">
                        <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                            <colgroup>
                                {[
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-[5%] text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-1/15 text-center',
                                    'w-[5%] text-center',
                                    'w-[5%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                            <tr>
                                <th className={tables.headerCell}>Item</th>
                                <th className={tables.headerCell}>Description</th>
                                <th className={tables.headerCell}>Quantity</th>
                                <th className={tables.headerCell}>Unit of Measure</th>
                                <th className={tables.headerCell}>Price/Per Unit</th>
                                <th className={tables.headerCell}>Sub-Total</th>
                                <th className={tables.headerCell}>Taxable?</th>
                                <th className={tables.headerCell}>SST %</th>
                                <th className={tables.headerCell}>SST Amount</th>
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
                                    
                                    const quantity = Number(watch(`related_invoice.${index}.quantity`) || 0.00);
                                    const price_per_unit = Number(watch(`related_invoice.${index}.price_per_unit`) || 0.00);
                                    let tax_amount = Number(watch(`related_invoice.${index}.sst_percent`) || 0.00);
                                    const tax_inclusive = Number(watch(`related_invoice.${index}.taxable`) || false);

                                    let total = quantity * price_per_unit;

                                    if (!tax_inclusive) {
                                        tax_amount = 0.00;
                                    }
                                    const amount = quantity * price_per_unit
                                    const tax = tax_amount / 100
                                    const sstAmount = total * tax
                                    const fullTotal = amount + sstAmount



                                    return(
                                        <tr key={field.id} className={tables.row}>
                                            <td>
                                                <select
                                                    {...register(`related_invoice.${index}.item`)}
                                                    className={forms.select.full}
                                                >
                                                    <option value="">select...</option>
                                                    {productOptions}
                                                </select>
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    {...register(`related_invoice.${index}.description`)}
                                                    className={tables.text}
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`related_invoice.${index}.quantity`)}
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
                                                    {...register(`related_invoice.${index}.unit_of_measure`)}
                                                    className={tables.text}
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`related_invoice.${index}.price_per_unit`)}
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = decimalPlaces(Number(e.target.value));
                                                        }
                                                    }}
                                                    className={forms.input.number}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(total)}
                                                
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    {...register(`related_invoice.${index}.taxable`)}
                                                    type="checkbox"
                                                    className={forms.input.base}
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`related_invoice.${index}.sst_percent`) || 0.00}
                                                    type="number"
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = decimalPlaces(Number(e.target.value));
                                                        }
                                                    }}
                                                    className={forms.input.number}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(sstAmount)}
                                            </td>
                                                                                            
                                            <td className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>
                                                <select
                                                    {...register(`related_invoice.${index}.einvoice_classification_code`, {
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
                                                    {...register(`related_invoice.${index}.einvoice_tax_type`, {
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
                                                    {...register(`related_invoice.${index}.einvoice_tax_exemption_reason`)}
                                                    className={tables.text}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(fullTotal)}
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    {...register(`related_invoice.${index}.cancelled`)}
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
                                                    <Trash2 size={16}
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
                                                item: undefined, 
                                                description: undefined,
                                                quantity: 0, 
                                                unit_of_measure: undefined, 
                                                price_per_unit: 0.00,
                                                cancelled: false,
                                                taxable: false, 
                                                sst_percent: 0.00
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
                                    <div>Discount?</div>
                                    <input 
                                    {...register("discount")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Discount %</div>
                                    <input 
                                        type="number"
                                        {...register("discount_percent") || 0.00}
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
                                    <div>Taxable?</div>
                                    <input 
                                    {...register("taxable")}
                                    type="checkbox"
                                    className="ml-2 forced-colors:bg-green-300"
                                    />
                                </div>

                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <div>Tax %</div>
                                    <input 
                                        type="number"
                                        {...register("tax_percent") || 0.00}
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
                                    Creating Quotation...
                                </span>
                            ) : (
                                'Create Invoice'
                            )}
                        </button>
                    </div>
                </div>               
            </div>
        </form>
    );

};
export default InvoiceForm;
