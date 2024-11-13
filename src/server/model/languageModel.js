const mongoose = require('mongoose');

const languageSchema = mongoose.Schema({
    name: String,
    id: String
});

const language = mongoose.model('language', languageSchema);

module.exports = language;