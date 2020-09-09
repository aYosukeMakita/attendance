'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Work extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User)
    }
  }
  Work.init(
    {
      userId: DataTypes.INTEGER,
      startedAt: DataTypes.DATE,
      finishedAt: DataTypes.DATE,
      atOffice: DataTypes.BOOLEAN,
      onWork: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Work',
    }
  )
  return Work
}
