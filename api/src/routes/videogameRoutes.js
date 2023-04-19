const { Router } = require("express");
const router = Router();
const videogameIdControl = require("../controllers/videogameController");

router.get('/:id', videogameIdControl.getVideogameId);

module.exports = router;
