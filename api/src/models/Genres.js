const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('genres', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    }
})
}