"use strict";

const http = require('http');
const axios = require('axios');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static-server');
const socketIo = require('socket.io');
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
app.use(staticServer({rootDir: 'public', rootPath: '/' }));
app.use(responseHandler());
app.use(errorHandler());

app.use(router.routes());
app.use(router.allowedMethods());

const server = http.createServer(app.callback());
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
  socket.broadcast.emit('hi');
});

server.listen(config.port);
