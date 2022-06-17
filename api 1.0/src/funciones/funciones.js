const axios = require('axios');
const { Json } = require('sequelize/types/utils');
const { Pokemon, Type } = require('../db')

var numPok = 40;
var numPok2 = numPok;

async function api() {
    const guard = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${numPok}`).then(datos => {
      return datos.data.results;
    })
    .then(datos => {
      return Promise.all(datos.map(res => axios.get(res.url)))
    })
    .then(datos => {
      return datos.map(res => res.data)
    })
    let pokemonsOrdenado = guard.map(result => {
      return {        
        id: result.id,
        nombre: result.name,
        tipos: result.types.map((t) => t.type.name), //lOS TYPES ESTAN EN SU PROPIEDAD NAME
        imagen: result.sprites.other.home.front_default,
        vida: result.stats[0].base_stat,
        ataque: result.stats[1].base_stat,
        defensa: result.stats[2].base_stat,
        velocidad: result.stats[5].base_stat,
        altura: result.height,
        peso: result.weight,
      }
    })
    return pokemonsOrdenado
};

async function db() {
    try {
      const info = await Pokemon.findAll({ // TRAIGO TODO DE LA TABLA POKEMON CON LA RELACION CON TYPE
        include:{
            attributes: ["nombre"],
            model: Type,
            through: {
              attributes: [],
            },
          },
      });
      return info  
    }catch (error) {
      console.log(error)
    }
  }

  async function allPokemon() {
    try {
      let apiInfo = await api();// DATOS DE LA API 
      let dbInfo = await db(); // DATOS DE LA DB
      const info = apiInfo.concat(dbInfo) // CONCATENANDO AMBAS
      return info;
    } catch (error) {
      return error;
    }
  };

  async function allPokemonId(id) {
    try {
      if (id > numPok2) {
        Pokemon.findAll({where:{id: id}}).then(e=> JSON(e));
        try {
          /* let dbId = await Pokemon.findByPk(id, {
            include: [
              {
                model: Type,
                attributes: ["nombre"],
                through: {
                  attributes: [],
                },
              },
            ],
            through: { 
              attributes: [] 
            }
          }); */
         // const { dataValues } = dbId;/* 
          //dataValues.types = dataValues.types.map((t) => t.nombre); */
          //if (dbId) return dataValues;
        } catch (error) {
          res.status(403)
        }
      } else {
        // pokemons x id desde la api
      let apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let Poke = {
          id: apiId.data.id,
          nombre: apiId.data.name,
          imagen: apiId.data.sprites.other.home.front_default,
          tipos: apiId.data.types.map(t => t.type.name),
          vida: apiId.data.stats[0].base_stat,
          ataque: apiId.data.stats[1].base_stat,
          defensa: apiId.data.stats[2].base_stat,
          velocidad: apiId.data.stats[5].base_stat,
          altura: apiId.data.height,
          peso: apiId.data.weight,
        };
        return Poke;    
      }
    } catch (err) {
      console.log(err);   
      res.status(404).json({ err: `No se encontró un Pokemon para el id: ${id}` });
    }
  }


async function getPokemon(req, res, next) {

    try {
      let nombre = req.query.nombre; //Recibo la request en una variable
      let pokemonsTotal = await allPokemon(); //Guardo mi controlador que trae todos los pokemons en una variable..
      if (nombre) { //Consulto si me pasan un nombre y lo busco en la variable de arriba
        let nombrePokemons = await pokemonsTotal.filter((e) => 
          e.nombre.toLowerCase().includes(nombre.toLowerCase())
        );
        nombrePokemons.length
          ? res.status(200).send(nombrePokemons) // Si lo encuentro lo devuelvo,
          : res.status(404).send("El pokemon ingresado es inexistente"); // y sino devuelvo el texto.
      } else {
        res.status(200).send(pokemonsTotal); //Sino devuelvo todos los pokemons
      }
    } catch (error) {
      next(error);
    }
  }
  

  async function getPokemonId(req, res) {
    const { id } = req.params;
    try {
      let infoPokemon = await allPokemonId(id);
      res.status(200).json(infoPokemon);
    } catch (error) {
      res.status(404).json({ err: `No se encontró ningun Pokemon con el id: ${id}` });
    }
  };
  
  var idRef = numPok+1;

  async function crearPokemon(req, res){
    try {
      let { nombre, vida, ataque, defensa, velocidad, altura, peso, tipos} = req.body
      
      if (!nombre) return res.json({ info: "El nombre es obligatorio" });
      
      let todos = await allPokemon();
      let comprobarNombre = (nom) => {
        for (let i = 0; i < todos.length; i++) {
          if (nom === todos[i].nombre){return false};
        }
        return true
      };
      if (!comprobarNombre(nombre)) {return res.json({ msg: "El Pokemon ya existe. Intenta crear otro." })}; 
      //if (comprobarNombre(nombre)) {{return res.json({ msg: "El Pokemon no existe" })}; }

      let types = await axios.get('https://pokeapi.co/api/v2/type');
      
      let comprobarTipos = (tip) => {
        let comnum=0;
        if(typeof tip === "string") 
       { let divTip = tip.split(",");
        for (let e = 0; e < divTip.length; e++){
          for (let i=0; i<types.data.results.length; i++) {
            if (divTip[e] == types.data.results[i].name){comnum++};
          }}
          if (comnum == divTip.length) {return true}
          return false}
          for (let e = 0; e < tip.length; e++){
            for (let i=0; i<types.data.results.length; i++) {
              if (tip[e] == types.data.results[i].name){comnum++};
        };
        if (comnum == tip.length) {return true}
        return false
        }}
        if (!comprobarTipos(tipos)) {return res.json({ msg: "El tipo no existe" })};
        //if (comprobarTipos(tipos)) {return res.json({ msg: "El tipo si existe" })};
      
      const pokemonOrdenado = await Pokemon.create({
        id: idRef++,
        nombre,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
        tipos, 
      });
    
     /*  if(Array.isArray(tipos) && tipos.length){ //Consulto si lo que me llega en types es un arreglo y si tiene algo adentro.
        let dbTipos = await Promise.all( //Armo una variable que dentro tendra una resolucion de promesas
          tipos.map((e) => { // Agarro la data de types y le hago un map para verificar que cada elemento exista en nuestra tabla de types
            return Type.findOne({where:{ nombre: e}}) 
          })
        )
       await pokemonOrdenado.setTypes(dbTipos) //Una vez que se resuelva la promesa del Pokemon.create, le agrego los types */

      pokemonOrdenado;
       return res.send("Pokemon creado exitosamente");
      
    } catch (err) {
      console.log(err)
      res.status(400).send("Error en data");
    }
  };

  const getTipos = async (req, res) => {
    const infoDb = await Type.findAll();
  
      if(infoDb.length === 0) {
          try {
              const tipos = await axios.get('https://pokeapi.co/api/v2/type')
              for(let i=0; i<tipos.data.results.length; i++){
                  await Type.create({nombre: tipos.data.results[i].name});
              }
              return res.json('guardados exitosamente :3')
           } catch(error) {
             return res.status(404).send('Se produjo un Error')
           }
          } else {
              return res.status(200).json(infoDb);
          }
  }


  module.exports = {
    getPokemon,
    getPokemonId,
    crearPokemon,
    getTipos
  }