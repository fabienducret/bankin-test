import { getFakesAccounts, getFakesTransactions } from '../fakes.js';

export class BankinApiAdapter {
  constructor() {}

  async login() {
    return 'logintoken';
  }

  async getToken() {
    return 'bearertoken';
  }

  async getAccounts() {
    return getFakesAccounts();
  }

  async getTransactions(accountNumber) {
    return getFakesTransactions(accountNumber);
  }
}
