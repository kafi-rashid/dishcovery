const jwt = require("jsonwebtoken");
const  promisify = require("util").promisify;

const verifyToken = function(req, res, next) {
  let token = "";
  if (req.headers.authorization) {
    token = req.headers.authorization.split("Bearer ")[1];
  }
  const verifyTokenAsync = promisify(jwt.verify);
  verifyTokenAsync(token, "dishcovery")
    .then((decoded) => {
      next(); 
    })
    .catch((error) => {
      res.status(401).json({
        status: 401,
        message: "Not authorized!",
        data: null
      });
    });
};

module.exports = {
  verifyToken
};
