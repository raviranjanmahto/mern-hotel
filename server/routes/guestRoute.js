const router = require("express").Router();
const guestControllers = require("../controllers/guestController.js");
const userControllers = require("../controllers/userController");

// Protects all routes after this middleware.
router.use(userControllers.protectApi);

router.post("/createGuest", guestControllers.createGuestApi);
router.get("/getGuest", guestControllers.getGuestApi);
router.delete("/deleteGuest/:id", guestControllers.deleteGuestApi);

module.exports = router;
