var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", function (req, res, next) {
  let products = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/products.json"), "utf8")
  );
  if (!products) {
    res.status(404).send("Products not found");
  }
  res.json(products);
});

router.get("/:id", function (req, res, next) {
  let products = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/products.json"), "utf8")
  );
  let product = products.find((user) => user.id == req.params.id);
  if (!product) {
    res.status(404).send("The product with the given id was not found");
  }
  res.json(product);
});

router.delete("/products/:id", function (req, res) {
  let products = JSON.parse(fs.readFileSync());
  // verify if there is any user with id
  let updatedProducts = products.filter((user) => user.id != req.params.id);
  try {
    fs.writeFileSync("../data/products.json", JSON.stringify(updatedProducts));
    res.send(`Deleting user ${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send(`Error`);
  }
});

router.post("/", function (req, res) {
  let products = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/products.json"), "utf8")
  );
  if (
    req.body.name &&
    req.body.brand &&
    req.body.operating_system &&
    req.body.price &&
    req.body.discount &&
    req.body.quantity &&
    req.body.availability_date &&
    req.body.rating &&
    req.body.img
  ) {
    let productToAdd = {
      id: products[products.length - 1].id + 1,
      name: req.body.name,
      brand: req.body.brand,
      operating_system: req.body.operating_system,
      price: req.body.price,
      discount: req.body.discount,
      quantity: req.body.quantity,
      availability_date: req.body.availability_date,
      rating: req.body.rating,
      img: req.body.img,
    };
    if (validProduct) {
      products.push(productToAdd);
      fs.writeFileSync("../data/product.json", JSON.stringify(products));
      res.json(productToAdd);
    } else {
      res.status(400).send("Product is not valid");
    }
  } else {
    res.status(400).send("Please complete all fields");
  }
});

function validProduct(product) {
  let valid = true;
  return valid;
}

module.exports = router;
