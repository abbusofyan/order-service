const express = require('express');
const mongoose = require('mongoose');
const Order = require('./models/Order.js')
require('dotenv').config();

const app = express();
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Mongoo connected'))
.catch(err => console.log('Mongo error : ', err));


app.get('/api/orders', async (req, res) => {
    const orders = await Order.find()
    res.json(orders)
});

app.get('/api/orders/:id', async(req, res) => {
    const order = await Order.findById(req.params.id)
    res.json(order)
})

app.post('/api/orders', async (req, res) => {
    const { userId, item, quantity } = req.body
    const order = new Order({userId, item, quantity});
    await order.save()
    res.status(201).json(order)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('Order service running on port : ' + PORT));
