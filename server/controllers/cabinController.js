const Cabin = require("../models/cabinModel");
const catchAsync = require("../utils/catchAsync");

exports.createCabinApi = catchAsync(async (req, res) => {
  const { name, regularPrice, discount, description, image, maxCapacity } =
    req.body;
  const newCabin = new Cabin({
    name,
    regularPrice,
    discount,
    description,
    // image,
    maxCapacity,
  });
  await newCabin.save();
  res.status(201).json({ status: "success", data: newCabin });
});

exports.getCabinsApi = catchAsync(async (req, res) => {
  const cabins = await Cabin.find();
  res.status(200).json({ status: "success", data: cabins });
});
