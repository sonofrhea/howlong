import React, { useState } from "react";

import { REPORTS_ICONS } from "./ModuleIcons";

import { BALANCE_SHEET_CHOICES,
    CASH_FLOW_CHOICES, VALID_PERIOD_TYPES } from "./options";

export interface ReportsModulesInterface {
    id: keyof typeof REPORTS_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};


export type PeriodTypes = typeof VALID_PERIOD_TYPES[number];

export type BalanceSheetPeriodTypes = typeof BALANCE_SHEET_CHOICES[number];

export type CashFlowPeriodTypes = typeof CASH_FLOW_CHOICES[number];








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
    revenue_accounts: AccountDetails[];
    sales_returns: AccountDetails[];
    sales_discounts_and_adjustment: AccountDetails[];
    cost_of_goods_sold: AccountDetails[];
    expense_accounts: AccountDetails[],
    other_taxes: AccountDetails[];

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

// -------- END -----------INCOME STATEMENT REPORT------------------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN -----------BALANCE SHEET------------------------------

export type BalanceSheetAccountArray = 
    | "current_assets"
    | "contra_current_assets"
    | "fixed_assets"
    | "contra_fixed_assets"
    | "other_assets"
    | "other_contra_assets"
    | "current_liabilities"
    | "long_term_liabilities"
    | "shareholder_equity"
    | "owner_draws_and_dividend";

export type BalanceSheetResponse = {
    current_assets: AccountDetails[];
    contra_current_assets: AccountDetails[];
    fixed_assets: AccountDetails[];
    contra_fixed_assets: AccountDetails[];
    other_assets: AccountDetails[];
    other_contra_assets: AccountDetails[];
    current_liabilities: AccountDetails[];
    long_term_liabilities: AccountDetails[];
    shareholder_equity: AccountDetails[];
    owner_draws_and_dividend: AccountDetails[];

    total_current_assets: string;
    total_fixed_assets: string;
    total_other_assets: string;
    total_current_liabilities: string;
    total_long_term_liabilities: string;
    total_equity_and_draws: string;

    net_income: string;

    total_assets: string;
    total_liabilities: string;
    total_equity: string;
    equity_liabilities: string;

    period: string;
};

// -------- END -----------BALANCE SHEET------------------------
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// -------- BEGIN -----------CASH FLOW------------------------------

export type CashFlowAccountArray =
    | "revenue_accounts"
    | "sales_returns"
    | "sales_discounts_and_adjustment"
    | "cost_of_goods_sold"
    | "expense_accounts"
    | "other_taxes"
    | "depreciation"
    | "accounts_receivables"
    | "inventories"
    | "prepaid_expenses"
    | "wip_assets"
    | "allowance_for_doubtful_accounts"
    | "accounts_payable"
    | "accruals"
    | "unearned_revenue"
    | "fixed_assets"
    | "contra_fixed_assets"
    | "other_assets"
    | "equity_and_owner_draws"
    | "long_term_liabilities"
    | "cash";


export type CashFlowResponse = {
    revenue_accounts: AccountDetails[];
    sales_returns: AccountDetails[];
    sales_discounts_and_adjustment: AccountDetails[];
    cost_of_goods_sold: AccountDetails[];
    expense_accounts: AccountDetails[];
    other_taxes: AccountDetails[];
    depreciation: AccountDetails[];
    accounts_receivables: AccountDetails[];
    inventories: AccountDetails[];
    prepaid_expenses: AccountDetails[];
    wip_assets: AccountDetails[];
    allowance_for_doubtful_accounts: AccountDetails[];
    accounts_payable: AccountDetails[];
    accruals: AccountDetails[];
    unearned_revenue: AccountDetails[];
    fixed_assets: AccountDetails[];
    contra_fixed_assets: AccountDetails[];
    other_assets: AccountDetails[];
    equity_and_owner_draws: AccountDetails[];
    long_term_liabilities: AccountDetails[];
    cash: AccountDetails[];

    total_sales: string;
    sales_adjustments: string;
    total_cost_of_goods_sold: string;
    total_expense: string;
    total_taxes: string;
    operating_cash: string;
    investing_cash: string;
    financing_cash: string;
    total_cash_flow: string;
    net_profit_before_tax: string;  
    cash_balance: string;
    cash_at_beginning: string;

    period: string;
}


export type CashFLowProps = {
    cashFlow: CashFlowResponse[],
    periodType: CashFlowPeriodTypes
};




// -------- END -----------CASH FLOW------------------------