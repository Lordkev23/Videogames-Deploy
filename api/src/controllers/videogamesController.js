require('dotenv').config();
const { Videogame, Genres } = require("../db");

const {API_KEY} = process.env;

const axios = require('axios');

const getApiInformation = async () => {
    const page = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const page1 = await axios(page.data.next)
    const page2 = await axios(page1.data.next)
    const page3 = await axios(page2.data.next)
    const page4 = await axios(page3.data.next)

    const allPages = page.data.results.concat(page1.data.results).concat(page2.data.results).concat(page3.data.results).concat(page4.data.results)

    // console.log(url.data.results);
    const apiInformation = allPages.map(element => {
        return ({
            id: element.id,
            name: element.name,
            description: element.description,
            released: element.released,
            rating: element.rating,
            platforms: element.platforms.map(element => element.platform.name),
            genres: element.genres.map(element => element.name),
            image: element.background_image
        })})
    
    return apiInformation;
}

const getDataBaseInformation = async () => {
    return await Videogame.findAll({
        include:{
            model: Genres,
            // atribute: ['name'],
            through: {
                atributes:[],
            }
        }
    })
}

const getAllVideogames = async () => {
    const apiInformation = await getApiInformation();
    
    const dbInformation = await getDataBaseInformation();
    //console.log(dbInformation);
    const allInformation = [...apiInformation, ...dbInformation];
    return allInformation;
}

const getVideogames =  async (req, res) => {
    const name = req.query.name;
    const allVideogames = await getAllVideogames();

    if(name){
        const vgName = allVideogames.filter(element => element.name.toLowerCase().includes(name.toLowerCase()))
        
        vgName.length ? res.status(200).send(vgName) :
        res.status(404).send('The entered Videogame was not found')
    }else {
            res.status(200).send(allVideogames);
        }
    
}

//

const getVideogamesByDb = async () => {
    try {
      let gamesByDb = await Videogame.findAll({
        include: [{ model: Genres }],
      });
  
      if (gamesByDb.length) {
        gamesByDb = JSON.stringify(gamesByDb);
        gamesByDb = JSON.parse(gamesByDb);
  
        gamesByDb = gamesByDb.map((game) => {
          return {
            ...game,
            genres: game.genres.map((genre) => genre.name),
            
          };
        });
      }
      return gamesByDb;
    } catch (err) {
      throw { status: err?.status || 500, message: err?.message || err };
    }
  };

//

const getVideogameByName = async (name) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
      );
      const data = await response.json();
  
      let gamesByDb = await getVideogamesByDb();
  
      gamesByDb = gamesByDb.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
  
      if (!data.count && !gamesByDb.length)
        throw { status: 400, message: `Error, game not found: ${name}` };
  
      const gamesByApi = data.results?.map((game) => {
        return {
          id: game.id,
          name: game.name,
          image: game.background_image,
          rating: game.rating,
          release_date: game.released,
          genres: game.genres?.map((genre) => genre.name),
          platforms: game.platforms?.map((pl) => pl.platform.name),
        };
      });
  
      const allGames = [...gamesByDb, ...gamesByApi];
  
      return allGames.splice(0, 15);
    } catch (err) {
      throw { status: err?.status || 500, message: err?.message || err };
    }
  };

//

const postVideogames = async(req, res) => {
    const {
        id,
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        image
        
    } = req.body

    const videogameCreated = await Videogame.create({
        id,
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        image
    })

    const genresDb = await Genres.findAll({
        where: { name: genres}
    })
    videogameCreated.addGenres(genresDb)
    res.send('videogame created successfully!')
}

const deleteVideogames = async(req, res) => {
  const { name } = req.params;
  console.log('Delte of: ', name);
  try {
    const eliminate = await Videogame.destroy({
      where: {name: `${name}`}
    })
  } catch (error) {
    res.send(`Error in route /videogames/delete ${error}`)
  }
  res.send('Videogame has been deleted!')
}

module.exports = { getVideogames, postVideogames, getVideogameByName, deleteVideogames, getAllVideogames }
