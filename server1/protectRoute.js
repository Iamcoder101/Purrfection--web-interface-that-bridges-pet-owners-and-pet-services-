/*import jwt from 'jsonwebtoken';
import cookies from 'cookie-parser';
import ownerSchema from './model/owenerSchema.js'
const JWT_skey="furrryyyyme";



export async function protectRoute(req,res,next){
    let token;
    if(req.cookies && req.cookies.loggedin){
      console(req.cookies.loggedin);
      token=req.cookies.loggedin;
      let payload=jwt.verify(token,JWT_skey);
      if(payload){
      const user=await ownerSchema.findById(payload);
      if(user){
      req.role=user.role;
      req.id=user.id;
      next();}
    }else{
      return res.json({
        message:'user is not verified'
      })
      }
    }else{
      res.redirect('/auth/signup');
  }
      }
  */
 /*
      import jwt from 'jsonwebtoken';
import ownerSchema from './model/owenerSchema.js'; // Corrected file name from 'owenerSchema.js' to 'ownerSchema.js'
const JWT_skey = "furrryyyyme";

export async function protectRoute(req, res, next) {
  let token;
  console.log(req.cookies);
  if (req.cookies && req.cookies.loggedin) {
    console.log('Token found:', req.cookies.loggedin); // Debugging line
    token = req.cookies.loggedin;
    try {
      let payload = jwt.verify(token, JWT_skey);
      if (payload) {
        const user = await ownerSchema.findById(payload.id); // Assuming payload contains the user ID
        if (user) {
          req.role = user.role;
          req.id = user.id;
          console.log("hi");
        } else {
          return res.status(401).json({ message: 'User not found' });
        }
        next();
      } else {
        return res.status(401).json({ message: 'User is not verified' });
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return res.status(401).json({ message: 'Token verification failed' });
    }
  } else {
    return res.redirect('/auth/login');
  }
}
*/
/*
(err, user) => {
  if (err) {
    return res.sendStatus(403);
  }
  res.json({ message: 'Protected data', user });
});*/
import jwt from 'jsonwebtoken';
import cookies from 'cookie-parser';
import ownerSchema from './model/owenerSchema.js'
const JWT_skey="furrryyyyme";

export async function protectRoute(req, res) {

    let token=req.headers.authorization;
    console.log(token);
    //console.log("iam here");
   // console.log(req.cookies.logged);
    try{
    if (!token) {
      console.log("iam heree");
      return res.status(401).json({ message: 'Unauthorized user - Token not provided' });
  
    }

    if (!token.startsWith('Bearer ')) {
      console.log("iam here too");
      return res.status(401).json({ message: 'Unauthorized user - Invalid token format' });
    }
console.log("u still there");
    token = token.split(' ')[1]; // Remove "Bearer " from token string
          let user=jwt.verify(token,JWT_skey);
          req.userid=user.id;
          console.log(req.userid);
          console.log("hey");
         next();
    
   //next();
  }catch(error){
   // console.log(error);
    console.error('JWT verification error:', error.message);
    if (error instanceof jwt.JsonWebTokenError) {
      console.log("inavlid token");
      return res.status(401).json({ message: 'Invalid token' });
    }
    console.log(error);
    console.log("error");
    res.status(500).json({message:'server side error'});
  }

} 
  
  
  