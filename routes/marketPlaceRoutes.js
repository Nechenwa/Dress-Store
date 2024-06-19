const express = require('express')
const router = express.Router()
const {
    insertCategory,
    getAllCagetoriesFromDB,
    deleteAllCategories
} = require('../controllers/categoryController')
const { 
    addNewProduct,
    getAllProducts,
    getASingleProductById,
    updateAnExistingProductById,
    deleteProductById,
    deleteAllProducts,
    getProductsByName,
} = require('../controllers/productController')


// Category routes
router.route('/category')
    .post(insertCategory)
    .get(getAllCagetoriesFromDB)
    .delete(deleteAllCategories)

// Product routes
router.route('/products')
    .post(addNewProduct)
    .get(getAllProducts)
    .delete(deleteAllProducts)

router.route('/products/:id')
    .get(getASingleProductById)
    .put(updateAnExistingProductById)
    .delete(deleteProductById)

router.route('/products/name/')
.get(getProductsByName)

module.exports = router