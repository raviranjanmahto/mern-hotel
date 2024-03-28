const mongoose = require("mongoose");

const cabinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us Cabin name."],
    },
    regularPrice: {
      type: Number,
      required: [true, "Please tell us Cabin regular price."],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    description: {
      type: String,
      required: [true, "Please tell us Cabin description."],
    },
    image: {
      type: String,
    },
    maxCapacity: {
      type: Number,
      required: [true, "Please tell us Cabin max capacity."],
    },
  },
  { timestamps: true }
);

const Cabin = mongoose.model("Cabin", cabinSchema);
module.exports = Cabin;
