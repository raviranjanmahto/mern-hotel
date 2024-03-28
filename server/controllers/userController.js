const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signToken = id => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOption.secure = true;

  res.cookie("token", token, cookieOption);

  res.status(statusCode).json({ status: "success", token, user });
};

exports.signUpApi = catchAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const exUser = await User.findOne({ email });
  if (exUser)
    return next(new AppError("User already exist, Please login", 400));

  const user = new User({ fullName, email, password });
  await user.save();
  user.password = undefined;
  res.status(201).json({ status: "success", user });
});

exports.loginApi = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password)))
    return next(new AppError("Invalid email or password", 401));
  user.password = undefined;
  createSendToken(user, 200, res);
});

exports.getCurrentUserApi = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ status: "success", user });
});

exports.updateCurrentUserApi = catchAsync(async (req, res, next) => {
  const { fullName, avatar, password } = req.body;
  const user = await User.findOne({ _id: req.user.id });

  // Update user's fields
  if (fullName) user.fullName = fullName;
  if (avatar) user.avatar = avatar;
  if (password) user.password = password;

  // Save the updated user
  await user.save();
  res.status(200).json({ status: "success", user });
});

exports.logoutApi = catchAsync(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
});

exports.protectApi = catchAsync(async (req, res, next) => {
  let token;
  token = req.cookies.token;
  if (!token)
    return next(new AppError("Unauthorize, Please log in to get access!", 401));

  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist!",
        401
      )
    );
  req.user = currentUser;
  next();
});
