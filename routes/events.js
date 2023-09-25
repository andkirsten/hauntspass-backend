const express = require("express");
const { getEvents, createEvent } = require("../controllers/event");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("", auth, getEvents);

router.post("", auth, createEvent);

module.exports = router;
