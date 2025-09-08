// =================================
// Quotes Interfaces
//=================================

import mongoose from "mongoose";


export interface IQuote{
    text : string;
    author: string;
    createdBy:mongoose.Types.ObjectId;
    approved: boolean;
    createdAt: Date;
    updatedAt: Date;
    
}