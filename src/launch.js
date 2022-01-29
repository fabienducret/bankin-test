import { injectDependencies } from './di.js';

export const launch = async () => {
  const di = injectDependencies();
  const bankinApiService = di.resolve('bankinApiService');

  const accountsAndTransactions =
    await bankinApiService.getAccountsAndTransactions();

  console.log(accountsAndTransactions);

  process.exit(0);
};
