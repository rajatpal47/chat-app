import bcrypt from 'bcryptjs';
import User from "../models/user.model.js"
import gernerateTokenAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) =>{
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword){
            return res.status(400).json({error:"password don't match"})
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"username already exists"})
        }

        // HASH PASSWORD HERE
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            // confirmPassword,
            gender,
            profilePic: gender === "male"? boyProfilePic : girlProfilePic
        })

       if (newUser){
        // gernerate JWT token

        gernerateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            fullName: newUser.fullName,
            // gender: newUser.gender,
            profilePic: newUser.profilePic
        });
       } else {
        res.status(400).json({error: "invalid user data"})
       }

    } catch (error) {
        console.log("error in signup controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const login = async (req, res) =>{
    try {
        const {username, password}= req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user ||!isPasswordCorrect){
            return res.status(400).json({error: "invalid username or password"})
        }
        // gernerate JWT token
        gernerateTokenAndSetCookie(user._id, res);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            // gender: user.gender,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "successfully logged out"});
    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({error: "Internal Server Error"})
    }
}