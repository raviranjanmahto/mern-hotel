const router = require("express").Router();
const userControllers = require("../controllers/userController");

router.post("/login", userControllers.loginApi);

// Protects all routes after this middleware.
router.use(userControllers.protectApi);

router.post("/signup", userControllers.signUpApi);
router.post("/logout", userControllers.logoutApi);

router.get("/getCurrentUser", userControllers.getCurrentUserApi);
router.patch("/updateCurrentUser", userControllers.updateCurrentUserApi);

module.exports = router;
