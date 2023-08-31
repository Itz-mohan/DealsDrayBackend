const dotenv = require('dotenv');
dotenv.config();

const mssqlUserName = process.env.MSSQL_USERNAME;
const mssqlPassword = process.env.MSSQL_PASSWORD;
const mssqlServer = process.env.MSSQL_SERVER;
const mssqlPort = process.env.MSSQL_PORT;
const mssqlDB = process.env.MSSQL_DATABASE;

module.exports = {
  mssqlDB,
  mssqlUserName,
  mssqlPassword,
  mssqlServer,
  mssqlPort,
};
