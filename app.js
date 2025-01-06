const initApp = require("./server");
const port = process.env.PORT;

const tmpFunc = async () => {
    const app = await initApp();
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`);
    });
};
tmpFunc();

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// console.log("before server");
// const init = require("./server");

// init((value) => {
//   console.log("after server: " + value);
// });

// const temp = async () => {
//    const value = await init();
//    console.log("after server: " + value);
// };
// temp();
