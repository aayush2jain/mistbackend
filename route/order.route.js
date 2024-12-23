const express = require('express');
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
router.post("/",async (req,res)=>{
    try {
    const razorpay = new Razorpay({
      key_id: 'rzp_test_0KBfIDCc8HKw34',
      key_secret: 'sxdspMDuAOWdRNNefk8K51La',
    });
    const options = req.body;
    console.log("important",options);
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).send("Error");
    }
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
})
router.post("/verification", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.paymentResponse;
    console.log("very imp",req.body.paymentResponse);
  console.log("id check kerra hui",razorpay_order_id);
  const sha = crypto.createHmac("sha256",'sxdspMDuAOWdRNNefk8K51La');
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }
  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});
module.exports = router;