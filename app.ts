import { drizzle } from 'drizzle-orm/singlestore';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(
  '<username>:<password>@<host>:<port>/<database>?ssl={}'
);

const db = drizzle({ client: connection });
