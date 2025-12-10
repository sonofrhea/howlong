




export interface CurrencyInterface {
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
  country: string;
  buy: number;
  sell: number;
};



export interface BankInterface {
  bank_alias: string;
  bank_name: string;
  swift_code: string;
};



export interface AgentInterface {
  name: string;
  email: string;
};
