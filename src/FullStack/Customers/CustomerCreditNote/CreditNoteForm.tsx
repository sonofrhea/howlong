import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { forms, buttons, layout, tables, text, utils } from "../constants/Styles";

import { Trash2 } from "lucide-react";
import { CreditNoteInputs, CustomerCreateResponse } from "../constants/Types";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { AgentInterface, CurrencyInterface } from "../../Core/constants/Types";
import { CustomerPaymentResponse } from "../../Sales/Constants/Types";



const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};


const formatCustomerNumber = () => {
        const currentYear = new Date().getFullYear();
        return `CV-${currentYear}-`;
};



const formatCreditNoteNumber = () => {
        const currentYear = new Date().getFullYear();
        return `CN-${currentYear}-`;
};



const CreditNoteForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, customers, 
    currencies, accounts, agents, customerPayments }) => {


        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors } } = useForm<CreditNoteInputs>({
                defaultValues: {
                    related_payment_amount: 0.00,
                    tax_inclusive: false,
                    tax_amount: 0.00,
                    credit_note_lines: [
                        {
                            description: "",
                            amount: 0.00,
                            tax_inclusive: false,
                            tax_amount: 0.00,
                            cancelled: false
                        }
                    ]
                }
            });
        
        const { fields, append, remove } = useFieldArray({
            name: "credit_note_lines",
            control
        });






        const selectedControlAccount = watch("account.account_code");
            useEffect(() => {
                if (selectedControlAccount) {
        
                    const selectedCodeNumber = Number(selectedControlAccount);
                    console.log("🔍 Converting:", selectedControlAccount, "→", selectedCodeNumber);
        
        
                    const selectedAccount = accounts.find((a: ControlAccountInterface) => 
                        
                        a.account_code === selectedCodeNumber
                    );
                    console.log("✅ Found account:", selectedAccount);
        
                    if (selectedAccount) {
                        setValue("account.account_name", selectedAccount.account_name);
                        setValue("account.account_type", selectedAccount.account_type);
                    }
                }
        }, [selectedControlAccount, accounts, setValue]);










        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={forms.body}>
                    <div className={layout.header}>
                        <div className={layout.tag}>
    
                            <div className="text-right">
                                <div className={layout.badge}>
                                    <div className={text.badgeSmall}>NEW</div>
                                    <div className={text.badgeLarge}>
                                        CUSTOMER CREDIT NOTE
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />
                                    
                    <div className={layout.formSectionCol3}>
                        <div>
                            <p className={forms.label}>Date</p>
                            <input 
                                type="date"
                                {...register("date")}
                                className={forms.input.date}
                            />
                        </div>
    
                        <div>
                            <p className={forms.label}>Bill To...</p>
                            <select
                                {...register("customer")}
                                className={forms.select.partial}
                            >
                                <option value=""></option>
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
                                {...register("account.account_code")}
                                className={forms.select.partial}
                            >
                                <option value=""></option>
                                {accounts.map((account: ControlAccountInterface) => (
                                    <option key={account.account_code} value={account.account_code}>
                                        {account.account_code} ({account.account_name})
                                    </option>
                                ))}
                            </select>
    
                            <input type="hidden" {...register("account.account_name")} />
                            <input type="hidden" {...register("account.account_type")} />
                        </div>
    
                        <div>
                            <p className={forms.label}>Agent</p>
                            <select className={forms.select.partial}
                                {...register("agent")}>
                                    <option value=""></option>
                                    {agents.map((agent: AgentInterface) => (
                                        <option key={agent.name} value={agent.name}>
                                            {agent.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
    
                        <div>
                            <p className={forms.label}>Related Payment</p>
                            <select
                                {...register("related_payment")}
                                className={forms.select.partial}
                            >
                                <option value=""></option>
                                {customerPayments.map((payment: CustomerPaymentResponse) => (
                                    <option key={payment.payment_number} value={payment.payment_number}>
                                        POST-{payment.payment_number} | Paid Amount: {payment.paid_amount}
                                    </option>
                                ))}
                            </select>
                        </div>
    
                        <div>
                            <p className={forms.label}>Paid Amount</p>
                            <input 
                                {...register("paid_amount")}
                                type="number"
                                title="enter paid amount..."
                                className={forms.select.partial}
                                placeholder="0.00"
                                step="0.01" min="0.00" onBlur={(e) => {
                                    if (e.target.value) {
                                        e.target.value = parseFloat(e.target.value).toFixed(2);
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
                                <option value=""></option>
                                {currencies.map((currency: CurrencyInterface) => (
                                    <option key={currency.currency_code} value={currency.currency_code}>
                                        {currency.currency_code}
                                    </option>
                                ))}
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
                                    <th className={tables.headerCell}>Tax Inclusive?</th>
                                    <th className={tables.headerCell}>Tax %</th>
                                    <th className={tables.headerCell}>Current Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                                <tbody className={tables.body}>
                                    {fields.map((field, index) => (
                                        <tr key={field.id} className={tables.row}>
                                            <td>
                                                <input 
                                                    type="date"
                                                    {...register(`credit_note_lines.${index}.date`)}
                                                    className={forms.input.date}
                                                />
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    {...register(`credit_note_lines.${index}.description`)}
                                                    className={tables.text}
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`credit_note_lines.${index}.amount`)}
                                                    type="number"
                                                    className={forms.input.number}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}                                                
                                                />
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    type="checkbox"
                                                    {...register(`credit_note_lines.${index}.tax_inclusive`)}
                                                    className="text-black cursor-pointer"
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`credit_note_lines.${index}.tax_amount`) || 0.00}
                                                    type="number"
                                                    className={forms.input.number}
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = parseFloat(e.target.value).toFixed(2);
                                                        }
                                                    }}
                                                />
                                            </td>

                                            <td className={tables.autoCalculate}>
                                                {decimalPlaces(
                                                    (Number(watch(`credit_note_lines.${index}.amount`) || 0.00) *
                                                    (1 + (Number(watch(`credit_note_lines.${index}.tax_amount`) / 100 ))|| 0.00))
                                                )}
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
                                    <tr >
                                        <td className={tables.headerCell}>
                                            <button
                                                type="button"
                                                onClick={() => append({
                                                    date: "",
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
                                    <span className="flex items-center gap-2">
                                        <div className={utils.spinner}></div>
                                        Creating Credit Note...
                                    </span>
                                ) : (
                                    'Create Credit Note'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );

    };
    export default CreditNoteForm;
