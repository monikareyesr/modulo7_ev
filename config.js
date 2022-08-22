const {Pool} = require('pg')

const config ={
    user: 'postgres',
    host: 'localhost',
    database: 'bancosolar',
    password: 'admin',
    port: 5432,
    min: 3,
    max: 10,
    idleTimeoutMillis: 3000,
    connectionTimeoutMillis: 2000 
}
const pool = new Pool(config);
module.exports=pool
