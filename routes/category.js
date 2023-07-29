const express = require("express");
const {
  getCategory,
  getCategories,
  addCategory,
} = require("../controllers/category");

const verifyJWT  = require("../middlewares/verifyJWT");

const router = express.Router();

router.post("/", verifyJWT, addCategory);

router.get("/", verifyJWT, getCategories);

router.get("/:id", verifyJWT, getCategory);

module.exports = router;
