var express = require('express');
var router = express.Router();
const coursesHandler = require('../routes/handler/courses')
const verifyToken = require('../middlewares/verifyToken')
const grant = require('../middlewares/permission')

router.get('/', coursesHandler.getAll);
router.get('/:id', coursesHandler.get);
router.post('/', verifyToken, grant('admin'), coursesHandler.create);
router.put('/:id', verifyToken, grant('admin'), coursesHandler.update);
router.delete('/:id', verifyToken, grant('admin'), coursesHandler.destroy);

module.exports = router;