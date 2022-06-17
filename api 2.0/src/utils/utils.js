const axios = require('axios');
const URL = "https://pokeapi.co/api/v2/pokemon"
const { Pokemon, Type } = require('../db')



async function apiPokemon(numP) {
    const savePokemons = await axios.get(`${URL}?limit=${numP}`).then(data => {
      return data.data.results;
    })
    .then(data => {
      return Promise.all(data.map(res => axios.get(res.url)))
    })
    .then(data => {
      return data.map(res => res.data)
    })
    let arrayPokeApi = savePokemons.map(result => {
      return {        
        id: result.id,
        name: result.name,
        types: result.types.map((t) => t.type.name), 
        image: result.sprites.other.home.front_default,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
        speed: result.stats[3].base_stat,
        height: result.height,
        weight: result.weight,
      }
    })
    return arrayPokeApi
};

async function dbPokemon() {
  try {
    const dbPokemonInfo = await Pokemon.findAll({
      include:{
          attributes: ["name"],
          model: Type,
          through: {
            attributes: [],
          },
        },
    });
    return dbPokemonInfo  
  }catch (error) {
    console.log(error)
  }
}

async function allPokemon(num) {
  try {
    let apiPokemonInfo = await apiPokemon(num);
    let dbPokemonInfo = await dbPokemon(); 
    const totalPokemonInfo = apiPokemonInfo.concat(dbPokemonInfo)
    return totalPokemonInfo;
  } catch (error) {
    return error;
  }
};

async function allPokemonId(id, num) {
  try {
    if (id > num) {
      try {
        let dbPokemonById = await Pokemon.findByPk(id, {
          include: [
            {
              model: Type,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
          through: { 
            attributes: [] 
          }
        });
        const { dataValues } = dbPokemonById;
        dataValues.types = dataValues.types.map((t) => t.name);
        if (dbPokemonById) return dataValues;
      } catch (error) {
        res.status(403)
      }
    } else {
    let pokeId = await axios.get(`${URL}/${id}`);
      let onePokemon = {
        id: pokeId.data.id,
        name: pokeId.data.name,
        image: pokeId.data.sprites.other.home.front_default,
        types: pokeId.data.types.map(t => t.type.name),
        hp: pokeId.data.stats[0].base_stat,
        attack: pokeId.data.stats[1].base_stat,
        defense: pokeId.data.stats[2].base_stat,
        speed: pokeId.data.stats[5].base_stat,
        height: pokeId.data.height,
        weight: pokeId.data.weight,
      };
      return onePokemon;    
    }
  } catch (err) {
    console.log(err);   
    res.status(404).json({ err: `No se encontró ningun pokron con el id: ${id}` });
  }
}



module.exports = {
  allPokemon,
  allPokemonId,
};
