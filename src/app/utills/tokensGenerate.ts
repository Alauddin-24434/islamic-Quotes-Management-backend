import jwt, { type JwtPayload } from "jsonwebtoken";
import { envVariable } from "../config";

export const generateTokens = (payload: JwtPayload) => {
  const accessToken = jwt.sign(payload, envVariable.jwt_access_token_secret, {
    expiresIn: envVariable.jwt_access_token_expires_in,
  });

  const refreshToken = jwt.sign(payload, envVariable.jwt_refresh_token_secret, {
    expiresIn: envVariable.jwt_refresh_token_expires_in,
  });

  return { accessToken, refreshToken };
};
