import mongoose from "mongoose";
import { envVariable } from "./app/error/config"
import app from "./app";


const port = envVariable.port || 5000;
const mongo_uri=envVariable.mongo_uri;

async function server() {

    try {

        mongoose.connect(mongo_uri as string);
        console.log("Database connected");

        app.listen(port, ()=>{
            console.log(`Server running on port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
    }
    
}

server()