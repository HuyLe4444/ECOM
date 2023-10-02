const router = require('express').Router();
const Product = require('../models/Product');
const { findByIdAndDelete, find } = require('../models/User');
const { productValidation } = require('../validation');
const { verifyTokenUser, verifyTokenAdmin } = require('./verifyToken');

//GET ALL PRODUCT
router.get('/all', verifyTokenUser, async (req, res) => {
    try {
        const product = await Product.find().sort({_id: -1});
        res.json(product);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})

//GET A PRODUCT BY ID
router.get('/find/:id', verifyTokenUser, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})


//ADD PRODUCT (ADMIN)
router.post('/add/product', verifyTokenAdmin, async (req,res) => {
    const { error } = await productValidation(req.body);
    if(error) return res.send(error.details[0].message);

    const product = new Product({
        title: req.body.title,
        desc: req.body.desc,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price
    });
    try {
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch(error) {
        res.status(400).send("Can not add product");
    } 
})


//DELETE PRODUCT (ADMIN)
router.delete('/delete/product/:id', verifyTokenAdmin, async (req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.send("Delete Product Successfully!");
    } catch(error) {
        res.status(500).send("Can not Delete");
    }
})


//UPDATE PRODUCT (ADMIN)
router.put('/update/product/:id', verifyTokenAdmin, async (req,res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, 
        {
            $set: req.body,
        }, {new:true});
        res.json(product);
    } catch (err) {
        res.status(500).send("ERROR");
    }
})


module.exports = router;