const router = require("express").Router();
const cabinControllers = require("../controllers/cabinController.js");
const userControllers = require("../controllers/userController");

// Protects all routes after this middleware.
router.use(userControllers.protectApi);

router.post("/createCabin", cabinControllers.createCabinApi);
router.get("/getCabins", cabinControllers.getCabinsApi);

module.exports = router;
