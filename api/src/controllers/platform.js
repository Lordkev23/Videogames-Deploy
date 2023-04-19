require('dotenv').config();
const { Videogame, Genres } = require("../db");
const {API_KEY} = process.env;
const axios = require('axios');

const getPlatforms = async ()=>{
    let Pag1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let Pag2 =await axios(Pag1.data.next)
    let Pag3 = await axios(Pag2.data.next)
    let Pag4 = await axios (Pag3.data.next)
    let Pag5 = await axios(Pag4.data.next)
    let Paginas = Pag1.data.results
    .concat(Pag2.data.results)
    .concat(Pag3.data.results)
    .concat(Pag4.data.results)
    .concat(Pag5.data.results)
   let plataformas= await Paginas.map(i => i.platforms.map(p => p.platform.name)).join().split(',')
   let platformsMaps = plataformas.filter((item,index) => plataformas.indexOf(item)===index)
   console.log(platformsMaps);
   return platformsMaps
  }


//  console.log(getPlatforms());

module.exports = { getPlatforms };