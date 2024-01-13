const {verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin} = require("./verifyToken");
const Product= require("../models/productSchema");
const router = require("express").Router()


//Create Product
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});



//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET PRODUCT BY ID
router.get("/find/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL Products

router.get("/find/",verifyTokenAndAdmin, async (req, res) => {
  try {
      const allProducts = await Product.find();
      res.status(200).json(allProducts);
  } catch (err) {
      res.status(500).json(err);
  }
});


module.exports = router;