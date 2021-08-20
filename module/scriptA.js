//tarayıcı

/*
var controllerA = (function () {
  //private
  var age = 20;
  var firstname = "ozan";

  var log = function () {
    console.log(this.firstname);
  };

  //public
  return {
    firstname,
    log,
  };
})();
*/

//nodejs

//console.log(module); //export=public

var firstName = "ozan";
var age = 30;

var Log = function (name) {
  console.log(name);
};

// module.exports.name = firstName;
// module.exports.log = Log;

module.exports = {
  firstName,
  Log,
};
