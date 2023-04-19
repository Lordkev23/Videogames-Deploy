require('dotenv').config();
const { Videogame, Genres } = require("../db");
const {API_KEY} = process.env;
const {getAllVideogames} = require('./videogamesController')

const axios = require('axios');

// const getAllVideogamesl = async (req,res) => {
//   const id = req.params.id
//   if(id.length>6){
//   const todo = await getAllVideogames()
//   const buscarId = todo.find((ele)=>ele.id==id)
//   if(buscarId)res.status(200).send(buscarId)
// }else{
//     const videogamesAll = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
//     const apiInformation = videogamesAll.data.map(element => {
//       return ({
//           id: element.id,
//           name: element.name,
//           description: element.description,
//           released: element.released,
//           rating: element.rating,
//           platforms: element.platforms.map(element => element.platform.name),
//           genres: element.genres.map(element => element.name),
//           background_image: element.background_image
//       })})
  
  
//     res.status(200).send(apiInformation)
//   } 
// }



// const getVideogameId = async(req, res) => {
//     const id = req.params.id;
//     const videogamesAll = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
//     const data = videogamesAll.data;
//     if (id && id.includes("-")) {
//         let videogameByDb = await Videogame.findOne({
//           where: {
//             id: id,
//           },
//           include:
//             { model: Genres, through: { attributes: [] } },
//             // { model: Platform, through: { attributes: [] } },
        
//         });

    

//     if (!videogameByDb) throw new Error("Error, Videogame not found");

//     videogameByDb = JSON.stringify(videogameByDb);
//     videogameByDb = JSON.parse(videogameByDb);

//     videogameByDb.genres = videogameByDb.genres.map((gen) => gen.name);
//     videogameByDb.platforms = videogameByDb.platforms.map((pl) => pl.name);

//     return videogameByDb;

//   }

//     if(id){

  

//         const game = {
//             id: data.id,
//             name: data.name,
//             description: data.description,
//             release_date: data.released,
//             rating: data.rating,
//             image: data.background_image,
//             genres: data.genres.map((gen) => gen.name),
//             platforms: data.parent_platforms.map((pl) => pl.platform.name),
//           };
        
//         res.status(200).send(game)
//     }
// }

const getVideogameId = async(req, res) => {
const id = req.params.id
if(id.length < 10){
    const videogamesAll = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
    const data = videogamesAll.data;
    const game = {
                  id: data.id,
                  name: data.name,
                  description: data.description,
                  release_date: data.released,
                  rating: data.rating,
                  image: data.background_image,
                  genres: data.genres.map((gen) => gen.name),
                  platforms: data.parent_platforms.map((pl) => pl.platform.name),
                };
                res.status(200).send(game)
}else{
  let videogameByDb = await Videogame.findOne({
              where: {
                id: id,
              },
              include:
                { model: Genres, through: { attributes: [] } },
                // { model: Platform, through: { attributes: [] } },
            
            });
            res.status(200).send(videogameByDb)


            if (!videogameByDb) throw new Error("Error, Videogame not found");

            videogameByDb = JSON.stringify(videogameByDb);
            videogameByDb = JSON.parse(videogameByDb);

            videogameByDb.genres = videogameByDb.genres.map((gen) => gen.name);
            videogameByDb.platforms = videogameByDb.platforms.map((pl) => pl.name);
}
}

module.exports = { getVideogameId };