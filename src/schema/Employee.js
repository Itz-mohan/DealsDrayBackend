const { DataTypes } = require('sequelize');

const sequelize = require('../config/dbConfig');

const FileManagement = require('./FileManagement');

const Employee = sequelize.define(
  'Employee',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
    },
    email: {
      type: DataTypes.STRING(120),
    },
    mobile: {
      type: DataTypes.STRING(120),
    },
    designation: {
      type: DataTypes.STRING(120),
    },
    gender: {
      type: DataTypes.STRING(120),
    },
    course: {
      type: DataTypes.STRING(120),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      default: true,
    },

    // Timestamps
    createdAt: { type: DataTypes.DATE, field: 'created_at' },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at' },
  },

  { freezeTableName: true }
);

Employee.belongsTo(FileManagement, { foreignKey: 'img', targetKey: 'id' });

module.exports = Employee;
