import mongoose from 'mongoose';

export const connection= async(name,password)=>{
    const url='mongodb+srv://itsayesha66:itsmeagaiN123@purrfection1.2gy8zyg.mongodb.net/?retryWrites=true&w=majority&appName=purrfection1';
    try{
        await mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true });
        console.log('database connected succesfully');
    }
    catch(error){
        console.log('error encountered while connecting with database', error.message);
    }

}
export default connection;