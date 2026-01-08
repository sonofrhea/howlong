import { AccountArrayKeys, IncomeStatementResponse } from "./Types";









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

