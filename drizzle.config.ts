import { defineConfig } from 'drizzle-kit';
import { env } from './env';

export default defineConfig({
  dialect: 'singlestore',
  out: './drizzle',
  schema: './server/db/schema.ts',
  tablesFilter: ['drive_tutorial_*'],
  dbCredentials: {
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASS,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
  },
});
