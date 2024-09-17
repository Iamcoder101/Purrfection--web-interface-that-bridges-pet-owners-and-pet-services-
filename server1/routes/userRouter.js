import express from 'express';
import cors from 'cors';
import path from 'path';
import dogSchema from '../model/dogprofileschema.js';
import { protectRoute } from '../protectRoute.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current module's URL
const __filename = fileURLToPath(import.meta.url);
// Get the directory name using dirname
const __dirname = dirname(__filename);
const UserRouter = express.Router();

UserRouter.get('/userhome',getUserhome);
 
UserRouter
  .route('/userhome/profile')
  .get(getprofile)
  .post(postprofile)

UserRouter.use(protectRoute)
  .get(gettprofilee)


 UserRouter.use(express.static('public'));
 UserRouter.use(express.static('../views'));

 function getUserhome(req,res,next){  
  res.sendFile(join(__dirname, '../../views', 'owner_home.html'));
 }

 async function getprofile(req,res){
    res.sendFile(join(__dirname, '../../views', 'dog_profile.html'));
 }

 async function postprofile(req,res){
    let data= req.body;
    try{
        let dog= await dogSchema.updateMany(data);
    }catch(error){
        console.log(error.message);
    }
 }
  async function gettprofilee(req,res){
    res.sendFile()
  }


export default UserRouter;
 