// Cargamos el archivo de configuración

const dbConfig = require("../config/base.config.js");


// Importamos Sequelize
const Sequelize = require("sequelize");

// Creamos la instancia de conexión
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// Objeto para exportar
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar modelos
db.peliculas = require("./peliculas.model.js")(sequelize, Sequelize);

module.exports = db;
