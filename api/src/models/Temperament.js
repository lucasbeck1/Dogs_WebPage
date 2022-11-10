const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperament', {
    // Si no lo defino, ID va a añadirse de forma automática.
    name: {
      type: DataTypes.STRING,
    }
    
  },{timestamps: false});
};
