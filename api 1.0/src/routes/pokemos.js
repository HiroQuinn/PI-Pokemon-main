const { Router } = require('express');
const {
  getPokemon,
  getPokemonId,
  crearPokemon
} = require('../funciones/funciones.js');
const router = Router();

router.get('/', getPokemon)

router.get('/:id', getPokemonId)



router.post('/crear', crearPokemon)





/* router.get('/', (req, res, next) => {
  let pokemonPromiseApi = axios.get('https://pokeapi.co/api/v2/pokemon') // promesa
  let pokemonPromiseDb = Pokemon.findAll({  // promesa
    include: Types
  })

  Promise.all([
    pokemonPromiseApi,
    pokemonPromiseDb
  ])
    .then((respuesta) => {
      const [pokemonApi, pokemonDb] = respuesta
      let filteredPokemosApi = pokemonApi.data.results.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image
        }
      })

      let allPokemons = [...filteredPokemosApi, ...pokemonDb]
      res.send(allPokemons)
    })
})

// router.get('/', (req, res, next) => {
//   return Pokemon.findAll({
//     include: Types
//   })
//     .then((Pokemon) => {
//       res.send(Pokemon)
//     })
//     .catch((error) => {
//       next(error)
//     })
// })

router.post('/', async (req, res, next) => {
  try {
    const {
      name,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      imagen,
      creadaEnBb
    } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
      imagen,
      creadaEnBb
    })
    res.status(201).send(newPokemon)
  }
  catch (error) {
    next(error)
  }
})

router.post('/:pokemonId/type/:typeId', async (req, res, next) => {
  try {
    const { pokemonId, typeId } = req.params;
    const pokemon = await Pokemon.findByPk(pokemonId)
    await pokemon.addType(typeId)
    res.send(200)
  }
  catch (error) {
    next(error)
  }
})

router.put('/', (req, res, next) => {
  res.send('soy put / pokemon')
})


router.delete('/', (req, res, next) => {
  res.send('soy delete / pokemon')
}) */


module.exports = router;