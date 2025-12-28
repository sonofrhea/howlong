import React, { useState } from "react";
import { ACCOUNTING_ICONS } from "./ModuleIcons";








export interface AccountingModuleInterface {
    id: keyof typeof ACCOUNTING_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
}











// -------- BEGIN ----------- JOURNAL INPUT ----------------

export type JournalEntryList = {
    journal_number: number;
    date: string;
    description: string;
    cancelled: string;
    aggregate_debit: number;
    aggregate_credit: number;
};

export type JournalHeaderInputs = {
    date: string;
    description: string;
    journal_entries: Array<{
        account: {
            account_code: number;
            account_name: string;
            account_type: string; 
        };
        description: string;
        net_debit: number;
        net_credit: number;
        cancelled: boolean; 
    }>;
    aggregate_debit: number;
    aggregate_credit: number;
    cancelled: boolean;
};


export type JournalHeaderResponse = {
    journal_number: number;
};

export type AllJournalHeaderInputs = {
    journal_number: number;
    journalEntryData: JournalHeaderInputs;
};


export type EditJournalHeaderInputs = {
    journalEntryId: number;
    journalEntryData: JournalHeaderInputs;
};



// -------- END ----------- JOURNAL INPUT ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// --------BEGIN-----------INCOME AND EXPENSES FORM----------------

export type IncomeAndExpensesList = {
    reference_number: number;
    date: string;
    category: string;
    description: string;
    currency: string;
    net_debit: number;
    net_credit: number;
    running_balance: number;
};

export type IncomeAndExpensesInputs = {
    date: string;
    account: {
        account_code: number;
        account_name: string;
        account_type: string;
    };
    category: string;
    description: string;
    currency: string;
    gross_debit: number;
    gross_credit: number;
    tax: number;
    cancelled: boolean;
};

export type IncomeAndExpensesResponse = {
    reference_number: number;
};

export type AllIncomeAndExpenses = {
    reference_number: number;
    incomeAndExpensesData: IncomeAndExpensesInputs;
};

export type EditIncomeAndExpenses = {
    incomeAndExpenseId: number;
    incomeAndExpensesData: IncomeAndExpensesInputs;
};


// -------- END ----------- INCOME AND EXPENSES ----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////