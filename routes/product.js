const express = require("express");
const {
  getProduct,
  getProducts,
  addProduct,
} = require("../controllers/product");

const  verifyJWT  = require("../middlewares/verifyJWT");

const router = express.Router();

router.post("/", verifyJWT, addProduct);

router.get("/", verifyJWT, getProducts);

router.get("/:id", verifyJWT, getProduct);

module.exports = router;
