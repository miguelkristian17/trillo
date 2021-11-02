const express = require("express");
const router = express.Router();
const {validationResult, check} = require("express-validator")
const User = require("../../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config")

//@route GET api/users
//desc Get all users
//@access Public
router.get("/", (req, res) => {
    User.find((err, users) => {
        if(err){
            res.send(err)
        } else {
            res.send(users)
        }
    })
});

//@route POST api/users
//desc Register user
//@access Public
router.post("/", [
    
    //validates fields
    check("name", "Name is Required")
        .not()
        .isEmpty(),
    check("username","Username is Required")
        .not()
        .isEmpty()
        .custom((value, {req}) => {
            return User.findOne({username: value}).then(user => {
                if(user){
                    return Promise.reject("Username already exists")
                }
            })}),
    check("email", "Please include an Email").isEmail()
        .custom((value, {req}) => {
            return User.findOne({email: value}).then(user => {
                if(user){
                    return Promise.reject("Email already exists")
                }
            })}),
    check("password", "Please enter a password with 8 or more characters")
    .isLength({min: 8})

], async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const { name, username, email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if(user){
            return res.status(400).json({msg: "User already exists"})
        }
        
        user = new User({
            name,
            username,
            email,
            password  
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt)

        await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
        
        const jwtSecret = config.get("jwtSecret")

        jwt.sign(
            payload,
            jwtSecret,
            {expiresIn: 360000},
            (err, token) => {
                if(err) throw err;
                res.json({token})
            })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server Error")
    }
});

module.exports = router;
