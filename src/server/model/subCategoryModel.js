const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    subCategoryName: String,
    subCategoryId: {
        type: String,
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    categoryName: String,
    subcategoryImage: String,
})

const subcategory = mongoose.model('subCategory', subCategorySchema);

module.exports = subcategory;