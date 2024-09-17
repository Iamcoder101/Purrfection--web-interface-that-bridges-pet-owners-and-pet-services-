import mongoose from "mongoose";

const DogSchema= new mongoose.Schema({
    email_address:{
        type:String,
        required:true,
    },
    name:{
    type:String,
    },
    breed:{
        type:String,
        required:true,
    },
    height:{
        type:String,
        required:true, 
    },
    weight:{
        type:String,
        required:true,
    },
    age:{
        type:String,
        required:true, 
    },
    allergies:{
        type:String,
        required:true,
    },
    health_conditions:{
        type:String,
        required:true, 
    },
});

const dogSchema=mongoose.model('doginfo',DogSchema);

export default dogSchema;
