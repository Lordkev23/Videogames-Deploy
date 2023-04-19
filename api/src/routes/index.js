const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const genresRouter = require("./genresRoutes");
const videogameRouter = require("./videogameRoutes");
const videogamesRouter = require("./videogamesRoutes");
const platform = require("./platform")

//  const Videogame = require('../models/Videogame');
//  const Genres = require('../models/Genres');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/genresRoutes", genresRouter);
router.use("/videogamesRoutes", videogamesRouter);
router.use("/videogameRoutes", videogameRouter);
router.use("/platform", platform);

module.exports = router;
