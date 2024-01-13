const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// parse application/json
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("<h1>Home page </h1>");
});

require("./routes/index")(app);

app.listen(PORT, () => {
  console.log(
    colors.cyan(`Server in ${process.env.APP_ENV} is running on port ${PORT}`)
  );
});