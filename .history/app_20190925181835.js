const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/products", { useNewUrlParser: true })

// definimos el schema
const productsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

// definimos el modelo
const Products = mongoose.model('Products', productsSchema);

app.get('/products', (req, res) => {
    let product;
    async function showAllProducts() {
        product = await Products.find();
        res.json(product);
    }
    showAllProducts();
});

app.listen(3000, () => console.log("Listening on port 3000 ..."));