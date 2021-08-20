const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   // res.setHeader("Content-Type", "text/plain");
  //   // res.setHeader("Content-Type", "application/json");
  //   res.setHeader("Content-Type", "text/html");
  //   res.statusCode = 200;
  //   res.statusMessage = "Ok";

  //   // res.write("hello World");
  //   // res.write(JSON.stringify({ name: "Samsung S8", print: 3000 }));
  //   res.write("<html>");
  //   res.write("<head><title>Deneme</title></head>")
  //   res.write("<body><h1>Hello World</h1></body>")
  //   res.write("</html>")
  //   res.end();

  fs.readFile("index.html", function (error, file) {
    if (error) {
      res.setHeader("Content-Type", "text/plain");
      res.statusCode = 404;
      res.statusMessage = "Not Found";
      res.end("Dosya Bulunamadı");
    }
    else{
      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;
      res.statusMessage = "Ok";
      res.end(file);
    }
  });
});

server.listen(3000);
console.log("Listening port on 3000...");
