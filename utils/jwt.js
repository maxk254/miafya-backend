// for setting up the tokenization

import jwt from "jsonwebtoken";

const {
  JWT_ACCESS_SECRET = "access-accepted",
  JWT_REFRESH_SECRET = "refesh-secret",
  ACCESS_TOKEN_EXPIRES_IN = "15m",
  REFRESH_TOKEN_EXPIRES_IN = "7d",
} = process.env;

// sign accessToken
export function signAccessToken(payload) {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES_IN,});
}

// verify accesstoken
export function verifyAccessToken(token) {
  return jwt.verify(token, JWT_ACCESS_SECRET)
}

// SIGN REFRESHTOKEN
export function signRefreshToken(payload) {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES_IN})
}

// VERIFYREFRESH TOKEN
export function verifyRefreshToken(token) {
  return jwt.verify(token, JWT_REFRESH_SECRET)
} 