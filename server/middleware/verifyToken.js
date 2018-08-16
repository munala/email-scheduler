module.exports = (req, res, next) => {
  const authToken = process.env.AUTH_TOKEN;

  if (!req.headers.token || req.headers.token !== authToken) {
    res.status(401).json({
      message: 'Unauthorised',
    });
  } else {
    next();
  }
};
