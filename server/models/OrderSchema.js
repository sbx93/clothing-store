const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userID: {
        type:String,
        required : true
    },
    products: {
        type: Array,
        productID: String,
        quantity: {
            type : Number,
            default : 1,
        }
    },
    address: Object,
    status : {
        type : String,
        default : 'Pending'
    },
    totalAmount : {
        type : Number,
        required : true
    }
})


module.exports = mongoose.model("Order", OrderSchema);