var express = require('express');
var router = express.Router();
const myCoursesHandler = require('./handler/my_courses')

router.post('/', myCoursesHandler.create);
router.get('/', myCoursesHandler.get);

module.exports = router;