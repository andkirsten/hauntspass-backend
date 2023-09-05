const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { errors } = require("celebrate");
const { errorHandler } = require("./middlewares/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { validateLogin } = require("./middlewares/validation");
const usersRouter = require("./routes/users");
const { login, signup } = require("./controllers/users");

const app = express();
const { PORT = 3001 } = process.env;

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(requestLogger);

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

app.post("/signup", validateLogin, signup);
app.post("/login", validateLogin, login);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${PORT}`);
});
