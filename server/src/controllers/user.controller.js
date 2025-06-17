import bcrypt from "bcryptjs"
import User from "../model/user.model.js";
import { generateToken } from "../libs/util.js";

export const signUp = async(req,res)=>{
  const {fullName,email,password} = req.body;
  try {
    //Checking is something wrong
    if(!fullName || !email || !password){
      return res.status(400).json({message:"Credential must be filled"})
    }
    const alreadyExist = await user.findOne({email});
    //Email already exist
    if(alreadyExist){
      return res.status(400).json({message:"Email already exists"})
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password:hashPassword
    })
    generateToken(newUser._id,res);
    return res.status(201).json({message:"User created Successfully",data:newUser})
  } catch (error) {
    console.log(`Sign-up Error ${error}`)
  }
}

export const signIn = async(req,res)=>{
  const {email,password} = req.body;
  try {
    //Checking that email exist or not
    const emailExist = await User.findOne({email});
    if(!emailExist){
      return res.status(400).json({message:"Email not valid"})
    }

    //Password is correct or not
    const getPassword = await bcrypt.compare(password,emailExist.password);
    if(!getPassword){
      return res.status(401).json({message:"Enter correct password"})
    }
    generateToken(emailExist._id,res);
    //Then sending the response after above condition are false
    return res.status(200).json({message:"User is logged in"});
  } catch (error) {
    console.log(`sign-in Error ${error}`)
  }
}