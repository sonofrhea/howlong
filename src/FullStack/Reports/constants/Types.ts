import React, { useState } from "react";

import { REPORTS_ICONS } from "./ModuleIcons";

import { VALID_PERIOD_TYPES } from "./options";

export interface ReportsModulesInterface {
    id: keyof typeof REPORTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};


export type PeriodTypes = typeof VALID_PERIOD_TYPES[number];










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
// -------- BEGIN -----------TRIAL BALANCE REPORT----------------

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

// -------- END -----------TRIAL BALANCE REPORT----------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN -----------INCOME STATEMENT REPORT----------------

export type AccountArrayKeys = 
    | "revenue_accounts"
    | "sales_returns"
    | "sales_discounts_and_adjustment"
    | "cost_of_goods_sold"
    | "expense_accounts"
    | "other_taxes";

export type AccountDetails = {
    account_code: number;
    account_name: string;
    balance: number;
};

export type IncomeStatementResponse = {
    revenue_accounts: AccountDetails[],
    sales_returns: AccountDetails[],
    sales_discounts_and_adjustment: AccountDetails[],
    cost_of_goods_sold: AccountDetails[],
    expense_accounts: AccountDetails[],
    other_taxes: AccountDetails[],

    total_sales: string;
    sales_adjustments: string;
    total_cost_of_goods_sold: string;
    total_expense: string;
    total_taxes: string;
    net_sales: string;
    gross_profit_or_loss: string;
    net_profit_or_loss: string;
    net_profit_or_loss_after_tax: string;

    start_date: string;
    end_date: string;
    period: string;
};

