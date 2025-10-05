const bcrypt = require("bcrypt");
const User = require("../models/users.models")
const {signinAccessToken , signinRefreshToken , verifyRefreshToken} = require("../utils/jwt");
require("dotenv").config();

const cookieOptions = ()=>({
    httpOnly : true,
    secure : false,
    sameSite : "strict",
    maxAge : 1*60 *60 * 1000
})


exports.login = async (req,res)=>{
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user){
            return res.status(404).send({
                message : "User doesent exist"
            })
        }

        const isValid = bcrypt.compareSync(req.body.password , user.password );
        if(!isValid){
            return res.status(403).send({
                message : "Wrong password..!"
            })
        }

        const accessToken = signinAccessToken({username : user.username});
        const refreshToken = signinRefreshToken({username : user.username});

        user.refreshToken = refreshToken ;
        await user.save();

        res.cookie("refreshToken",refreshToken,cookieOptions())

        res.status(200).json({accessToken});

    }catch(err){
        return res.status(400).json({
            error : err.message
        })
    }
}

exports.refresh = async (req,res)=>{
    try{
        const token = req.cookies.refreshToken;
        if(!token) {
            return res.status(400).json({message : "No refresh token"})
        }

        let payload ; 
        try{
            payload = verifyRefreshToken(token);
        }catch(err){
            return res.status(403).json({ message : "Invalid refresh token"})
        }
        //rotation
        const newAccessToken = signinAccessToken({username : payload.username});
        const newRefreshToken = signinRefreshToken({username : payload.username});

        const user = await User.findOne({username : payload.username});
        user.refreshToken = newRefreshToken;
        await user.save();

        res.cookie("refreshToken",newRefreshToken,cookieOptions());
        res.json({accessToken : newAccessToken})

    }catch(err){
        return res.status(400).json({
            message : err.message
        })
    } 
}


exports.register = async (req,res)=>{
    try{
        const user = {
            username : req.body.username , 
            password : bcrypt.hashSync(req.body.password , 8)
        }
        await User.create(user)
        res.status(201).json({
            message : "User created successully...!",
            user : {
                username : req.body.username,
                password : req.body.password
            }
        })
    }catch(err){
        return res.status(400).json({
            message : err.message
        })
    }
}


exports.logout = async (req,res)=>{
    try{
        const token = req.cookies.refreshToken;
        if(token){
            try{
                const payload = verifyRefreshToken(token);
                const user = await User.findOne({username : payload.username});
                if(user){
                    user.refreshToken = undefined;
                    await user.save();
                }
            }catch(err){
                //ignored because user will logout
            }
        }
        res.clearCookie("refreshToken" , cookieOptions());
        return res.json({
            message : "Logged out successflly..!"
        })
    }catch(err){
        res.status(400).json({
            message :  err.message
        })
    }
}