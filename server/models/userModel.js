const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide your full name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      trim: true,
      select: false,
    },
  },
  { timestamps: true }
);

// PASSWORD HASHING BEFORE SAVING WORKED ONLY ON CREATE OR ON SAVE
userSchema.pre("save", async function (next) {
  // Only run this function when password is actually modified!
  if (!this.isModified("password")) return next();

  //   Hash the password with cost of 11
  this.password = await bcrypt.hash(this.password, 11);
});

// COMPARING CANDIDATE PASSWORD WITH HASHED PASSWORD
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
