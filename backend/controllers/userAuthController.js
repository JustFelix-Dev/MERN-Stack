const userAuth = require('../models/userAuthModel');
const jwt = require('jsonwebtoken');

const createToken=(_id)=>{
   return  jwt.sign({_id},process.env.SECRET,{ expiresIn: '3d'})
}

const logIn= async( req,res )=>{
    const { email,password } = req.body;

    try{
      const user = await userAuth.login( email, password )
      const token = createToken(user._id)
      res.status(200).json({email,token})

    }catch(error){
         res.status(400).json({error: error.message})
    }
}

const signUp= async( req,res )=>{
      const { email,password } = req.body;

      try{
        const user = await userAuth.signup( email, password )
        const token = createToken(user._id)
        res.status(200).json({email,token})

      }catch(error){
           res.status(400).json({error: error.message})
      }
 }

 module.exports = {
    logIn,signUp
 }