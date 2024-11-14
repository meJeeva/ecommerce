const subcategory = require("../model/subCategoryModel");

const createSubCategory = async (req, res) => {
  try {
    const {subCategoryName, categoryId, subcategoryImage} = req.body;

    if (!subCategoryName) {
      return res.status(404).json({
        success: false,
        message: 'subCategoryName is required!',
      });
    }

    if (!categoryId) {
      return res.status(404).json({
        success: false,
        message: 'categoryId is required!',
      });
    }

    const createSubCategory = new subcategory({
        subCategoryName,
        categoryId,
        subcategoryImage,
    });

    await createSubCategory.save();

    res.status(201).json({
      success: true,
      message: 'Subcategory created successfully!',
    });

  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      success: false,
      message: 'Error in creating subcategory',
    });
  }
};



module.exports = {
  createSubCategory,
};