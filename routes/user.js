const router = require('express').Router();
const User = require("../models/User");
const crypto = require('crypto-js');
const { verifyTokenUser, verifyTokenAdmin } = require('./verifyToken');

//GET USER
router.get('/find/user/:id', verifyTokenUser, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user)
    } catch (err) {
        res.status(500).send("ERROR");
    }
});

//RESET PASSWORD
router.put('/update/user/:id', verifyTokenUser, async (req, res) => {
    if(req.body.password) {
        req.body.password = crypto.AES.encrypt(req.body.password, process.env.SECRET_HASH_SEED).toString();
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        }, {new:true});
        res.json(user);
    } catch (err) {
        res.status(500).send("ERROR");
    }
});


//GET ALL USER (ADMIN)
router.get('/getall/user', verifyTokenAdmin, async (req, res) => {
    try {
        const user = await User.find().sort({_id: -1});
        res.json(user);
    } catch (err) {
        res.status(500).send("ERROR");
    }
});

//DELETE USER (ADMIN)
router.delete('/delete/user/:id', verifyTokenAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.send("Delete Successfully");
    } catch (err) {
        res.status(500).send("ERROR");
    }
});



module.exports = router;