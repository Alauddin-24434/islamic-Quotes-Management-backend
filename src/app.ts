import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppError } from "./app/error/appError";
import { mainRoute } from "./app/api";
import cookieParser from "cookie-parser";
import { globalError } from "./app/middlewares/globalError";
const app:Application= express();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true,

}))


app.get('/', (req:Request, res:Response)=>{
    res.status(200).json({
        sucess:true,
        message:"Server is running"
    })
})
// main route
mainRoute(app)


app.use((req:Request, res:Response, next:NextFunction)=>{
   res.status(404).json({
    success:false,
    messgae:"Route not found"
   })
})

app.use(globalError)

export default app;