const {verifyAccessToken} = require("../utils/jwt")

exports.validateUser = async (req,res,next) =>{
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(401).json({
            message : "Unauthorized...!"
        })
    }

    const token = auth.split(" ")[1];
    try{
        const payload = verifyAccessToken(token);
        req.username = payload.username;
        next();
    }catch(err){
        return res.status(401).json({
            message : "Token is invalid or expired...!"
        })
    }

}