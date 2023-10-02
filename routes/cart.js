const router = require('express').Router();
const Cart = require('../models/Cart');
const { verifyTokenUser, verifyTokenAdmin } = require('./verifyToken');

//GET ALL CART 
router.get('/all', verifyTokenAdmin, async (req, res) => {
    try {
        const cart = await Cart.find();
        res.json(cart);
    } catch (error) {
        res.status(500).send("ERROR");
    }
})

//GET A CART BY ID
router.get('/find/:userID', verifyTokenUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({userID: req.params.userID});
        res.json(cart);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})


//CREATE CART 
router.post('/add/cart', verifyTokenAdmin, async (req,res) => {
    const cart = new Cart(req.body);
    try {
        const savedCart = await cart.save();
        res.send(savedCart);
    } catch(error) {
        res.status(500).send("Can not add product");
    } 
})


//DELETE CART 
router.delete('/delete/cart/:id', verifyTokenAdmin, async (req,res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.send("Delete Product Successfully!");
    } catch(error) {
        res.status(500).send("Can not Delete");
    }
})


//UPDATE CART
router.put('/update/cart/:id', verifyTokenUser, async (req,res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        }, {new:true});
        res.json(updatedCart);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})


module.exports = router;