var dotenv = require('dotenv');
var pg = require('pg');
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
};
//# sourceMappingURL=knexfile.js.map