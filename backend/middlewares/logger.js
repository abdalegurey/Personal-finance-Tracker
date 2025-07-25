export const logger = (req, res, next) => {
     console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next(); // Let the request move forward
}