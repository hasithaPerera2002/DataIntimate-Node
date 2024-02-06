import jsonToken from "jsonwebtoken";
import CustomErrorHandler from "../handlers/customErrorHandler.js";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"]; // Get the token from the header
  if (authHeader) {
    var token = authHeader.split(" ")[1];
    // Verify the token
    jsonToken.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        res.json(new CustomErrorHandler("Invalid or expired token", 401));
        return;
      }
      next();
    });
  } else {
    res.json(new CustomErrorHandler("You are not authorized", 401));
    return;
  }
}

export default verifyToken;
