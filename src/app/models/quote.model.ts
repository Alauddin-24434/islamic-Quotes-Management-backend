import { model, Schema } from "mongoose";
import { IQuote } from "../interfaces/quote.interface";

//====================================================
// Quote Schema
//====================================================
const quoteSchema= new Schema<IQuote>({
    text: {type : String, required:[ true, "Test is required"]},
    author: {type: String, required: [true, "Author is required"]},
    createdBy: {type:Schema.Types.ObjectId, ref: "User", required: [true, "Created by is required"]},
    approved: {type : Boolean, default: false},
    isDeleted:{type:Boolean, default:false}
},{
    timestamps:true,
    versionKey:false
});

//=====================================================
//Export Quote 
//======================================================
export const Quote= model <IQuote>("Quote", quoteSchema)