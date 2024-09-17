import mongoose from "mongoose";

const OwnerSchema= new mongoose.Schema({
    username:{
    type:String,
    required:true,
    },
    email_address:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true, 
        select:false,
    },
});

const ownerSchema=mongoose.model('ownerinfo',OwnerSchema);

export default ownerSchema;