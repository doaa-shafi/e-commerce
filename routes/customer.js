const express = require("express");
const { addAddress, getCustomer, getCustomers ,getCustomerOrders} = require("../controllers/customer");

const verifyJWT  = require("../middlewares/verifyJWT");

const router = express.Router();

router.patch("/", verifyJWT, addAddress);

router.get("/", verifyJWT, getCustomers);

router.get("/:id", verifyJWT, getCustomer);

router.get("/:id/orders", verifyJWT, getCustomerOrders);

module.exports = router;






















