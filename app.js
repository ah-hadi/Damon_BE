const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./config/dbConfig");
const routes = require("./routes");
const path = require("path");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/public", (req, res) => {
  res.send("This is a publicly accessible route!");
});

app.use("/api", routes);

mongoose
  .connect(dbConfig.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
