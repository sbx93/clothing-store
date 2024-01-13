const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Cart = require("../models/CartSchema");
const router = require("express").Router();


//Create Cart
router.post("/", verifyToken, async (req, res) => {
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json("You already have a cart");
    }
});



//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET USER CART
router.get("/find/:userId",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET CART BY ID
router.get("/find/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL 

router.get("/find/",verifyTokenAndAdmin, async (req, res) => {
  try {
      const allCarts = await Cart.find();
      res.status(200).json(allCarts);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;