export class BankinApiService {
  constructor({ bankinApiAdapter }) {
    this.bankinApiAdapter = bankinApiAdapter;
  }

  async generateBearer() {
    const login = await this.bankinApiAdapter.login();
    this.bearerToken = await this.bankinApiAdapter.getToken(login);
  }

  async getAccounts() {
    return await this.bankinApiAdapter.getAccounts(this.bearerToken);
  }

  async parseAccountsAndGetTransactionsPromised(accounts) {
    return accounts.map(async ({ acc_number, amount }) => {
      const transactions = await this.bankinApiAdapter.getTransactions(
        acc_number,
        this.bearerToken
      );

      // console.log(acc_number);

      return {
        acc_number,
        amount,
        transactions,
      };
    });
  }

  async getAccountsAndTransactions() {
    await this.generateBearer();
    const accounts = await this.getAccounts();

    const transactionsPromised =
      await this.parseAccountsAndGetTransactionsPromised(accounts);

    const accountsAndTransactions = await Promise.all(transactionsPromised);

    return accountsAndTransactions;
  }
}
