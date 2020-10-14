const express = require('express');
const router = express.Router();
const mentorsHandler = require('./handler/mentors');

router.get('/', mentorsHandler.getAll)
router.get('/:id', mentorsHandler.get)
router.post('/', mentorsHandler.create)
router.put('/:id', mentorsHandler.update)
router.delete('/:id', mentorsHandler.destroy)
// router.delete('/:id', mediaHandler.destroy)

module.exports = router;
