import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";


import { PaymentVoucherFormProps, PaymentVoucherInputs } from "../Constants/Types";

import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";

import { paymentVoucherAccountHandler } from "../../handlers";

import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";
import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { Trash2 } from "lucide-react";




const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};



const formatSupplierNumber = () => {
    const currentYear = new Date().getFullYear();
    return `SUP-${currentYear}-`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};










const PaymentVoucherForm: React.FC<PaymentVoucherFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    suppliers, 
    currencies,
    accounts,
    agents,
    projects
}) => {

        const { register, setValue, formState: { errors }, 
        handleSubmit, control, watch } = useForm<PaymentVoucherInputs>({
            defaultValues: {
                payment_voucher_lines: [
                    {
                        amount: 0.00,
                        tax_inclusive: false,
                        tax: 0.00,
                        cancelled: false
                    }
                ],
                tax_inclusive: false,
                tax: 0.00,
                cancelled: false
            }
        });



        const { append, remove, fields } = useFieldArray({
            name: 'payment_voucher_lines',
            control
        })


const onAccountChange = paymentVoucherAccountHandler(accounts, setValue);  




    


    


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>

                        <div className="text-right">
                            <div className={layout.badge}>
                                <div className={text.badgeLarge}>NEW</div>
                                <div className={text.badgeLarge1x}>
                                    PAYMENT VOUCHER
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className={layout.formSectionCol3}>
                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Date</p>
                        <input 
                            type="date"
                            {...register("date", {required: 'Date is required'})}
                            className={forms.input.date}
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Account Paid by</p>
                        <select
                            {...register("account_paid_by.account_code")}
                            className={forms.select.partial}
                            onChange={onAccountChange}
                        >
                            <option value="">Select account...</option>
                            {useMemo(() => accounts.map((account: ControlAccountInterface) => (
                                <option key={account.account_code} value={account.account_code}>
                                    {account.account_code} - ({account.account_name})
                                </option>
                            )), [accounts])}
                        </select>

                        <input type="hidden" {...register("account_paid_by.account_name")} />
                        <input type="hidden" {...register("account_paid_by.account_type")} />
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Payment To</p>
                        <select
                            {...register("payment_to")}
                            className={forms.select.partial}
                        >
                            <option value="">Select supplier...</option>
                            {useMemo(() => suppliers.map((supplier: SupplierProfileResponse) => (
                                <option key={supplier.supplier_code} value={supplier.supplier_code}>
                                    {formatSupplierNumber()}{supplier.supplier_code} | {supplier.supplier_name}
                                </option>
                            )), [suppliers])}
                        </select>
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Related Project</p>
                        <select
                            {...register("project")}
                            className={forms.select.partial}
                        >
                            <option value="">Select project...</option>
                            {useMemo(() => projects.map((project: ProjectProfileResponse) => (
                                <option key={project.project_code} value={project.project_code}>
                                    {formatProjectNumber()}{project.project_code} - {project.project_name}
                                </option>
                            )), [projects])}
                        </select>
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

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Cancelled</p>
                        <input 
                            type="checkbox"
                            {...register("cancelled")}
                        />
                    </div>

                    <div>
                        <p className={forms.label} style={{ fontFamily: 'Montserrat, system-ui', fontSize: '12px' }}>Description</p>
                        <textarea
                            rows={2}
                            {...register("description")}
                            className={forms.bigDescription}
                        />
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className={tables.base}>
                            <colgroup>
                            {[
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-1/8 text-center',
                                'w-[7%] text-center',
                            ].map((line, index) => (
                                <col key={index} className={line} />
                            ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Description</th>
                                    <th className={tables.headerCell}>GST Number</th>
                                    <th className={tables.headerCell}>Amount</th>
                                    <th className={tables.headerCell}>SST Inclusive</th>
                                    <th className={tables.headerCell}>SST %</th>
                                    <th className={tables.headerCell}>SST Rate</th>
                                    <th className={tables.headerCell}>Net Total</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>

                            <tbody className={tables.body}>
                                {fields.map((field, index) => {
                                    const tax_percentage = Number(watch(`payment_voucher_lines.${index}.tax`) || 0.00) / 100;
                                    const amount = Number(watch(`payment_voucher_lines.${index}.amount`));
                                    const taxAmount = tax_percentage * amount;
                                    const netTotal = amount - taxAmount;
                                    
                                    return(
                                    <tr key={field.id} className={tables.row}>
                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`payment_voucher_lines.${index}.description`)}
                                                className={forms.bigDescription}
                                            />
                                        </td>

                                        <td className={tables.cell}>
                                            <input 
                                                {...register(`payment_voucher_lines.${index}.gst_number`)}
                                                className={tables.text}
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                type="number"
                                                {...register(`payment_voucher_lines.${index}.amount`)}
                                                className={forms.input.number}
                                                placeholder="0.00" step="0.01" min="0.00"
                                                onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}
                                            />
                                        </td>
                                        
                                        <td className={tables.cell}>
                                            <input
                                                type="checkbox"
                                                {...register(`payment_voucher_lines.${index}.tax_inclusive`)} 
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                type="number"
                                                {...register(`payment_voucher_lines.${index}.tax`)}
                                                className={forms.input.number}
                                                placeholder="0.00" step="0.01" min="0.00"
                                                onBlur={(e) => {
                                                    if (e.target.value) {
                                                        e.target.value = decimalPlaces(Number(e.target.value));
                                                    }
                                                }}
                                            />
                                        </td>

                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(taxAmount)}
                                        </td>

                                        <td className={tables.autoCalculate}>
                                            {decimalPlaces(netTotal)}
                                        </td>
                                        
                                        <td className={tables.cell}>
                                            <input
                                                type="checkbox"
                                                {...register(`payment_voucher_lines.${index}.cancelled`)} 
                                            />
                                        </td>

                                        <td>
                                            <button 
                                                type="button"
                                                title="remove"
                                                onClick={() => remove(index)}
                                            >
                                                <Trash2 size={16} strokeWidth={1.5}
                                                className="text-black cursor-pointer"/>
                                            </button> 
                                            
                                        </td>
                                    </tr>
                                    );
                                })}
                                <tr>
                                    <td className={tables.headerCell} colSpan={2}>
                                        <button
                                            type="button"
                                            onClick={() => append({
                                                description: "",
                                                gst_number: "",
                                                amount: 0.00,
                                                tax_inclusive: false,
                                                tax: 0.00,
                                                cancelled: false,
                                            })}
                                        >
                                            ++ Add Entry
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
                                            {...register("tax")}
                                            className={forms.input.smallNumber}
                                            placeholder="0.00"
                                            step="0.01" min="0.00" onBlur={(e) => {
                                                if (e.target.value) {
                                                    e.target.value = parseFloat(e.target.value).toFixed(2);
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

                    <div className={layout.submitSection}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={buttons.primary}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <div className={utils.spinner}></div>
                                    Creating Payment Voucher...
                                </span>
                            ) : (
                                'Create Payment Voucher'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default PaymentVoucherForm;


