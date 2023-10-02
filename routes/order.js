const router = require('express').Router();
const Order = require('../models/Order');
const { verifyTokenUser, verifyTokenAdmin } = require('./verifyToken');

//GET ALL ORDER
router.get('/all', verifyTokenAdmin, async (req, res) => {
    try {
        const order = await Order.find();
        res.json(order);
    } catch (error) {
        res.status(500).send("ERROR");
    }
})

//GET A ORDER BY ID
router.get('/find/:userID', verifyTokenUser, async (req, res) => {
    try {
        const order = await Order.find({userID: req.params.userID});
        res.json(order);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})


//CREATE ORDER 
router.post('/add/cart', verifyTokenAdmin, async (req,res) => {
    const order = new Order(req.body);
    try {
        const savedOrder = await order.save();
        res.send(savedOrder);
    } catch(error) {
        res.status(500).send("Can not add product");
    } 
})


//DELETE ORDER 
router.delete('/delete/cart/:id', verifyTokenAdmin, async (req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.send("Delete Product Successfully!");
    } catch(error) {
        res.status(500).send("Can not Delete");
    }
})


//UPDATE ORDER
router.put('/update/cart/:id', verifyTokenAdmin, async (req,res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        }, {new:true});
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})



module.exports = router;