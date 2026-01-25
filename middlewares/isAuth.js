// checks for valid JWT

import { verifyAccessToken } from "../utils/jwt.js";

export async function authenticateJWT(req, res, next) {
  const header = req.headers["authorization"] || "";
  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    req.userId = undefined;
    return next();
  }

  try {
    const payload = verifyAccessToken(parts[1]);
    req.userId = payload.userId;
    next();
  } catch (err) {
    req.userId = undefined;
    next();
  }
}