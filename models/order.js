const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        name:{
          type:String
        },
        price:{
          type:Number
        }
      },
    ],
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "",
      enum: {
        values: ["", "", ""],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
