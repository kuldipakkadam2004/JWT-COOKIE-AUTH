const User = require("../models/users.models");

exports.getProfile = async (req,res)=>{
    const user = await User.findOne({username : req.username}).select("username _id");
    if(!user){
        return res.status(404).send({
            message : `User doesent exist`
        })
    }

    return res.status(200).send(user);
}

