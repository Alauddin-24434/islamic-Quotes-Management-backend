import dotenv from "dotenv";
dotenv.config();

export const envVariable = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  node_env: process.env.NODE_ENV  || "development",
  jwt_access_token_secret: process.env.JWT_ACCESS_TOKEN_SECRET!,
  jwt_refresh_token_secret: process.env.JWT_REFRESH_TOKEN_SECRET!,

  // access token expiry (default 15m)
  jwt_access_token_expires_in: (process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "15m")  as `${number}${"s" | "m" | "h" | "d"}`,

  // refresh token expiry (default 7d)
  jwt_refresh_token_expires_in: (process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "7d")  as `${number}${"s" | "m" | "h" | "d"}`,

  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};
