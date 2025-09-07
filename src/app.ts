import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppError } from "./app/error/appError";

const app:Application= express();

app.use(express.json());

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


app.use((req:Request, res:Response, next:NextFunction)=>{
   res.status(404).json({
    success:false,
    messgae:"Route not found"
   })
})


app.use((error:AppError, req:Request, res:Response, next:NextFunction)=>{
   
let statusCode;
 statusCode= error.statusCode || 500;
 let message;
 message= error.message || "Spmethin went wrong!"

res.status(statusCode).json({
    statusCode,
    message,
})

})


export default app;