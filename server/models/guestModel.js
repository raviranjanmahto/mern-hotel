const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please tell us your full name."],
    },

    email: {
      type: String,
      required: [true, "Please tell us your email."],
      lowercase: true,
      trim: true,
    },
    nationalID: {
      type: String,
      required: [true, "Please tell us your national ID."],
    },
    nationality: {
      type: String,
      required: [true, "Please tell us your country name."],
    },
    countryFlag: {
      type: String,
      required: [true, "Please tell us your country flag."],
    },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);
module.exports = Guest;
