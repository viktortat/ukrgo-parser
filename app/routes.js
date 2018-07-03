"use strict";

const Router = require('koa-router');
const apiController = require('./controllers/api');

const router = new Router();
router.get('/api/search', apiController.search);

module.exports = router;
