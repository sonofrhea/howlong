import apiClient from '../../BaseEngine';
import { BalanceSheetPeriodTypes, 
    BalanceSheetResponse, CashFlowPeriodTypes, CashFlowResponse, IncomeStatementResponse, 
    PeriodTypes } from './constants/Types';





// --------------------------------------------------------------------------------------------------------

// GENERAL LEDGER

export const fetchGeneralLedgerReport = async (start_date: string, end_date: string) => {
  try {
    const response = await apiClient.get(
      `/reports/generalledgerreport/general_ledger/?start_date=${start_date}&end_date=${end_date}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// --------------------------------------------------------------------------------------------------------

// TRIAL BALANCE

export const fetchTrialBalanceReport = async (start_date: string, end_date: string) => {
  try {
    const response = await apiClient.get(
      `/reports/trialbalancereport/trial_balance/?start_date=${start_date}&end_date=${end_date}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// --------------------------------------------------------------------------------------------------------

// INCOME STATEMENT

export const fetchIncomeStatementReport = async (period_type: PeriodTypes): Promise<IncomeStatementResponse[]> => {
  try {
    const response = await apiClient.get<IncomeStatementResponse[]>(
      `/reports/incomestatementreport/income_statement/?period_type=${period_type}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return[];
  }
};

// --------------------------------------------------------------------------------------------------------

// BALANCE SHEET

export const fetchBalanceSheet = async (period_type: BalanceSheetPeriodTypes): Promise<BalanceSheetResponse[]> => {
  try {
    const response = await apiClient.get<BalanceSheetResponse[]>(
      `/reports/balancesheetreport/balance_sheet/?period_type=${period_type}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return[];
  }
};

// --------------------------------------------------------------------------------------------------------

// CASH FLOW

export const fetchCashFlow = async (period_type: CashFlowPeriodTypes): Promise<CashFlowResponse[]> => {
  try {
    const response = await apiClient.get<CashFlowResponse[]>(
      `/reports/cashflowreport/cash_flow/?period_type=${period_type}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return[];
  }
};
