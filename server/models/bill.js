//models/bills.js
const mongoose = require('mongoose');

const billsSchema = new mongoose.Schema({
    billName: String,
    amount: Number,
    paid: Boolean,
    userID : mongoose.Schema.Types.ObjectId
    });

const Bills = mongoose.model('Bills', billsSchema);

module.exports = Bills;