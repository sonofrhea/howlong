import apiClient from '../../BaseEngine';


// Request interceptor for auth headers
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});



// --------------------------------------------------------------------------------------------------------

// GENERAL LEDGER

export const fetchGeneralLedgerReport = async (start_date: string, end_date: string) => {
    const response = await apiClient.get(
        `/reports/generalledgerreport/general_ledger/?start_date=${start_date}&end_date=${end_date}`
    );
    return response.data;
}

// --------------------------------------------------------------------------------------------------------
