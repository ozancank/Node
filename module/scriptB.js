/*

var controllerB = (function () {
  var firstname = "kösemez";

  return{
      firstname
  }
})();

console.log(controllerA.firstname);
console.log(controllerB.firstname);
*/

const scriptA = require("./scriptA");

scriptA.Log("Can");
console.log(scriptA.firstName);
