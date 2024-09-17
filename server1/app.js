
import express from 'express';
import cors from 'cors';
import path from 'path';
import {servicess} from "./constant/data.js";
import ServiceSchema from './model/schema.js';
import ownerSchema from './model/owenerSchema.js';
//import dotenv from 'dotenv';
import connection from './database/dbconnection.js';
import DefaultData from './default.js';
import UserRouter from './routes/userRouter.js';
import authRouter from './routes/authRouter.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current module's URL
const __filename = fileURLToPath(import.meta.url);
// Get the directory name using dirname
const __dirname = dirname(__filename);


const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());


//initializing mini routes 
const MainRouter=express.Router();
const UserrRouter = UserRouter;
const authhRouter = authRouter;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

//mini routes
app.use('/',MainRouter);
app.use('/auth',authhRouter);
app.use('/user',UserrRouter);

//main route 
MainRouter
  .route('/')
  .get(getMainfile)
  .post(postRoute)
MainRouter.get('/services/:Service', getservices);
MainRouter.get('/display/:id',gettprofile);



  



connection();
//DefaultData();
app.use(express.static('../public'));

async function getMainfile(req,res){
  res.sendFile(join(__dirname,'../views','index.html'));
} 
async function postRoute(req,res){
  let obj=req.body;
  console.log(obj);
  if(obj=='auth/signup'){
    postsignup();
  }else if('user/userhome'){
     getUserhome();
  }
  else{
  console.log('error',error.message);
  }
}

async function getservices(req, res)  {
  const service= req.params.Service;
 // console.log(service);
   try {
       const data = await ServiceSchema.find({ Service:service});
      console.log(data);
      console.log(data.length);
      if(data && data.length){
       res.render('../../views/serviceslisting', {data});
       }}catch (error) {
       res.status(500).json({ error: error.message });
   }};

   async function gettprofile(protectRoute,req,res){
    res.render('../../views/displayprofile', { user: req.user});
   }
//DefaultData();

// Start the server
app.listen(1000 ,()=>{
  console.log('server is listening on port 5000');
});
//DefaultData();
