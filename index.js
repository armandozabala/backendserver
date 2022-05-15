const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * routes
 * api/items
 */
app.use("/api/items", require("./routes/items"));

app.listen(process.env.PORT || 3300, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
