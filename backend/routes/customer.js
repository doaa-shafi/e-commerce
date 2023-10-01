const express = require("express");
const { addAddress, getCustomer, getCustomers,showMyCart} = require("../controllers/customer");

const verifyJWT  = require("../middlewares/verifyJWT");


const router = express.Router();

router.patch("/add-address/:id", verifyJWT, addAddress);

router.get("/", verifyJWT, getCustomers);

router.get("/cart", verifyJWT, showMyCart);

router.get("/:id", verifyJWT, getCustomer);

module.exports = router;






















