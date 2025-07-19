import jwt from "jsonwebtoken";
import MESSAGES from "./message.js";

export default class JWT_UTILS {
  static generateToken(payload) {
    // Add 'static' keyword
    const secretKey = process.env.JWT_SECRET_KEY;

    if (!secretKey) {
      throw new Error(MESSAGES.JWT_SECRET_MISSING);
    }
    const options = {
      expiresIn: "1d", // Token expiration time
    };
    return jwt.sign(payload, secretKey, options);
  }
}
