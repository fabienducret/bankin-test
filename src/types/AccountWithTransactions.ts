import { Transaction } from './Transaction';

export type AccountWithTransactions = {
  acc_number: string;
  amount: string;
  transactions: Transaction[];
};
