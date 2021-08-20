const fs = require("fs");

const files = fs.readdir("./", function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

const data = fs.readFile("index.html", "utf8", function (error, data) {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

fs.writeFile("deneme.txt", "Hello world...", function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Dosya oluşturuldu.");
  }
});

fs.appendFile("deneme1.txt", "Hello world...", function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Dosya oluşturuldu.");
  }
});

fs.unlink("deneme1.txt", function (error) {
  console.log("Dosya silindi.");
});

fs.rename("deneme.txt", "deneme1.txt", function (error) {
  console.log("Dosya ismi değiştirildi.");
});
