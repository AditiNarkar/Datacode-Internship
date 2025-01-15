const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    rollno: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            },
            message: 'Please enter a valid email address.',
        },
    },
    age: {
        type: Number,
        required: true,
        min: [10, 'Age must be at least 10'],
        max: [100, 'Age must be less than or equal to 100'],
    },
    course: {
        type: String,
        required: true, 
        enum: ['Science', 'Arts', 'Commerce', 'Engineering', 'Medicine'],
    },
}, { timestamps: true });

module.exports = mongoose.model('STUDENT', StudentSchema);
