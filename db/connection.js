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
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
};
const db = pgp(connectionConfig);

module.exports = db;
