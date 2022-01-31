import { IBankinApiAdapter } from '../interfaces/BankinApi.interface';

export class BankinApiService {
  private bankinApiAdapter: IBankinApiAdapter;

  constructor({ bankinApiAdapter }) {
    this.bankinApiAdapter = bankinApiAdapter;
  }

  async getAccounts() {
    return await this.bankinApiAdapter.getAccounts();
  }

  async parseAccountsAndGetTransactionsPromised(accounts) {
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

  async getAccountsAndTransactions() {
    const accounts = await this.getAccounts();

    const transactionsPromised =
      await this.parseAccountsAndGetTransactionsPromised(accounts);
    const accountsAndTransactions = await Promise.all(transactionsPromised);

    return accountsAndTransactions;
  }
}
