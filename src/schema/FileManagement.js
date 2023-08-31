const { DataTypes } = require('sequelize');

const sequelize = require('../config/dbConfig');

const FileManagement = sequelize.define(
  'FileManagement',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    file_name: {
      type: DataTypes.STRING(120),
    },
    file_type: {
      type: DataTypes.STRING(120),
    },
    file: {
      type: DataTypes.BLOB('long'),
    },

    // Timestamps
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  },

  { freezeTableName: true }
);

module.exports = FileManagement;
