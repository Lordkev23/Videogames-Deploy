const { Router } = require("express");
const router = Router();
const videogamesControl = require("../controllers/videogamesController");

router.get('/', videogamesControl.getVideogames);

//

router.get('/', videogamesControl.getVideogameByName)

//

router.post('/', videogamesControl.postVideogames);

router.post('/delete/:name', videogamesControl.deleteVideogames)

module.exports = router;