"use strict";

const UNKNOWN_ENDPOINT = {
  code: 'UNKNOWN_ENDPOINT',
  message: 'The requested endpoint does not exist.'
};
const UNKNOWN_ERROR = {
  code: 'UNKNOWN_ERROR',
  message: 'The server encountered an unknown error.'
};

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();

      // Respond 404 Not Found for unhandled request
      if (!ctx.body && (!ctx.status || ctx.status === 404))
        ctx.res.notFound(UNKNOWN_ENDPOINT.code, UNKNOWN_ENDPOINT.message);
    } catch (err) {
      ctx.res.internalServerError(UNKNOWN_ERROR.code, UNKNOWN_ERROR.message);
      // Recommended for centralized error reporting,
      // retaining the default behaviour in Koa
      ctx.app.emit('error', err, ctx);
    }
  };
}
