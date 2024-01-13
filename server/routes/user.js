const {verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin} = require("./verifyToken");
const User = require("../models/UserSchema");
const router = require("express").Router()

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET USER BY ID
router.get("/find/:id",verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USERS

router.get("/find/",verifyTokenAndAdmin, async (req, res) => {
  try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
  } catch (err) {
      res.status(500).json(err);
  }
});


module.exports = router;