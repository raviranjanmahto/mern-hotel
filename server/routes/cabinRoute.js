const router = require("express").Router();
const cabinControllers = require("../controllers/cabinController.js");
const userControllers = require("../controllers/userController");

// Protects all routes after this middleware.
router.use(userControllers.protectApi);

router.post("/createCabin", cabinControllers.createCabinApi);
router.patch("/editCabin/:id", cabinControllers.editCabinApi);
router.get("/getCabins", cabinControllers.getCabinsApi);
router.delete("/deleteCabin/:id", cabinControllers.deleteCabinApi);

module.exports = router;
