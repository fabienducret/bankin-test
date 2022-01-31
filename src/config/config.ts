import { config as dotconfig } from 'dotenv';
import { Config } from '../types/Config';

dotconfig();

export const config: Config = {
  bankin_api_url: process.env.BANKIN_API_URL,
  bankin_api_user: process.env.BANKIN_API_USER,
  bankin_api_password: process.env.BANKIN_API_PASSWORD,
  bankin_api_client_id: process.env.BANKIN_API_CLIENT_ID,
  bankin_api_client_secret: process.env.BANKIN_API_CLIENT_SECRET,
};
