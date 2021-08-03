const express = require('express');
const path = require('path');
const itemController = require('./../controllers/itemController');

var multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname + "./../uploads/"));
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

const router = express.Router();

router
    .route('/')
    .get(itemController.getAllItems)
    .post(upload.single('image'), itemController.createItem);

router
    .route('/:id')
    .get(itemController.getItemById)
    .delete(itemController.removeItem);

module.exports = router;