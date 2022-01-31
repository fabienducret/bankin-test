import { Account } from '@customtypes/Account';
import { Transaction } from '@customtypes/Transaction';

export interface IBankinApiAdapter {
  getAccounts(): Promise<Account[]>;
  getTransactions(accountNumber: string): Promise<Transaction[]>;
}
