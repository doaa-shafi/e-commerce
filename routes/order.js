const express = require("express");
const { getOrder, getOrders,addToBag, createOrder } = require("../controllers/order");

const verifyJWT  = require("../middlewares/verifyJWT");

const router = express.Router();

router.post("/add/:product_id", verifyJWT, addToBag);

router.post("/", verifyJWT, createOrder);

router.get("/", verifyJWT, getOrders);

router.get("/:id", verifyJWT, getOrder);

module.exports = router;
