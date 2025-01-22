const mongoose = require('mongoose');
const moment = require('moment');

const ExamSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    date: { type: Date, required: true, get: (date) => moment(date).format('DD-MM-YYYY') },
    completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'STUDENT' }]
}, { toJSON: { getters: true } });
// to enable getters when the document is converted to JSON

module.exports = mongoose.model('EXAM', ExamSchema);