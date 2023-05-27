const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema

const authSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// static method - SignUp
  authSchema.statics.signup = async function( email,password ){

    // validation

    if(!email || !password){
        throw Error('All fields should be filled!')
    }
    if(!validator.isEmail(email)){
        throw Error('Enter a valid email!')
    }
    if(!validator.isStrongPassword(password)){
        throw Error("Password isn't strong enough")
    }

    // Hashing

       const exists = await this.findOne({ email})
       if(exists){
        throw Error('Email is already registered!')
       }


       const salt = await bcrypt.genSalt(10)
       const hash = await bcrypt.hash(password, salt)

       const user = await this.create({ email,password:hash })

       return user
  }

//   Login Method
      authSchema.statics.login = async function( email, password ){
        
    // validation

    if(!email || !password){
        throw Error('All fields should be filled!')
    }

    const user = await this.findOne({ email})

       if(!user){
        throw Error('Incorrect Email!')
       }

    const match = await bcrypt.compare(password, user.password)

       if(!match){
        throw Error('Incorrect Password')
       }

       return user

      }

module.exports = mongoose.model('User', authSchema)