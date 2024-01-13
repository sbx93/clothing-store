const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    title : {
        type:String,
        required: true
    },
    descr: {
        type:String,
        required:true,
    },
    images: {
        type: Array,
        required: true,
    },
    categories : Array,
    size : String,
    colour: String,
    price : {
        type: Number,
        required : true
    }


})

module.exports = mongoose.model("Product", ProductSchema);