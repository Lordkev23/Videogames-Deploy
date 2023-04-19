const { Router } = require("express");
const router = Router();
const genresControl = require("../controllers/genresController");

router.get('/', genresControl.getGenres);



module.exports = router;
