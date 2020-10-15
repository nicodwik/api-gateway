var express = require('express');
var router = express.Router();
const coursesHandler = require('../routes/handler/courses')

router.get('/', coursesHandler.getAll);
router.post('/', coursesHandler.create);
router.get('/:id', coursesHandler.get);
router.put('/:id', coursesHandler.update);
router.delete('/:id', coursesHandler.destroy);

module.exports = router;