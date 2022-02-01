import { AccountWithTransactions } from '@customtypes/AccountWithTransactions';

export interface IBankinApiService {
  getAccountsAndTransactions(): Promise<AccountWithTransactions[]>;
}
