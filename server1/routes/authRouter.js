import express from 'express';
import cors from 'cors';
import path from 'path';
import jwt from 'jsonwebtoken';
import cookies from 'cookie-parser';
import ownerSchema from '../model/owenerSchema.js';
import UserRouter from './userRouter.js';
import Service from '../model/schema.js';
import dogSchema from '../model/dogprofileschema.js';
const JWT_skey="furrryyyyme";

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current module's URL
const __filename = fileURLToPath(import.meta.url);
// Get the directory name using dirname
const __dirname = dirname(__filename);

const authRouter = express.Router();
authRouter.use(cookies());

authRouter
  .route('/signup')
  .get(getsignup)
  .post(postsignup)
authRouter
  .route('/serviceprofile')
  .get(getserviceprofile)
  .post(postserviceprofile)  




 authRouter
  .route('/login')
  .get(getlogin)
  .post(postlogin)


   authRouter
  .route('/dogprofile')
  .get(gettprofile)
  .post(posttprofile) 


function getRegister(req,res){
  res.sendFile(join(__dirname,'../../views','register_1.html'));
} 


//sign-up functions
  function getsignup(req,res){
    res.sendFile(join(__dirname, '../../views', 'pet_owner_registration.html'));
  }
  
  /*async function postsignup(req,res){
    try {
      let obj = req.body;
      const newUser = await ownerSchema.create(obj);
      console.log(newUser);
      console.log(newUser.role);
      if (newUser) {
          console.log("User successfully created");
          // Extract role from the created user
        //  const { role } = newUser;
          // Send the role back as the response
          res.status(200).send(newUser.role);
      } else {
          // Handle failed user creation
          res.status(500).send('Failed to create user');
      }
  } catch (error) {
      console.log("Failed to signup", error.message);
      res.status(500).send('Internal Server Error');
    }
  }
*/

async function postsignup(req,res){
  const {username,email_address,role,password}=req.body;
  try {
    const existUser = await ownerSchema.findOne({email_address:email_address});
    if(existUser){
      res.status(400).json({message:'user already exist'});
    }
    const newUser = await ownerSchema.create({username:username,email_address:email_address,role:role,password:password});
    const token=jwt.sign({email_address : newUser.email_address,id : newUser._id},JWT_skey);
    console.log(token);
    if (newUser) {
      console.log("User successfully created");
      res.status(200).send(newUser.role);
  } else {
      // Handle failed user creation
      res.status(500).send('Failed to create user');
  }
   // res.status(201).json({user : newUser , token :token});

  }catch(error){
     console.log(error);
     res.status(500).json({message:'something went wrong'});
  }}



  //login functions

async function getlogin(req,res){
  res.sendFile(join(__dirname, '../../views', 'loginpage.html'));
  }
/*postlogin(req,res){
    let data= req.body
    //console.log(data);
    try{
      let user= await ownerSchema.findOne({email_address:data.email_address}).select('+password');
     //  console.log(data);
    //  console.log (user.password);
      if(user){
        if(user.password==data.password){
          let payload =user['_id'];
          let token=jwt.sign({payload:payload},JWT_skey);
          res.cookie('loggedin',token,{httpOnly:true});
          res.json({message:'user succesfully logged in'});
         res.redirect('/user/userhome');
        console.log('heyyy');
        }else{
          console.log('user password incorrect');
        }

      }else{
        res.json({message:'user-email not found'});
      }

    }catch(error){
      console.log('error',error.message);
    }
  }*/
  export async function postlogin(req,res){
      console.log(req.body);
      const {email_address,password}=req.body;
      try{
        const existUser = await ownerSchema.findOne({email_address:email_address}).select('+password');
        console.log(existUser);
        console.log(existUser.password);
    if(!existUser){
      return res.status(404).json({message:'user not found'});
    }
    if(existUser.password==password){
     // return res.status(400).json({message:'inavalid credentials'});
    
    const use={email_address : existUser.email_address, id: existUser._id}
    const token=jwt.sign(use,JWT_skey);
    console.log(token);
    console.log("hello");
   // res.cookies('logged',token,{httpOnly:true});
    res.status(200).json(token);
     } }catch(error){
        console.log(error);
        res.status(500).json({message:'something went wrong'});
      }

    }


  // service-profile functions 

async function getserviceprofile(re,res){
  res.sendFile(join(__dirname, '../../views', 'serviceSignup.html'));
 }
async function postserviceprofile(req,res){
  try{
      let obj=req.body;
      console.log(obj);
    let users = await Service.create(obj);
    if(users){
      console.log("succesfully created profile");
   res.redirect('/auth/login');

    }else{
      console.log('error',error.message);
    }
   // res.status(200);
  }catch(error){
    console.log("failed to signup",error.message);
    res.status(500);
  }
}

  


// dog profile functions
async function gettprofile(re,res){
  res.sendFile(join(__dirname, '../../views', 'dog_profile.html'));
 }

 
 async function posttprofile(req,res){
  try{
      let obj=req.body;
      console.log(obj);
    let users = await dogSchema.create(obj);
    if(users){
      console.log("succesfully created dog profile");
      res.redirect('/auth/login');

    }else{
      console.log('error',error.message);
    }
   // res.status(200);
  }catch(error){
    console.log("failed to create profile",error.message);
    res.status(500);
  }
}


//protecting route function




  export default authRouter;