const path = require('path');
const express = require('express');
const shopController = require('../controllers/shop');
const Product = require('../models/product'); 
const router = express.Router();

router.get('/', (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => {
        console.log(err); 
        res.status(500).send('Erro ao carregar produtos');
    });
});

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
