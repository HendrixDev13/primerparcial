const { status } = require("express/lib/response");

module.exports = (sequelize, Sequelize) => {
  const Pelicula = sequelize.define("pelicula", {
    nombre: {
      type: Sequelize.STRING
    },
    sinopsis: {
      type: Sequelize.STRING
    },
    actores: {
      type: Sequelize.STRING
    },
    duracion: {
      type: Sequelize.STRING
    },
    tipo: {
      type: Sequelize.STRING      
    },
    fechalanzamiento: {
      type: Sequelize.DATE      
    }, 
    categoria: {
      type: Sequelize.STRING,  
    }, 
    drama: {
      type: Sequelize.STRING,  
    } 
  });

  return Pelicula;
}