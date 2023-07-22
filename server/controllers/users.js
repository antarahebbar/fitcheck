import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from "../models/user.js";

 
 export const signIn = async (req, res) => {
    
    const {email, password} = req.body;
    
    try{
        const existingUser = await UserModel.findOne({ email });

        if (!existingUser) return res.status(404).json({message : "User does not exist."});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({message : "Invalid credentials"});

        const token = jwt.sign({ email: existingUser.email, id : existingUser.id}, 'test', {expiresIn: '1h'});

        res.status(200).json({ result : existingUser, token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
 }

 export const signUp = async (req, res) => {
    const {email, password, firstName, lastName, confirmPassword} = req.body;


    try{
        const existingUser = await UserModel.findOne({ email });
        
        if (existingUser) return res.status(400).json({message : "User already exists."});

        if (password !== confirmPassword) return res.status(400).json({message : "Passwords don't match."});

        const hashPass = await bcrypt.hash(password, 12);

        const result = await UserModel.create({ email, password : hashPass, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id : result._id }, 'test', {expiresIn : '1h'});

        res.status(200).json({ result, token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
 }