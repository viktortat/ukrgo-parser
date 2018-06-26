"use strict";

exports.welcome = ctx => {
  const data = {};
  ctx.res.ok(data, 'Hello, API!');
}
