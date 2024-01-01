const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json({ newProduct });

    } catch (error) {
        throw new Error(error);
    }
});


//update product
const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title);
        }
        const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.json(updateProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleteProduct = await Product.findOneAndDelete(id);
        res.json(deleteProduct);
    } catch (error) {
        throw new Error(error);
    }
});

//Get a product
const getaProduct = asyncHandler(async (req, res) => {
    const { id } = req.params.id;
    try {
        const findProduct = await Product.findById(id);
        res.json({
            findProduct,
        });
    } catch (error) {
        throw new Error(error);
    }
});

//Get all products
const getAllProduct = asyncHandler(async (req, res) => {
    try {
        const getAllProdcuts = await Product.find();
        res.json(getAllProdcuts);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct };