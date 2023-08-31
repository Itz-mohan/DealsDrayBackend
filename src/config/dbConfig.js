const Sequelize = require('sequelize');

const {
  mssqlDB,
  mssqlUserName,
  mssqlPassword,
  mssqlServer,
  mssqlPort,
} = require('./index');

const sequelize = new Sequelize(mssqlDB, mssqlUserName, mssqlPassword, {
  host: mssqlServer,
  port: parseInt(mssqlPort),
  dialect: 'mssql',
  dialectOptions: {
    encrypt: true,
    options: {
      validateBulkLoadParameters: true,
    },
  },
});
(async () => {
  try {
    await sequelize.sync();
  } catch (e) {
    console.log({ e });
  }
})();

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
