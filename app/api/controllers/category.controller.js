const Category = require("../models/Category");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

// Method to create e new Category
const newCategory = async (req, res, next) => {
  try {
    const newCategory = new Category();
    newCategory.name = req.body.name;
    newCategory.description = req.body.description;
    newCategory.album = req.body.album;
    newCategory.author = req.body.author.id;
    const categoryDb = await newCategory.save();
    return res.json({
      satus: 201,
      message: HTTPSTATUSCODE[201],
      data: { category: categoryDb },
    });
  } catch (err) {
    return next(err);
  }
};

// Method to return all Category
const getAllCategories = async (req, res, next) => {
  try {
    if (req.query.page) {
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const categories = await Category.find().skip(skip).limit(20).populate("albums");
      return res.json({
        satus: 201,
        message: HTTPSTATUSCODE[201],
        data: { category: categories },
      });
    }
  } catch (err) {}
};

// Method to return single Category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const categoryDb = await Category.findById(categoryId).populate("albums");
    return res.json({
      satus: 201,
      message: HTTPSTATUSCODE[201],
      data: { category: categoryDb },
    });
  } catch (err) {
    return next(err);
  }
};

//Method to delete categories in our DB
const deleteCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const authority = req.authority.id;
    const userCategory = await Category.findById(categoryId);

    if (authority == userCategory.author._id) {
      const categoryDeleted = await Category.findByIdAndDelete(categoryId);
      if (!categoryDeleted) {
        return res.json({
          status: 200,
          message: "There is not a category with that Id",
          data: null,
        });
      } else {
        return res.json({
          status: 200,
          message: HTTPSTATUSCODE[200],
          data: { categories: categoryDeleted },
        });
      }
    } else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null,
      });
    }
  } catch (err) {
    return next(err);
  }
};

// Method to updating a Category in the DB
const updateCategorybyId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const authority = req.authority.id;
    const userCategory = await Category.findById(categoryId);
    if (authority == userCategory.author._id) {
      const categoryToUpdate = new Category();
      if (req.body.name) categoryToUpdate.name = req.body.name;
      if (req.body.description) categoryToUpdate.description = req.body.description;
      if (req.body.albums) categoryToUpdate.albums = req.body.albums;
      categoryToUpdate._id = categoryId;

      const categoryUpdated = await Category.findByIdAndUpdate(categoryId, categoryToUpdate);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { categories: categoryUpdated },
      });
    } else {
      return res.json({
        status: 403,
        message: HTTPSTATUSCODE[403],
        data: null,
      });
    }
  } catch (err) {
    return next(err);
  }
};

// Method to get the categories from DB by the creator.
const getAllCategoriesByUser = async (req, res, next) => {
  try {
    const author = req.authority.id;

    if (req.query.pge) {
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const allCategoriesByUser = await Category.find({ author: author }).skip(skip).limit(20).populate("albums");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { categories: allCategoriesByUser },
      });
    } else {
      const allCategoriesByUser = await Category.find({ author: author }).populate("albums");
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { categories: allCategoriesByUser },
      });
    }
  } catch (err) {
    return next(err);
  }
};

// We export the controller function
module.exports = {
  newCategory,
  getAllCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategorybyId,
  getAllCategoriesByUser,
};
