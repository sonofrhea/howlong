import { CORE_ICONS } from "./ModuleIcons";
import { ROLES_OPTIONS } from "./Options";









export interface coreModuleInterface {
    id: keyof typeof CORE_ICONS;
    name: string;
    description: string;
    path: string;
    available: boolean;
};










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
  id: number;
  name: string;
  email: string;
};

export type Role = {
  name: typeof ROLES_OPTIONS[number]['value'] | null;
};
