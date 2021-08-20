const Logger = require("./logger");
const logger = new Logger();

logger.on("connection", function (args) {
  console.log("bağlantı kuruldu.", args);
});

logger.log("ozancan login");
