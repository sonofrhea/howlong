import { AccountArrayKeys, BalanceSheetAccountArray, BalanceSheetResponse, 
    CashFlowAccountArray, CashFlowResponse, IncomeStatementResponse } from "./Types";









export const getAllAccountNames = (
    dataArray: IncomeStatementResponse[],
    key: AccountArrayKeys
) => {
    const namesSet = new Set<string>();
    dataArray.forEach(data => {
        data[key]?.forEach((item) => namesSet.add(item.account_name));
    });
    return Array.from(namesSet);
};


export const getBalances = (
    data: IncomeStatementResponse,
    key: AccountArrayKeys,
    accountName: string
) => {
    const account = data[key]?.find(item => item.account_name === accountName);
    return account ? account.balance : 0.00;
};

// -----------------------BALANCE SHEET------------------

export const getAllBalanceSheetAccountNames = (
    dataArray: BalanceSheetResponse[],
    key: BalanceSheetAccountArray,
) => {
    const namesSet = new Set<string>();
    dataArray.forEach(data => {
        data[key]?.forEach((item) => namesSet.add(item.account_name))
    });
    return Array.from(namesSet);
};

export const getBalanceSheetBalances = (
    data: BalanceSheetResponse,
    key: BalanceSheetAccountArray,
    accountName: string
) => {
    const account = data[key]?.find(item => item.account_name === accountName);
    return account ? account.balance : 0.00;
};


// -----------------------CASH FLOW------------------

export const getAllCashFlowAccountNames = (
    dataArray: CashFlowResponse[],
    key: CashFlowAccountArray,
) => {
    const namesSet = new Set<string>();
    dataArray.forEach(data => {
        data[key]?.forEach((item) => namesSet.add(item.account_name))
    });
    return Array.from(namesSet);
};

export const getCashFlowBalances = (
    data: CashFlowResponse,
    key: CashFlowAccountArray,
    accountName: string
) => {
    const account = data[key]?.find(item => item.account_name === accountName);
    return account ? account.balance : 0.00;
}
