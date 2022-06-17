const { Pokemon, Type } = require('../db');
const { allPokemon, allPokemonId} = require("../utils/utils");

const numPok = 40;

async function getPokemon(req, res, next) {

  try {
    let name = req.query.name;
    let pokemonsTotal = await allPokemon(numPok);
    if (name) {
      let pokemonName = await pokemonsTotal.filter((e) => 
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonName.length
        ? res.status(200).send(pokemonName)
        : res.status(404).send("Pokemon inexistente");
    } else {
      res.status(200).send(pokemonsTotal);
    }
  } catch (error) {
    next(error);
  }
}
async function getPokemonById(req, res) {
  const { id } = req.params;
  try {
    let infoPokemon = await allPokemonId(id, numPok);
    res.status(200).json(infoPokemon);
  } catch (error) {
    res.status(404).json({ err: `No se encontró un Pokemon para el id: ${id}` });
  }
};
var idRef = numPok+1;
async function createPokemon(req, res){
  try {
    let { name, image, hp, attack, defense, speed, height, weight, types} = req.body 
    let findOnePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
   /*  if (!findOnePokemon)
    return res.json({ msg: "El Pokemon no existe" }); */
    if (findOnePokemon)
      return res.json({ msg: "El Pokemon ya existe" });

    const newPokemon = await Pokemon.create({
      id: idRef++,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      types, 
    });

    if(Array.isArray(types) && types.length){ 
      let dbTypes = await Promise.all(
        types.map((e) => {
          return Type.findOne({where:{ name: e}}) 
        })
      )
     await newPokemon.setTypes(dbTypes)
     return res.send("Pokemon creado exitosamente");
    }
  } catch (err) {
    console.log(err)
    res.status(400).send("Error en data");
  }
};

module.exports = {
  getPokemon,
  getPokemonById,
  createPokemon  
}