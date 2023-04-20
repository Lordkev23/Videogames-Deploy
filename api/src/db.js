require('dotenv').config();
const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, API_KEY
} = process.env;

const sequelize = new Sequelize(`postgresql://postgres:IVLSxRcPm1VX8hSbJAuZ@containers-us-west-50.railway.app:7522/railway`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genres } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
// se establece la relación entre ambas entidades de muchos a muchos:
Videogame.belongsToMany(Genres, {through:"videogame_genres"});
Genres.belongsToMany(Videogame, {through:"videogame_genres"});

//
const populateGenres = async() => {
    const apiGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = apiGenres.data.results.map(element => element.name)

    genres.forEach(element => {
        Genres.findOrCreate({
            where: {name: element}
        })
    })
}
populateGenres();
//

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
  apikey: API_KEY,
  Op
};
