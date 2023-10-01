const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "admin"],
        message: "{VALUE} is not supported",
      },
    },
    addresses: [
      {
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
      },
    ],
    cart: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
        quantity: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists.' });

module.exports = mongoose.model("User", UserSchema);
