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

router.delete("/:id", function (req, res) {
  let products = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/products.json"), "utf8")
  );
  let updatedProducts = products.filter(
    (product) => product.id != req.params.id
  );
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "../data/products.json"),
      JSON.stringify(updatedProducts)
    );
    res.send(`Product with id:${req.params.id} deleted`);
  } catch (err) {
    console.error(err);
    res.send("Error");
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
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      quantity: Number(req.body.quantity),
      availability_date: req.body.availability_date,
      rating: Number(req.body.rating),
      img: req.body.img,
    };
    if (validProduct(productToAdd)) {
      products.push(productToAdd);
      fs.writeFileSync(
        path.resolve(__dirname, "../data/products.json"),
        JSON.stringify(products)
      );
      res.json(productToAdd);
    } else {
      res.status(400).send("Product is not valid");
    }
  } else {
    res.status(400).send("Please complete all fields");
  }
});

router.put("/:id", function (req, res) {
  let products = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/products.json"), "utf8")
  );
  let index = products.findIndex((item) => item.id === Number(req.params.id));
  console.log(index);
  let product = products.find((product) => product.id == req.params.id);
  if (
    req.body.name &&
    req.body.brand &&
    req.body.operating_system &&
    req.body.price &&
    req.body.discount &&
    req.body.quantity &&
    req.body.availability_date &&
    req.body.rating &&
    req.body.img &&
    product
  ) {
    let productToUpdate = {
      id: product.id,
      name: req.body.name,
      brand: req.body.brand,
      operating_system: req.body.operating_system,
      price: Number(req.body.price),
      discount: Number(req.body.discount),
      quantity: Number(req.body.quantity),
      availability_date: req.body.availability_date,
      rating: Number(req.body.rating),
      img: req.body.img,
    };
    if (validProduct(productToUpdate)) {
      products[index] = productToUpdate;
      fs.writeFileSync(
        path.resolve(__dirname, "../data/products.json"),
        JSON.stringify(products)
      );
      res.json(productToUpdate);
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
