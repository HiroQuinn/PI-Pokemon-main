const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, 
      unique: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{ 
    timestamps: false 
  });
};