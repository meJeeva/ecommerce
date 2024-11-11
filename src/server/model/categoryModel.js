
const mongoose = require('mongoose')

const CategoryModel = mongoose.Schema({
    categoryName: String,
    categoryImage: String,
    categoryId: {
        type: String,
        unique: true
    }
}, {
    timestamps: true
});

const categoryModel = mongoose.model('category', CategoryModel);

module.exports = categoryModel;