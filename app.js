// const port = process.env.PORT;

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// module.exports = app;

console.log("bedore server");
const init = require("./server");
init();
console.log("after server");