const Category = require('../models/category')

const validCategories = ["men", "women", "teens"]

const insertCategory = async(req, res) => {
    const {name} = req.body;
    if(!validCategories.includes(name)) {
        return res.status(400).json({ error: "Category has to includes men, women or teens" })
    }
    try {
        const category = new Category({ name })
        await category.save()
        return res.status(200).json(category)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllCagetoriesFromDB = async(req, res) => {
    try {
        const categories = await Category.find()
        if(!categories) {
            res.status(400).json({ error: "No items founds!"})
        }
        res.status(200).json(categories)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteAllCategories = async(req, res) => {
    try {
        const category = await Category.deleteMany()
        if(!category) {
            res.status(400).json({ error: "No item to delete!"})
        }
        res.status(200).json({ message: "You have successfully deleted all categories. "})
        res.status(200).json(category)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    insertCategory,
    getAllCagetoriesFromDB,
    deleteAllCategories
}