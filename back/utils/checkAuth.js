import jwt from "jsonwebtoken";
import { secretCode } from "../../private.js";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, secretCode);
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Not available",
      });
    }
  } else {
    return res.status(403).json({
      message: "Not available",
    });
  }
};
