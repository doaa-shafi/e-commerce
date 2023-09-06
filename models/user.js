const mongoose = require("mongoose");

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
    bag: [
        {
          type: mongoose.Types.ObjectId,
          ref: "product",
        },
    ],
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", UserSchema);
