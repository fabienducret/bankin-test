export interface IBankinApiAdapter {
  login(): Promise<string>;
  getToken(): Promise<string>;
  getAccounts(): Promise<object>;
  getTransactions(accountNumber: string): Promise<object>;
}
