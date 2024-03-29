const axios = require("axios");
const { Type } = require("../db.js");


const getAllTypes = async (req, res) => {
  const tDataBase = await Type.findAll();

    if(tDataBase.length === 0) {
        try {
            const types = await axios.get('https://pokeapi.co/api/v2/type')
            for(let i=0; i<types.data.results.length; i++){
                await Type.create({name: types.data.results[i].name});
            }
            return res.send('guardado con exito :3')
         } catch(error) {
           return res.status(404).send('Se produjo un Error')
         }
        } else {
            return res.status(200).json(tDataBase);
        }
}
module.exports = getAllTypes;
