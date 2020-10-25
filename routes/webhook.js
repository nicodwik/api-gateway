var express = require('express');
var router = express.Router();
const webhookHandler = require('../routes/handler/webhook')

router.post('/', webhookHandler.webhook);

module.exports = router;