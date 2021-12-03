const express = require("express");
const router = express.Router();

const { isAuth } = require("../../middlewares/auth.middleware");

const { newCategory, getAllCategories, getCategoryById, deleteCategoryById, updateCategorybyId, getAllCategoriesByUser } = require("../controllers/category.controller");

// Route to create e new Category
router.post("/create", [isAuth], newCategory);
// Route to return all Category
router.get("/", [isAuth], getAllCategories);
// Route to return single Category by ID
router.get("/:categoryId", [isAuth], getCategoryById);
// Router to delete categories in our DB
router.delete("/:categoryId", [isAuth], deleteCategoryById);
// Router to updating a Category in the DB
router.put("/:categoryId", [isAuth], updateCategorybyId);
// Router to get the categories from DB by creator
router.get("/categoriesByUser", [isAuth], getAllCategoriesByUser);

// We export the router
module.exports = router;
