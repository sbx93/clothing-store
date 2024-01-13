var express = require("express")

const app = express()

const cors = require("cors")

const mongoose = require("mongoose")

const userRoute = require("./routes/user")

const authRoute = require("./routes/auth")

const productRoute = require("./routes/product")

const orderRoute = require("./routes/order")

const cartRoute = require("./routes/cart")

const stripeRoute = require("./routes/stripe")

require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DATABASE)
    console.log("DB connection successful")
}

app.use(express.json());

app.use(cors());

app.use("/api/user", userRoute)

app.use("/api/auth", authRoute)

app.use("/api/product", productRoute)

app.use("/api/order", orderRoute)

app.use("/api/cart", cartRoute)

app.use("/api/checkout", stripeRoute)


app.listen(process.env.PORT ,() => {
    console.log('backend server running')
  })