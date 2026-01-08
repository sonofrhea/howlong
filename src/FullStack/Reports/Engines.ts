import apiClient from '../../BaseEngine';
import { IncomeStatementResponse, PeriodTypes } from './constants/Types';





// --------------------------------------------------------------------------------------------------------

// GENERAL LEDGER

export const fetchGeneralLedgerReport = async (start_date: string, end_date: string) => {
    const response = await apiClient.get(
        `/reports/generalledgerreport/general_ledger/?start_date=${start_date}&end_date=${end_date}`
    );
    return response.data;
}

// --------------------------------------------------------------------------------------------------------

// TRIAL BALANCE

export const fetchTrialBalanceReport = async (start_date: string, end_date: string) => {
    const response = await apiClient.get(
        `/reports/trialbalancereport/trial_balance/?start_date=${start_date}&end_date=${end_date}`
    );
    return response.data;
}

// --------------------------------------------------------------------------------------------------------

// INCOME STATEMENT

export const fetchIncomeStatementReport = async (period_type: PeriodTypes): Promise<IncomeStatementResponse[]> => {
    const response = await apiClient.get<IncomeStatementResponse[]>(
        `/reports/incomestatementreport/income_statement/?period_type=${period_type}`
    );
    return response.data;
}

// --------------------------------------------------------------------------------------------------------
