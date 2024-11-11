const mongoose = require('mongoose')

const banner = mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    }
})

const Banner = mongoose.model('banner', banner);

module.exports = Banner 