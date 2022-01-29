import axios from 'axios';
import { encodeBase64 } from '../utils/BankinApi.utils.js';

export class BankinApiAdapter {
  constructor({ config }) {
    this.config = config;
    this.baseUrl = this.config.bankin_api_url;
  }

  async login() {
    let refreshToken = '';
    const user = this.config.bankin_api_user;
    const password = this.config.bankin_api_password;
    const clientId = this.config.bankin_api_client_id;
    const clientSecret = this.config.bankin_api_client_secret;

    const authorizationToken = encodeBase64(`${clientId}:${clientSecret}`);

    try {
      const apiResponse = await axios.post(
        `${this.baseUrl}/login`,
        {
          user,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${authorizationToken}`,
          },
        }
      );
      refreshToken = apiResponse?.data?.refresh_token;
    } catch (error) {
      throw new Error(`Error on /login service : ${error}`);
    }

    return refreshToken;
  }

  async getToken(refreshToken) {
    let accessToken = '';

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refreshToken);

    try {
      const apiResponse = await axios.post(`${this.baseUrl}/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      accessToken = apiResponse?.data?.access_token;
    } catch (error) {
      throw new Error(`Error on /token service : ${error}`);
    }

    return accessToken;
  }

  async getAccounts(bearerToken) {
    let accounts = [];

    try {
      const apiResponse = await axios.get(`${this.baseUrl}/accounts`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${bearerToken}`,
        },
      });

      accounts = apiResponse?.data?.account;
    } catch (error) {
      throw new Error(`Error on /accounts service : ${error}`);
    }

    return accounts;
  }

  async getTransactions(accountNumber, bearerToken) {
    let transactions = [];

    try {
      const apiResponse = await axios.get(
        `${this.baseUrl}/accounts/${accountNumber}/transactions`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );

      if (apiResponse?.data?.transactions) {
        transactions = apiResponse.data.transactions.map((transaction) => {
          return {
            label: transaction.label,
            amount: transaction.amount,
            currency: transaction.currency,
          };
        });
      }
    } catch (error) {
      throw new Error(`Error on /transactions service : ${error}`);
    }

    return transactions;
  }
}
