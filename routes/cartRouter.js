const express = require('express');
const router = express.Router();

const cartController = require('./../controllers/cartController');

router
    .route('/')
    .post(cartController.addItem)
    .get(cartController.showCart);

module.exports = router;