module.exports = function methodNotSupported(req, res, next) {
    next({
      status: 405,
      message: `${req.method} requests are not supported on ${req.originalUrl}.`,
    });
  };
  