const router = require("express").Router();
const stripe = require("stripe")("sk_test_51KhzhrCm5S7lyGpQv9Z81xKap6nQOARf1Ae8EcCV9prSR7jvMkWlRuAMaGroVSq1Vh4zRVSkYvwOfRikiqIO53zD00dUnt9GNe");
const dotenv = require("dotenv").config();


router.get("/config", (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLIC_KEY,
    });
});

router.post("/create-payment", async (req, res) => {
    try{
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1999,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({clientSecret: paymentIntent.client_secret});}
    catch(error){
        res.status(400).send({error: "not working", message: error.message});
    }
});

module.exports = router;