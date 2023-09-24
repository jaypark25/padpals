// models/grocery.js
const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    itemName: String,
    quantity: Number,
    purchased: Boolean,
    userID : mongoose.Schema.Types.ObjectId
    });

const Grocery = mongoose.model('Grocery', grocerySchema);

module.exports = Grocery;
