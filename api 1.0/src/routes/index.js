const { Router } = require('express');
const pokemonsRoute = require('./pokemos.js');
const typesRoute = require('./types.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonsRoute);  // /api/pokemos/*
router.use('/types', typesRoute);        // /api/types/*

module.exports = router;
