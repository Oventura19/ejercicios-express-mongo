const Product = require("./models/Product"); //Requerimos el modelo de los productos
const express = require('express');
const router = express.Router();

//Routes
router.get('/products', async(req, res) => {
    const allProducts = await Product.find({});
    res.json(allProducts);
});

router.post('/products', async(req, res) => {
    const { name, price } = req.body;
    const product = new Product({
        name,
        price
    });
    await product.save();
    res.status(201).send(`<h1>${product}</h1>`);
})

module.exports = router;