import { IBankinApiAdapter } from '../interfaces/BankinApiAdapter.interface';
import { IBankinApiService } from 'interfaces/BankinApiService.interface';
import { Account } from '@customtypes/Account';
import { AccountWithTransactions } from '@customtypes/AccountWithTransactions';

export class BankinApiService implements IBankinApiService {
  private bankinApiAdapter: IBankinApiAdapter;

  constructor({ bankinApiAdapter }) {
    this.bankinApiAdapter = bankinApiAdapter;
  }

  async getAccounts(): Promise<Array<Account>> {
    return await this.bankinApiAdapter.getAccounts();
  }

  async parseAccountsAndGetTransactionsPromised(accounts: Array<Account>) {
    return accounts.map(async (account) => {
      const transactions = await this.bankinApiAdapter.getTransactions(
        account.acc_number
      );

      return {
        acc_number: account.acc_number,
        amount: account.amount,
        transactions,
      };
    });
  }

  async getAccountsAndTransactions(): Promise<AccountWithTransactions[]> {
    const accounts = await this.getAccounts();

    const transactionsPromised =
      await this.parseAccountsAndGetTransactionsPromised(accounts);
    const accountsAndTransactions = await Promise.all(transactionsPromised);

    return accountsAndTransactions;
  }
}
