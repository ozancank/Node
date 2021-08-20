const express = require("express");
const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(`
      <html>
          <head>
          <title>Add Producte</title>
          </head>
          <body>
          <form method="POST" action="add-product">
              <input type="text" name="productName"/>
              <button type="submit">Save Product</button>
          </form>
          </body>
      </html>
      `);
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body);

  res.redirect("/");
});

module.exports = router;
