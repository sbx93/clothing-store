const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require("../models/OrderSchema");
const router = require("express").Router();


//Create order
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json({error: err.message, order : newOrder});
    }
});



//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});


//GET USER ORDERS
router.get("/find/:userID",verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ORDER BY ID
router.get("/find/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL ORDERS

router.get("/find/",verifyTokenAndAdmin, async (req, res) => {
  try {
      const allOrders = await Order.find();
      res.status(200).json(allOrders);
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;