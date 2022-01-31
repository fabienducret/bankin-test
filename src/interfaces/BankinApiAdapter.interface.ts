export interface IBankinApiAdapter {
  login(): Promise<string>;
  getToken(): Promise<string>;
  getAccounts(): Promise<Array<object>>;
  getTransactions(accountNumber: string): Promise<Array<object>>;
}
