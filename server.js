// const express = require("express");
// const app = express();
// const dotenv = require("dotenv").config();

// const mongoose = require("mongoose");
// mongoose.connect(process.env.DB_CONNECT);
// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to database"));

// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const postsRoute = require("./routes/posts_route");
// app.use("/posts", postsRoute);

// app.get("/about", (req, res) => {
//   res.send("Hello World!");
// });

// module.exports = app;

const init = () => {
  console.log("server");
};

module.exports = init;
