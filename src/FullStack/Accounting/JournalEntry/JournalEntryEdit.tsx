import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { JournalHeaderInputs, JournalHeaderProps } from "../Constants/Types";



import { Trash2 } from 'lucide-react';

import { ControlAccountInterface } from "../../ChartOfAccounts/Interfaces";
import { buttons, forms, labelStyles, layout, tables, text, utils } from "../Constants/Styles";
import { journalEntryAccountHandler } from "../../handlers";


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`
};

const formatJournalNumber = () => {
    const currentYear = new Date().getFullYear();
    return `JV-${currentYear}-`
};







const JournalEntryEdit: React.FC<JournalHeaderProps> = ({
    journalEntry,
    onSubmit,
    isSubmitting,
    onCancel,
    accounts
}) => {
    const journalEntryId = journalEntry?.journal_number;
                                    
    const onAccountSelect = useMemo(() => 
        accounts.map((account: ControlAccountInterface) => (
            <option key={account.account_code} value={account.account_code}>
                {account.account_code} | {account.account_name}
            </option>
    )), [accounts])

    const { register, handleSubmit, watch, setValue, control, 
        reset, formState: { errors } } = useForm<JournalHeaderInputs>({
            defaultValues: journalEntry
        });

    React.useEffect(() => {
        if (!journalEntry) return;

        const updated = {
            ...journalEntry,
            date: journalEntry.date
                ? new Date(journalEntry.date).toISOString().split("T")[0]
                : "",
        }
        
        reset(updated);
    }, [journalEntry, reset]);


        
    const { fields, append, remove } = useFieldArray({
        name: 'journal_entries',
        control
    });









    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={forms.body}>
                <div className={layout.header}>
                    <div className={layout.tag}>
                    
                        <div className="text-right">
                            <div className={layout.badge}>
                                <div className={text.badgeLarge}>
                                    JOURNAL ENTRY DETAILS
                                </div>
                                <p className={labelStyles}>
                                    {formatJournalNumber()}{journalEntry.journal_number}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                <div className={layout.formSectionCol2}>
                    <div>
                        <label className="text-sm font-medium">Date:</label>
                        <input 
                            type="date"
                            {...register("date", {required: "Due date required"})}
                            className="ml-2 border px-2 py-1"
                        />
                        {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                            <input 
                                type="checkbox"
                                className="mr-2"
                                {...register("cancelled")}
                            />
                            <span className="text-sm font-medium">
                                Cancelled
                            </span>
                        </label>
                    </div>
                </div>

                <div className="m-10">
                    <p className={forms.label}>Description: </p>
                    <textarea 
                        {...register("description")}
                        className={forms.description}
                        placeholder="enter transaction description..."
                    />
                </div>

                <hr className="my-6 border-gray-200" />

                <div className="p-6">
                    <div className="w-full">
                        <table className="w-full table-fixed divide-y border divide-x divide-gray-200 drop-shadow-md shadow-inner">
                            <colgroup>
                                {[
                                    'w-[8%] text-center',
                                    'w-[29%] text-center',
                                    'w-[29%] text-center',
                                    'w-[13%] text-center',
                                    'w-[13%] text-center',
                                    'w-[7%] text-center',
                                    'w-[5%] text-center',
                                ].map((line, index) => (
                                    <col key={index} className={line} />
                                ))}
                            </colgroup>
                            <thead className={tables.header}>
                                <tr>
                                    <th className={tables.headerCell}>Account</th>
                                    <th className={tables.headerCell}>Account Details</th>
                                    <th className={tables.headerCell}>Description</th>
                                    <th className={tables.headerCell}>Debit</th>
                                    <th className={tables.headerCell}>Credit</th>
                                    <th className={tables.headerCell}>Cancelled</th>
                                    <th className={tables.headerCell}></th>
                                </tr>
                            </thead>
                            <tbody className={tables.body}>
                                {fields.length > 0 ? fields.map((field, index) => {
                                    const onAccountChange = journalEntryAccountHandler(accounts, setValue, index);

                                    return(
                                        <tr key={field.id} className={tables.row}>
                                            <td>
                                                <select
                                                    {...register(`journal_entries.${index}.account.account_code`)}
                                                    onChange={onAccountChange}
                                                    className={forms.select.full}
                                                >
                                                    <option value="">Select account...</option>
                                                    {onAccountSelect}
                                                </select>

                                                <input type="hidden" {...register(`journal_entries.${index}.account.account_type`)} />
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    type="text"
                                                    className={tables.text}
                                                    {...register(`journal_entries.${index}.account.account_name`)}
                                                    readOnly
                                                />
                                            </td>

                                            <td className={tables.cell}>
                                                <input 
                                                    type="text"
                                                    className={tables.text}
                                                    {...register(`journal_entries.${index}.description`)}
                                                />
                                            </td>

                                            <td className={text.numbers}>
                                                <input 
                                                    {...register(`journal_entries.${index}.net_debit`)}
                                                    className={forms.input.number}
                                                    type="number"
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
                                                    {...register(`journal_entries.${index}.net_credit`)}
                                                    className={forms.input.number}
                                                    type="number"
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
                                                    {...register(`journal_entries.${index}.cancelled`)}
                                                />
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    title="remove"
                                                    onClick={() => remove(index)}
                                                >
                                                    <Trash2 size={16}/>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={7}
                                            className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                                            <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                            <p className="text-slate-600 font-medium">No journal entry added yet</p>
                                            <p className="text-sm text-slate-500 mt-1">Click "Add entry"</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="font-bold bg-gray-100">
                                    <td colSpan={3} className={tables.headerCell}>
                                        Total:
                                    </td>

                                    <td className={text.numbers}>
                                        <input 
                                            type="number"
                                            {...register("aggregate_debit")}
                                            className={forms.input.number}
                                            placeholder="0.00"
                                            step="0.01" min="0.00" 
                                            value={decimalPlaces(
                                                fields.reduce((sum, field, index) => {
                                                    const debit = Number(watch(`journal_entries.${index}.net_debit`) || 0.00);
                                                    return sum + debit;
                                                }, 0.00)
                                            )}
                                            readOnly
                                        />
                                    </td>

                                    <td className={text.numbers}>
                                        <input 
                                            type="number"
                                            {...register("aggregate_credit")}
                                            className={forms.input.number}
                                            placeholder="0.00"
                                            step="0.01" min="0.00"
                                            value={decimalPlaces(
                                                fields.reduce((sum, field, index) => {
                                                    const credit = Number(watch(`journal_entries.${index}.net_credit`) || 0.00);
                                                    return sum + credit;
                                                }, 0.00)
                                            )}
                                            readOnly
                                        />
                                    </td>

                                    <td className={tables.cell}></td>
                                    <td className={tables.cell}></td>
                                </tr>
                                <tr>
                                    <td className={tables.addEntry} colSpan={2}>
                                        <button
                                            type="button"
                                            onClick={() => append({
                                                account: {
                                                    account_code: 0,
                                                    account_name: "",
                                                    account_type: ""
                                                },
                                                description: "",
                                                net_debit: 0.00,
                                                net_credit: 0.00,
                                                cancelled: false
                                            })}
                                            >
                                            ++ Add entry
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
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
                                    Updating Journal Entry...
                                </span>
                            ) : (
                                'Update Journal Entry'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCancel(journalEntryId)}
                            className={buttons.secondary}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
export default JournalEntryEdit;