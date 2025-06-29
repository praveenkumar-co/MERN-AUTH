import userModel from '../models/userModel.js';

export default async function getUserData(req, res) {
  try {
    // Never use req.body in get request - >
     const userId = req.userId ;
     const user = await userModel.findById(userId);
     if(!user) {
      return res.json({success : false ,message :'User not found'});
     }
     res.json({
      success : true ,
      userData : {
        name : user.name ,
        isAccountVerified : user.isAccountVerified
      }
     });
  }
  catch(error){
      return res.json({success:false,message :error.message});
  }
 };
