const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    productId: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [ProductSchema],
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);