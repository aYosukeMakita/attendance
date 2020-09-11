'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.History, { foreignKey: 'id' })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      presence: DataTypes.STRING,
      atOffice: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
      paranoid: true,
    }
  )
  return User
}
