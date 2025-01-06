const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postsRoute = require("./routes/posts_route");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/posts", postsRoute);

app.get("/about", (req, res) => {
  res.send("Hello World!");
});

const initApp = () => {
  return new Promise(async (resolve, reject) => {
    await mongoose.connect(process.env.DB_CONNECT);
    resolve(app);
  });
};

module.exports = initApp;

// const init = (callback) => {
//   console.log("init server");
//   setTimeout(() => {
//     console.log("init server");
//     const output = "Success";
//     callback(output);
//   }, 1000);
// };

// const init2 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log("init server");
//       const output = "Success";
//       resolve(output);
//     }, 1000);
//   });
// };

// module.exports = init2;
