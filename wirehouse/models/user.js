'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      handphone: DataTypes.STRING,
      gender: DataTypes.INTEGER,
      password: DataTypes.STRING
    },
    {
      updatedAt: 'created_at',
      createdAt: 'updated_at',
      reezeTableName: true,
      tableName: 'users'
    }
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
