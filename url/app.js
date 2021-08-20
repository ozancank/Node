const url = require("url");

const address = "http://ozancank.site/kurslar?year=2021&month=agustos";

let result = url.parse(address, true);

console.log(result);
