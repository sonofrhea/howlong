import React, { useState } from "react";

import { REPORTS_ICONS } from "./ModuleIcons";


export interface ReportsModulesInterface {
    id: keyof typeof REPORTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};










// -------- BEGIN -----------GENERAL LEDGER REPORT----------------


export type GeneralLedgerResponse = {
    account_title: string;
    opening_balance: number;
    total_debit: number;
    total_credit: number;
    ledger_lines: Array <{
        date: string;
        journal_number: number;
        jh_description: string;
        je_description: string;
        net_debit: number;
        net_credit: number;
        cancelled: boolean;
        local_balance: number;
    }>
};



// -------- END -----------GENERAL LEDGER REPORT----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN -----------GENERAL LEDGER REPORT----------------

export type TrialBalanceAccount = {
    account_code: number;
    account_name: string;
    account_type: string;
    opening_dr: number;
    opening_cr: number;
    period_dr: number;
    period_cr: number;
    month_dr: number;
    month_cr: number;
    year_dr: number;
    year_cr: number;
};

export type TrialBalanceTotals = {
    opening_dr: number;
    opening_cr: number;
    period_dr: number;
    period_cr: number;
    month_dr: number;
    month_cr: number;
    year_dr: number;
    year_cr: number;
};

export type TrialBalanceResponse = {
    accounts: TrialBalanceAccount[];
    totals: TrialBalanceTotals;
};