const Cart = require("./../models/cartModel");

exports.showCart = async(req, res) => {
    const userId = "5de7ffa74fff640a0491bc4d";

    try {
        let cart = await Cart.findOne({ userId });
        if (cart) {
            return res.status(201).send(cart);
        } else {
            const newCart = await Cart.create({
                userId,
                products: []
            });
            return res.status(201).send(newCart);
        }
    } catch (error) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.addItem = async(req, res) => {
    const { productId, quantity, name, price } = req.body;
    const userId = "5de7ffa74fff640a0491bc4d";

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                var quantityDiff = quantity - productItem.quantity;
                productItem.quantity = quantity;
                cart.products[itemIndex] = productItem;
                cart.subTotal = cart.subTotal + price * quantityDiff;
            } else {
                //product does not exists in cart, add new item
                cart.subTotal += quantity * price;
                cart.products.push({ productId, quantity, name, price });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                subTotal: price * quantity,
                products: [{ productId, quantity, name, price }]
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}