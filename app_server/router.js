
var express = require('express');
var router = express.Router();

var Controller = require('./controller');


router.get('/',Controller.home);
router.get('/football', Controller.football);
router.get('/welcome', Controller.welcome);

router.post('/auth', Controller.postFootball);

module.exports = router;