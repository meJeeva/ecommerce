const category = require('./../model/categoryModel')
const { v4: uuidv4 } = require('uuid');

const createCategory = async (req, res) => {
    try {
        const { categoryName, categoryImage } = req.body;

        if (!categoryName) {
            return res.status(500).json({
                success: false,
                message: "category Name Required"
            })
        }

        let categoryNameFound = category.some((item) => item.categoryName.toLowerCase() === categoryName.toLowerCase());
        if (categoryNameFound) {
            return res.status(500).json({
                success: false,
                message: "category Name Already Exists!"
            })
        }

        const newCategory = new category({
            categoryId: uuidv4(),
            categoryName,
            categoryImage
        })
        await newCategory.save();
        res.status(201).json({
            success: true,
            message: "category added successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            message: "error in category added"
        })
    }
}

const allCategories = async (req, res) => {
    try {
        const categories = await category.find();
        console.log('categories', categories);

        res.status(200).json({
            success: true,
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in getting categories",
            error: error.message || error
        });
    }
};


module.exports = {
    createCategory,
    allCategories
}