const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { errorHandler } = require("./middlewares/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateLogin, validateSignup } = require("./middlewares/validation");
const usersRouter = require("./routes/users");
const passRouter = require("./routes/passes");
const eventsRouter = require("./routes/events");
const rewardsRouter = require("./routes/rewards");
const { login, signup } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/haunts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("Connected to MongoDB"))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use("/users", usersRouter);
app.use("/pass", passRouter);
app.use("/events", eventsRouter);
app.use("/rewards", rewardsRouter);

app.post("/login", validateLogin, login);
app.post("/signup", validateSignup, signup);

app.use(() => {
  throw new Error("Not Found");
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${PORT}`);
});
