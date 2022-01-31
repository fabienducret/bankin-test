import 'module-alias/register';
import { injectDependencies } from './di.js';

export const launch = async () => {
  const di = injectDependencies();
  const bankinApiService = di.resolve('bankinApiService');

  try {
    const accountsAndTransactions =
      await bankinApiService.getAccountsAndTransactions();

    console.log(JSON.stringify(accountsAndTransactions));
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
