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
  res.status(201).json({ status: "success", newCabin });
});

exports.getCabinsApi = catchAsync(async (req, res) => {
  const cabins = await Cabin.find();
  res.status(200).json({ status: "success", cabins });
});

exports.deleteCabinApi = catchAsync(async (req, res) => {
  await Cabin.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({ status: "success" });
});

exports.editCabinApi = catchAsync(async (req, res) => {
  const { name, regularPrice, discount, description, image, maxCapacity } =
    req.body;
  const cabin = await Cabin.findOneAndUpdate(
    { _id: req.params.id },
    {
      name,
      regularPrice,
      discount,
      description,
      // image,
      maxCapacity,
    }
  );
  res.status(200).json({ status: "success", cabin });
});
