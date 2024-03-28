const Guest = require("../models/guestModel");
const catchAsync = require("../utils/catchAsync");

exports.createGuestApi = catchAsync(async (req, res) => {
  const { fullName, email, nationalID, nationality, countryFlag } = req.body;
  const newGuest = new Guest({
    fullName,
    email,
    nationalID,
    nationality,
    countryFlag,
  });
  await newGuest.save();
  res.status(201).json({ status: "success", newGuest });
});

exports.getGuestApi = catchAsync(async (req, res) => {
  const { sortBy, page, search } = req.query;
  const { field, direction } = JSON.parse(sortBy);

  // Calculate skip count for pagination
  const pageSize = 10; // Assuming 10 documents per page
  const skipCount = (page - 1) * pageSize;

  // Define the search query based on the 'search' parameter
  // const searchQuery = search ? { $text: { $search: search } } : {};
  const searchQuery = search
    ? {
        $or: [
          { fullName: { $regex: new RegExp(search, "i") } },
          { email: { $regex: new RegExp(search, "i") } },
          { nationalID: { $regex: new RegExp(search, "i") } },
          { nationality: { $regex: new RegExp(search, "i") } },
        ],
      }
    : {};

  // Find guests based on sorting and pagination
  const guests = await Guest.find(searchQuery)
    .sort({ [field]: direction }) // Sort based on sortBy field and direction
    .skip(skipCount) // Skip documents for pagination
    .limit(pageSize); // Limit the number of documents per page

  // Get total count of documents
  const count = await Guest.countDocuments();

  // Send response
  res.status(200).json({ status: "success", guests, count });
});

exports.deleteGuestApi = catchAsync(async (req, res) => {
  const guest = await Guest.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ status: "success" });
});

exports.editGuestApi = catchAsync(async (req, res) => {
  const { fullName, email, nationalID, nationality, countryFlag } = req.body;
  const guest = await Guest.findOneAndUpdate(
    { _id: req.params.id },
    {
      fullName,
      email,
      nationalID,
      nationality,
      countryFlag,
    }
  );
  res.status(200).json({ status: "success", guest });
});
