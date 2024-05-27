const tokenErrorHandler = (err, req, res, next) => {
    if(err.name === 'UnauthorizedError') {
      res.status(err.status).send({message:err.message});
      console.log("authorization error");
      return;
    }
 next();
}

module.exports = tokenErrorHandler;