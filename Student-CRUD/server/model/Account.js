const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    accountType: {
        type: String,
        enum: ['Savings', 'Checking', 'Business', 'Joint'],
        required: true,
    },
})

module.exports = mongoose.model('Account', AccountSchema);
