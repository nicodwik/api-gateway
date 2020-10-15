var express = require('express');
var router = express.Router();
const chaptersHandler = require('../routes/handler/chapters')

router.get('/', chaptersHandler.getAll);
router.post('/', chaptersHandler.create);
router.get('/:id', chaptersHandler.get);
router.put('/:id', chaptersHandler.update);
router.delete('/:id', chaptersHandler.destroy);

module.exports = router;