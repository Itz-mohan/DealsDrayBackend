const { DataTypes } = require('sequelize');

const sequelize = require('../config/dbConfig');

const Login = sequelize.define(
  'Login',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(120),
    },
    pwd: {
      type: DataTypes.STRING(1024),
    },

    // Timestamps
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  },

  { freezeTableName: true }
);

module.exports = Login;
