var fs = require('fs');
var path = require('path');

const Item = require("./../models/itemModel");

exports.getAllItems = async(req, res) => {
    try {

        const queryObj = {...req.query };
        excludedFields = ['fields', 'page', 'sort', 'limit'];
        excludedFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        const query = Item.find(JSON.parse(queryStr));

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        }

        const items = await query;

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: items.length,
        });
    } catch (err) {
        res.status(400).json({
            status: 'failure',
            message: err.message
        });
    }
};

exports.createItem = async(req, res) => {

    try {
        var obj = {
            name: req.body.name,
            price: req.body.price,
            image: {
                data: fs.readFileSync(path.join(__dirname + "./../uploads/" + req.file.filename)),
                contentType: ["image/jpeg", "image/png"]
            }
        }
        const newItem = await Item.create(obj);
        res.status(201).json({
            status: 'success',
            data: {
                item: newItem
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
}

exports.getItemById = async(req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                item
            }
        });
    } catch (err) {
        res.status(404).json({
            status: "failure",
            message: err.message
        });
    }
};

exports.removeItem = async(req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Not Found"
        });
    }
};