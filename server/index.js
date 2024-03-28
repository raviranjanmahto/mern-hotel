require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDatabase } = require("./config/db");
const AppError = require("./utils/appError");
const userRoute = require("./routes/userRoute");
const cabinRoute = require("./routes/cabinRoute");
const guestRoute = require("./routes/guestRoute");
const errorGlobalMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/cabins", cabinRoute);
app.use("/api/v1/guests", guestRoute);

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorGlobalMiddleware);

connectDatabase();
const port = process.env.PORT || 7012;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
