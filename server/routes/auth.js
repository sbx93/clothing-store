const router = require("express").Router();
const User = require("../models/UserSchema");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req,res) => {
    const isAdmin = req.body.isAdmin;
    if(isAdmin === ""){
    isAdmin = false;
}
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJS.AES.encrypt((req.body.password) , process.env.PASS_SEC).toString(),
        isAdmin : isAdmin
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    } catch(err){
        res.status(500).json(err)
    }
});
    //LOGIN
    router.post("/login", async (req,res) => {
        try {
            const user = await User.findOne({username : req.body.username});
            if(!user) { 
                res.status(401).json('Username not found in DB'); 
                return;
            }else {
                
                const ogPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC).toString(CryptoJS.enc.Utf8);
                ogPassword!== req.body.password && res.status(401).json("Wrong details")
                
                if(ogPassword === req.body.password){

                const token = jwt.sign({_id : user._id, isAdmin : user.isAdmin}, process.env.JWT_SEC, {expiresIn : "1d"});
                
                const {password, ...others} = user._doc;
                res.status(200).json({others, token});
                
                }
            }
            
        }catch(err){
            res.status(404).json(err);
        } 
});
        

module.exports = router;