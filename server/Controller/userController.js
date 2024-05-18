const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { param } = require("../Routes/userRoute");

const createToken = (_id) => {
    const jwtkey= process.env.jwt_Key_Secret;

    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const registeruser = async(req, res) => {
    try{
    const {name, email, password} =req.body;
    let user = await userModel.findOne({email});

    if(user)return res.status(400).json("user with the given email is already exist..");

    if(!name || !email || !password) return res.status(400).json("All Field are required..");

    if(!validator.isEmail(email)) return res.status(400).json("Email must be valid..");

    if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be strong Password...");

    user = userModel({name, email, password});

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);
    res.status(200).json({_id: user._id, name, email, token});
    }catch(error){
        console.log(error);
    res.status(500).json(error);
}
};

const loginuser = async(req, res) => {

        const {email, password} = req.body;
        try{
                let user = await userModel.findOne({email});
                if(!user) return res.status(400).json("Invalid Username & password!!");

                const isValidPassword = await bcrypt.compare(password, user.password);

                if(!isValidPassword) return res.status(400).json("Invalid username & Password!!");

                const token = createToken(user._id);
                res.status(200).json({_id: user.name, email, token});
        }
        catch(error)
        {
                console.log(error);
                res.status(500).json(error);
        }
};

const findUser = async (req, res) => {
        const userId = req.params.userId;

        try{
        const user = await userModel.findById(userId);
    
        res.status(200).json(user);
        }
        catch(error){
            console.log(error);
            req.status(500).json(error);
        }
    };

    const getusers = async (req, res) =>{
        try{
            const users = await userModel.find()
            res.status(200).json(users);

        }
        catch(error)
        {
            console.log(error);
        res.status(500).json(error);        }
    }
module.exports = { registeruser, loginuser, findUser, getusers };