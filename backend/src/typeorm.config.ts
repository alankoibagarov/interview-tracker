import path from 'path';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const envFilePath =
  process.env.NODE_ENV === 'development'
    ? path.resolve(__dirname, '../../.env.local')
    : path.resolve(__dirname, '../../.env');

config({ path: envFilePath, override: true });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [path.resolve(__dirname, '**/*.entity.{ts,js}')],
  migrations: [path.resolve(__dirname, 'migrations/*.{ts,js}')],
  synchronize: process.env.NODE_ENV === 'development',
});
