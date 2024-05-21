import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../models/Users.js';

const router = express.Router()

router.post("/register", async (req, res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne( { username: username } );

    if(user){
        return res.json({message: "User already exists!"});
    }

    const hashedPassword = await bcrypt.hash(password, 10)  //encrypt the password

    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();

    res.json({message: "User Registered Successfully!"});
});

router.post("/login", async(req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user) {
        return res.json({message: "User Doesn't Exist!"});
    }

    const isPasswordValid = await  bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.json({message: "Username or Password is Incorrect!"});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id})
});

export {router as userRouter};

//create a middleware to validate requests by creating tokens
export const verifyToken = (req, res, next) => {
    const token = req.header.authorization;
    if(token) {
        jwt.verify(token, "secret", (err) => {
            if(err) return res.sendStatus(403);
            next();   //if no errors then continue with the request
        });
    } else {
        res.sendStatus(401);
    }
}