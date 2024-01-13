const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password : String,
    address: {
        doorNumber: Number,
        street: String,
        city: String,
        postcode: String
    },
    phoneNumber: Number,
    orders:[],
    isAdmin : {
        type: Boolean,
        default: false
    },
},{timestamps:true})

module.exports = mongoose.model("User", UserSchema);