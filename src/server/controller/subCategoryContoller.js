const subcategory = require("../model/subCategoryModel");
const { v4: uuidv4 } = require('uuid');

const createSubCategory = async (req, res) => {
  try {
    const { subCategoryName, categoryId, subcategoryImage } = req.body;

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
      subCategoryId: uuidv4()
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

const allSubCategory = async (req, res) => {
  try {
    const subCategory = await subcategory.find();
    res.status(200).json({
      success: true,
      data: subCategory
    })
  } catch (error) {
    res.status(500).json({
      error: error.message || error,
      success: false,
      message: 'Error in get subcategory',
    });
  }
}

module.exports = {
  createSubCategory,
  allSubCategory
};