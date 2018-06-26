"use strict";

const axios = require('axios');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const responseHandler = require('./app/middlewares/responseHandler');
const errorHandler = require('./app/middlewares/errorHandler');
const router = require('./app/routes');
const config = require('./config.json');

const app = new Koa();
//middlewares
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);
app.use(responseHandler());
app.use(errorHandler());

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(config.port);
