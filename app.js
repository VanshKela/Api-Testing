const express = require('express');
const morgan = require('morgan');

const itemRouter = require('./routes/itemRouter');
const cartRouter = require('./routes/cartRouter');
const app = express();
// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(__dirname));

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// 3) ROUTES
app.use('/api/v1/item', itemRouter);
app.use('/api/v1/cart', cartRouter);

module.exports = app;