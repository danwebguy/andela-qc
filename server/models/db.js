import { Pool } from 'pg';
import dotenv from 'dotenv';
import dbtest from './dbtest';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  query(str, params) {
    return new Promise((resolve, reject) => {
      pool.query(str, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

pool.query(dbtest);
