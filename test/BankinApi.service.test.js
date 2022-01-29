import { describe, it, before } from 'mocha';
import chai from 'chai';
import { injectDependencies } from '../src/di.js';
import { BankinApiAdapter } from './fakes/adapters/BankinApi.adapter.js';

const expect = chai.expect;

describe('BankinApi component', () => {
  let bankinApiService;

  before(() => {
    const di = injectDependencies({ bankinApiAdapter: BankinApiAdapter });
    bankinApiService = di.resolve('bankinApiService');
  });

  it('Gets a valid list of accounts', async () => {
    const accounts = await bankinApiService.getAccounts();
    expect(accounts.length).to.eq(3);
  });

  it('Gets a valid list of transactions promised', async () => {
    const transactionsPromised =
      await bankinApiService.parseAccountsAndGetTransactionsPromised([
        '000000001',
        '000000002',
      ]);
    expect(transactionsPromised.length).to.eq(2);
  });

  it('Gets a valid list of accounts and transactions', async () => {
    const accountsAndTransactions =
      await bankinApiService.getAccountsAndTransactions();
    expect(accountsAndTransactions.length).to.eq(3);
  });
});
