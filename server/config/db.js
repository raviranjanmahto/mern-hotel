const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");

exports.connectDatabase = catchAsync(() => {
  return mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("Database connection established🥰💚🥰"))
    .catch(err => console.log("ERROR🎇💥🎇connecting database", err.message));
});
