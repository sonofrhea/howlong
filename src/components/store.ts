import { CurrencyInterface } from "../FullStack/Core/constants/Types";


let CURRENT_CURRENCY: CurrencyInterface | null = null;

export const setCurrency = (currency: CurrencyInterface) => {
    CURRENT_CURRENCY = currency
};

export const getCurrency = () => CURRENT_CURRENCY;

export const formatCurrency = (amount: number | string) => {
    if (!CURRENT_CURRENCY) return amount.toLocaleString();

    const value = Number(amount || 0);

    return `${CURRENT_CURRENCY.currency_symbol} ${value.toLocaleString()}`;
};

