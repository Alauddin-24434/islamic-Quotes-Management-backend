import dotenv from "dotenv";
dotenv.config()


export const envVariable={
    port: process.env.PORT,
    mongo_uri: process.env.MONGO_URI,
}