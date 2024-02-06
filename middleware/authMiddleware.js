import jsonToken from "jsonwebtoken";
import CustomErrorHandler from "../handlers/customErrorHandler";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    var token = authHeader.split(" ")[1];
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