const Product = require('../models/product');
const shortid = require('shortid');
const slugify = require('slugify');


exports.createProduct =async (req, res) => {
try{
    // res.status(200).json({ file: req.files, body: req.body});

    const {
        name, price, description, category, quantity, createBy

    } = req.body;
    let productPicture = [];

    if(req.files.length > 0){
        productPicture = req.files.map(file => {
            return { img: file.filename }
        });

    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPicture,
        category,
        createBy: req.user._id
    });

     await product.save();
   res.status(201).json({ product }); 
}catch(err){
    console.error(err);
    return res.status(400).json({ err })
}

};