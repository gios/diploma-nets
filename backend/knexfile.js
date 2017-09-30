const dotenv = require('dotenv');
const pg = require('pg');
dotenv.config();
pg.defaults.ssl = true;

module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 1,
    max: 7
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}
