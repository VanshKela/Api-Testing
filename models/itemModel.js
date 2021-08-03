const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'This item already exists'],
        required: [true, 'Item should have a name']
    },
    price: {
        type: Number,
        required: [true, 'Item should have a price']
    },
    image: {
        data: Buffer,
        contentType: [String]
    }
})

module.exports = new mongoose.model('Item', itemSchema);