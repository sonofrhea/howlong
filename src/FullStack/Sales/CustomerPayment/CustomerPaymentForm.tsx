import React, { useEffect } from "react";
import { useForm } from "react-hook-form";


import { CurrencyInterface, AgentInterface} from "../../Core/Interfaces";
import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { CustomerPaymentInputs, InvoicePaymentInterface } from "../Constants/Types";
import { ProjectProfileResponse } from "../../Projects/constants/Types";
import { buttons, forms, layout, tables, text, utils } from "../Constants/Styles";
import { CustomerCreateResponse } from "../../Customers/constants/Types";



const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)};`
};


const formatPaymentNumber = () => {
    return `PAY-`;
};

const formatCustomerNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};

const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-`;
};
















const CustomerPaymentForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, currencies, 
    accounts, agents, customers, invoicePayments, projects }) => {

        const { register, handleSubmit, watch, setValue, control, 
            formState: { errors } } = useForm<CustomerPaymentInputs>({
                defaultValues: {
                    paid_amount: 0.00,
                    additional_bank_charges: 0.00,
                    outstanding: 0.00,
                    completed: true,
                    cancelled: false
                }
            });

        

        
        
        
        const selectedControlAccount = watch("account_received_in.account_code");
        useEffect(() => {
            if (selectedControlAccount) {
    
                const selectedCodeNumber = Number(selectedControlAccount);
                console.log("🔍 Converting:", selectedControlAccount, "→", selectedCodeNumber);
    
    
                const selectedAccount = accounts.find((a: ControlAccountInterface) => 
                    
                    a.account_code === selectedCodeNumber
                );
                console.log("✅ Found account:", selectedAccount);
    
                if (selectedAccount) {
                    setValue("account_received_in.account_name", selectedAccount.account_name);
                    setValue("account_received_in.account_type", selectedAccount.account_type);
                }
            }
        }, [selectedControlAccount, accounts, setValue]);





        const selectedPaymentInvoice = watch("related_payment");
        useEffect(() => {
            if (selectedPaymentInvoice) {

                const selectedPaymentNumber = Number(selectedPaymentInvoice);
                console.log("🔍 Converting:", selectedPaymentInvoice, "→", selectedPaymentNumber);

                const selectedPayment = invoicePayments.find((a: InvoicePaymentInterface) =>

                    a.invoice_payment_code === selectedPaymentNumber
                );
                console.log("✅ Found Invoice Payment:", selectedPayment);

                if (selectedPayment) {
                    setValue("related_payment_paid_amount", selectedPayment.net_aggregate_paid);
                    setValue("related_payment_paid_amount", selectedPayment.outstanding_amount);
                }
            }
        }, [selectedPaymentInvoice, invoicePayments, setValue]);











        

        




        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={forms.body}>
                    <div className={layout.header}>
                        <div className={layout.tag}>

                            <div className="text-right">
                                <div>
                                    <h1 className={text.badgeExtraLargeBlack}>CUSTOMER PAYMENT</h1>
                                    <p className="text-sm text-gray-500 mt-1">Official Record of Payment Already Posted</p>
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
                            <p className={forms.label}>Related Project</p>
                            <select
                                {...register("project")}
                                className={forms.select.partial}
                            >
                                <option value=""></option>
                                {projects.map((project: ProjectProfileResponse) => (
                                    <option key={project.project_code} value={project.project_code}>
                                        {formatProjectNumber()}{project.project_code} | {project.project_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                                                
                        <div>
                            <p className={forms.label}>Account Received In</p>
                            <select
                                {...register("account_received_in.account_code")}
                                className={forms.select.partial}
                            >
                                <option value=""></option>
                                {accounts.map((account: ControlAccountInterface) => (
                                    <option key={account.account_code} value={account.account_code}>
                                        {account.account_code} ({account.account_name})
                                    </option>
                                ))}
                            </select>

                            <input type="hidden" {...register("account_received_in.account_name")} />
                            <input type="hidden" {...register("account_received_in.account_type")} />
                        </div>
                                            
                        <div>
                            <p className={forms.label}>Customer</p>
                            <select
                                {...register("customer")}
                                className={forms.select.partial}
                            >
                                <option value=""></option>
                                {customers.map((customer: CustomerCreateResponse) => (
                                    <option key={customer.customer_number} value={customer.customer_number}>
                                        {formatCustomerNumber()}{customer.customer_number} | {customer.customer_name}
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
                                {invoicePayments.map((invoicePayment: InvoicePaymentInterface) => (
                                    <option key={invoicePayment.invoice_payment_code} value={invoicePayment.invoice_payment_code}>
                                        {formatPaymentNumber()}{invoicePayment.invoice_payment_code} | Total: {invoicePayment.net_aggregate_paid}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <p className={forms.label}>Related Payment Total</p>
                            <input 
                                {...register("related_payment_paid_amount")}
                                type="number"
                                readOnly
                                className={forms.input.midNumber}
                                placeholder="0.00"
                                step="0.01" min="0.00" onBlur={(e) => {
                                    if (e.target.value) {
                                        e.target.value = parseFloat(e.target.value).toFixed(2);
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <p className={forms.label}>Related Payment Outstanding</p>
                            <input 
                                {...register("related_payment_outstanding")}
                                type="number"
                                readOnly
                                className={forms.input.midNumber}
                                placeholder="0.00"
                                step="0.01" min="0.00" onBlur={(e) => {
                                    if (e.target.value) {
                                        e.target.value = parseFloat(e.target.value).toFixed(2);
                                    }
                                }}
                            />
                        </div>
                        
                        <div>
                            <p className={forms.label}>Cancelled</p>
                            <input 
                                {...register("cancelled")}
                                type="checkbox"
                            />
                        </div>
                        
                        <div>
                            <p className={forms.label}>Completed</p>
                            <input 
                                {...register("completed")}
                                type="checkbox"
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
                    </div>

                    <hr className="my-6 border-gray-200" />

                    <div className="p-6">
                        <div className="w-full">
                            <table className={tables.base}>
                                <colgroup>
                                    {[
                                        'w-1/4 text-center',
                                        'w-1/4 text-center',
                                        'w-1/4 text-center',
                                        'w-1/4 text-center',
                                        'w-[9%] text-center',
                                    ].map((line, index) => (
                                        <col key={index} className={line} />
                                    ))}
                                </colgroup>
                                <thead className={tables.header}>
                                    <tr>
                                        <th className={tables.headerCell}>Paid Amount</th>
                                        <th className={tables.headerCell}>Description</th>
                                        <th className={tables.headerCell}>Additional Charges</th>
                                        <th className={tables.headerCell}>Outstanding</th>
                                        <th className={tables.headerCell}></th>
                                    </tr>
                                </thead>

                                <tbody className={tables.body}>

                                    <tr>
                                        <td className={text.numbers}>
                                            <input 
                                                {...register("paid_amount")}
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
                                                {...register("description")}
                                                className={tables.text}
                                            />
                                        </td>

                                        <td className={text.numbers}>
                                            <input 
                                                {...register("additional_bank_charges")}
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

                                        <td className={text.numbers}>
                                            <input 
                                                {...register("outstanding")}
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
                                    </tr>
                                </tbody>
                            </table>
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
                                        Creating Payment Record...
                                    </span>
                                ) : (
                                    'Create Payment Record'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    export default CustomerPaymentForm;
