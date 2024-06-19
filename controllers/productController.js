const Product = require('../models/product')

const validCategories = ["men", "women", "teens"]

const addNewProduct =  async(req, res) => {
    const {name, description, price, quantity, category} = req.body;
    if(!validCategories.includes(category)) {
        return res.status(204).json({ error: "Category has to includes men, women or teens" })
    }
    try {
        const product = new Product({ name, description, price, quantity, category })
        await product.save()
        return res.status(200).json(product)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const getAllProducts = async(req, res) => {

    try {
        const products = await Product.find()
        if(!products) {
            res.status(204).json({ error: "No products found! "})
        }
        res.status(200).json(products)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const getASingleProductById = async(req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findById(id)
        if(!product) {
            res.status(204).json({ error: "No products found! "})
        }
        res.status(200).json(product)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const updateAnExistingProductById = async(req, res) => {
    const {id} = req.params
    const {name, description, price, quantity, category} = req.body;

    try {
        const product = await Product.findByIdAndUpdate(
            id, 
            {name, description, price, quantity, category}, 
            {new: true}
        )
        res.status(200).json(product)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}


const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(204).json({ message: "Item not found!" });
        }
        res.status(200).json({ message: "Item successfully removed!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteAllProducts = async(req, res) => {
    try {
        const products = await Product.deleteMany()
        res.status(200).json(products)
    } catch(error) {
        res.status(400).json({ error: error.message })
    }
}

const getProductsByName = async(req, res) => {
    const { name } = req.query;
    try {
        if (!name || typeof name !== 'string') {
            return res.status(204).json({ error: 'Invalid name parameter.' });
        }

        const regex = new RegExp(name, 'i');
        const products = await Product.find({ "name": { $regex: regex } });

        if (products.length === 0) {
            return res.status(204).json({ error: `No products found with the name '${name}'.` });
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}




module.exports = {
    addNewProduct,
    getAllProducts,
    getASingleProductById,
    updateAnExistingProductById,
    deleteProductById,
    deleteAllProducts,
    getProductsByName
}