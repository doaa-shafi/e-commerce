const express = require("express");
const { addAddress, getCustomer, getCustomers,showMyBag} = require("../controllers/customer");

const verifyJWT  = require("../middlewares/verifyJWT");


const router = express.Router();

router.patch("/", verifyJWT, addAddress);

router.get("/", verifyJWT, getCustomers);

router.get("/bag", verifyJWT, showMyBag);

router.get("/:id", verifyJWT, getCustomer);

module.exports = router;






















