import jsonToken from "jsonwebtoken";
import CustomErrorHandler from "../handlers/customErrorHandler.js";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Get the token from the header
  if (authHeader) {
    var token = authHeader.split(" ")[1];
    // Verify the token
    jsonToken.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return next(new CustomErrorHandler("Invalid or expired token", 401));
      }
      next();
    });
    next();
  } else {
    return next(new CustomErrorHandler("You are not authorized", 401));
  }
}

export default verifyToken;
