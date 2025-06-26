


export const Notfound = (req, res, next) => {
    // res.status(404).json({
    //     status: "error",
    //     message: "Not Found",
    // });
    // next();

     const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error); // Forward to global error handler
}