const router = require("express").Router();
const { validateLogin, validateSignup } = require("../middlewares/validator");

const usersRouter = require("./users");
const passRouter = require("./passes");
const eventsRouter = require("./events");

const redemptionsRouter = require("./redemptions");
const { login, signup } = require("../controllers/users");
const {
  getRewards,
  createReward,
  deleteReward,
} = require("../controllers/rewards");

router.use("/users", usersRouter);
router.use("/pass", passRouter);
router.use("/events", eventsRouter);
router.use("/redemption", redemptionsRouter);

router.post("/rewards", createReward);
router.get("/rewards", getRewards);
router.delete("/rewards/:rewardId", deleteReward);
router.post("/signin", validateLogin, login);
router.post("/signup", validateSignup, signup);

router.use((req, res, next) => {
  next(new Error("Not Found"));
});

module.exports = router;
