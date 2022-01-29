const fakesTransactions = [
  {
    accountNumber: '000000001',
    transactions: [
      {
        label: 'label 1',
        amount: '30',
        currency: 'EUR',
      },
      {
        label: 'label 2',
        amount: '10',
        currency: 'EUR',
      },
    ],
  },
  {
    accountNumber: '000000002',
    transactions: [
      {
        label: 'label 3',
        amount: '15',
        currency: 'EUR',
      },
    ],
  },
];

export const getFakesAccounts = () => {
  return [
    {
      acc_number: '000000001',
      amount: '3000',
      currency: 'EUR',
    },
    {
      acc_number: '000000002',
      amount: '40',
      currency: 'EUR',
    },
    {
      acc_number: '000000003',
      amount: '10',
      currency: 'EUR',
    },
  ];
};

export const getFakesTransactions = (accountNumber) => {
  return fakesTransactions.filter(
    (transaction) => transaction.accountNumber === accountNumber
  )[0]?.transactions;
};
