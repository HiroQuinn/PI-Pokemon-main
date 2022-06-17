const { Router } = require('express');
/* const { Type } = require('../db'); */
const {
  getTipos
} = require('../funciones/funciones.js');
const router = Router();

router.get("/", getTipos);

/* router.get('/', async (req, res, next) => {
  try {
    const type = await Type.findAll()
    res.send(type)
  }
  catch (error) {
    next(error)
  }
});

router.post('/', (req, res, next) => {
  const { name } = req.body;
  return Type.create({ name })
    .then((newType) => {
      newType
      res.status(201).send(newType);
    })
    .catch(error => next(error))
});

router.put('/', (req, res, next) => {
  res.send('soy put / types')
});


router.delete('/', (req, res, next) => {
  res.send('soy delete / types')
});
 */

module.exports = router;