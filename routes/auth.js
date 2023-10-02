const router = require('express').Router();
const crypto = require('crypto-js');
const User = require('../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

dotenv.config();


//REGISTER
router.post('/register', async (req, res) => {
    //VALIDATION
    const { error } = await registerValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //CHECK IF EXISTED
    const userCheckExist = await User.findOne({username: req.body.username});
    if(userCheckExist) return res.status(400).send('Username Exist!');

    const emailCheckExist = await User.findOne({email: req.body.email});
    if(emailCheckExist) return res.status(400).send('Email Exist!');

    //ENCRYPT THE PASSWORD
    const hashedPassword = crypto.AES.encrypt(req.body.password, process.env.SECRET_HASH_SEED).toString();
    
    //ADD USER TO THE DATABASE
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err);
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    //VALIDATION
    const { error } = await loginValidation(req.body);
    if(error) return res.send(error.details[0].message);

    //CHECK IF EMAIL EXISTED
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is wrong!');

    //DECRYPT THE PASSWORD AND CHECK IF SUITABLE
    const hashedPassword = crypto.AES.decrypt(user.password, process.env.SECRET_HASH_SEED);
    const originalPass = hashedPassword.toString(crypto.enc.Utf8);
    const inputPassword = req.body.password;
    if(originalPass != inputPassword) {
        return res.send('Password is Incorect');
    }

    //CREATE A TOKEN
    const token = jwt.sign({
        _id: user._id,
        isAdmin: user.isAdmin,
        username: user.username
    }, process.env.SECRET_TOKEN,
    {
        expiresIn: "3d"
    });
    res.header('auth-token', token).send(token);
})

module.exports = router;