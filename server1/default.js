import {servicess} from "./constant/data.js";
import Service from "./model/schema.js";

const DefaultData = () =>{
    try{
     Service.insertMany(servicess);
     console.log('data imported succesfully');

    } catch(error){
        console.log('error whle inserting default data',error.message);
    }

}

export default DefaultData;