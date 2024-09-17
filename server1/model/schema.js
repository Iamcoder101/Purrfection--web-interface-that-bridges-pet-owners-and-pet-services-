import mongoose from "mongoose";

const serviceSchema= new mongoose.Schema({
  email_address:{
    type:String,
    required:true,
  },
    title:{
    type:String,
    required:true,
    unique:true,
},
Service:{
    type:String,
    required:true,
},
city:{
  type: String,
  required:true,
  },
state:{
type: String,
required:true,
},
description:String,

address:{
  type: String,
  required:true,
  },
  charge_per_session:{
    type: Number,
  required:true,
  },
contact:Number,
});

const ServiceSchema=mongoose.model('service',serviceSchema);

export default ServiceSchema;