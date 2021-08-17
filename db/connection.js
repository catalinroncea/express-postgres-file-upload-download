const initOptions = {
    schema: 'test',
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    },
    error(err, e) {
        console.log(err)
    }
};
const pgp = require('pg-promise')(initOptions);
const connectionConfig = {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'admin',
    database: 'test'
};
const db = pgp(connectionConfig);

module.exports = db;
