const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    vida: {
      type: DataTypes.INTEGER
    },
    ataque: {
      type: DataTypes.INTEGER
    },
    defensa: {
      type: DataTypes.INTEGER
    },
    velocidad: {
      type: DataTypes.INTEGER
    },
    altura: {
      type: DataTypes.INTEGER
    },
    peso: {
      type: DataTypes.INTEGER
    },
    imagen: {
      type: DataTypes.STRING
    },
    tipos: {
      type: DataTypes.JSON
    },
  },{ 
    timestamps: false 
  });
};
