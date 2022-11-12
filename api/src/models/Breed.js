const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      alowNull: false,
      primaryKey: true 
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    weight: {
      type: DataTypes.STRING,
      allowNull: false
    },

    life_span: {
      type: DataTypes.STRING,
      allowNull: true
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true
    },

    createdInDatabase:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }

  },{timestamps: false});
};