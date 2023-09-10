// Create variable, call module and library
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const cartRoute = require('./routes/cart');

dotenv.config();

// Connection to Database
mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        console.log("Connect to Database Successfull");
    })
    .catch((err) => {
        console.log("Fail to Connect to Database");
    })

//Middleware
app.use(express.json());


//Middleware router
app.use('/api/users', userRoute);
app.use('/api/users', authRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);
app.use('/api/cart', cartRoute);

app.listen(PORT, (req, res) => {
    console.log('Server connected at http://localhost:' + PORT);
})