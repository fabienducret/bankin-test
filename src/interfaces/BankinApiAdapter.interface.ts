import { Account } from 'types/Account';
import { Transaction } from 'types/Transaction';

export interface IBankinApiAdapter {
  login(): Promise<string>;
  getToken(): Promise<string>;
  getAccounts(): Promise<Account[]>;
  getTransactions(accountNumber: string): Promise<Transaction[]>;
}
