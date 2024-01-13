const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema({
    userID: {
        type:String,
        unique: true,
    },
    products: {
        type: Array,
        productId: String,
        quantity: {
            type : Number,
            default : 1,
        }
    },
    totalAmount : {
        type : Number,
        required : true
}
})

module.exports = mongoose.model("Cart", CartSchema);