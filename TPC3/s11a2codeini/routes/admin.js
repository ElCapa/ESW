const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');
const Product = require('../models/product'); // Importar o modelo Product
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
    const { title, price, imageUrl, description } = req.body;
    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
    })
    .then(result => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err); 
        res.status(500).send('Erro ao adicionar produto');
    });
});

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
