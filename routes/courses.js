var express = require('express');
var router = express.Router();
const coursesHandler = require('../routes/handler/courses')
const verifyToken = require('../middlewares/verifyToken')

router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);
router.post('/', verifyToken, coursesHandler.create);
router.put('/:id', verifyToken, coursesHandler.update);
router.delete('/:id', verifyToken, coursesHandler.destroy);

module.exports = router;