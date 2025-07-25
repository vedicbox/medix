import jwt from "jsonwebtoken";
import STATUS_CODES from "../utils/statusCodes.js";

// Middleware to check if the user is authenticated (for private routes)
export const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.auth = {
        userId: decoded.userId,
        orgCode: decoded.orgCode
      };
      next();
    } catch (err) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ statusCode: false, msg: "Invalid token." });
    }
  } else {
    res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ statusCode: false, msg: "Authorization token is required." });
  }
};
