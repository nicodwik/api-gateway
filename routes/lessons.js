var express = require('express');
var router = express.Router();
const lessonsHandler = require('../routes/handler/lessons')

router.get('/', lessonsHandler.getAll);
router.post('/', lessonsHandler.create);
router.get('/:id', lessonsHandler.get);
router.put('/:id', lessonsHandler.update);
router.delete('/:id', lessonsHandler.destroy);

module.exports = router;