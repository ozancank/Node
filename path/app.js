const path = require("path");

let result = path.resolve("app.js");
result = path.extname("app.js");
result = path.parse(__filename);

console.log(result);
