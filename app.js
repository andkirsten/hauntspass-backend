const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const { errorHandler } = require("./middlewares/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { mongoServerAddress } = require("./utils/config");

const app = express();
const { PORT = 3001 } = process.env;

const routes = require("./routes");

dotenv.config();

app.use(cors());
app.use(helmet());
app.use(requestLogger);
app.use(express.json());

mongoose
  .connect(mongoServerAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log("Connected to MongoDB"))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err));

app.use(routes);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${PORT}`);
});
