const express = require("express");
const { getEvents, createEvent } = require("../controllers/event");
const auth = require("../middlewares/auth");
const { validateEvent } = require("../middlewares/validation");

const router = express.Router();

router.get("", auth, getEvents);

router.post("", auth, validateEvent, createEvent);

module.exports = router;
