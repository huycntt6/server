const { number } = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    phone: {
        type: String,
        max: 25,
		default: ''
    },
    address: {
        type: String,
        max: 255,
		default: ''
    },
	avatar: {
        type: String,
        max: 1024,
		default: ''
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);