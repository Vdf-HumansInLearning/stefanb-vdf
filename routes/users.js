var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", function (req, res) {
  let users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf8")
  );
  if (!users) {
    res.status(404).send("Users not found");
  }
  res.json(users);
});

router.get("/:id", function (req, res) {
  let users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf8")
  );
  const user = users.find((user) => user.id == req.params.id);
  if (!user) {
    res.status(404).send("The user with the given id was not found");
  }
  res.json(user);
});

router.delete("/:id", function (req, res) {
  let users = JSON.parse(fs.readFileSync());
  let updatedUsers = users.filter((user) => user.id != req.params.id);
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "../data/users.json"),
      JSON.stringify(updatedUsers)
    );
    res.send(`Deleting user ${req.params.id}`);
  } catch (err) {
    console.error(err);
    res.send(`Error`);
  }
});

router.post("/", function (req, res) {
  let users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf8")
  );
  if (
    req.body.username &&
    req.body.name &&
    req.body.email &&
    req.body.password
  ) {
    let userToAdd = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    };
    if (validUser) {
      users.push(userToAdd);
      fs.writeFileSync(
        path.resolve(__dirname, "../data/users.json"),
        JSON.stringify(users)
      );
      res.json(userToAdd);
    } else {
      res.status(400).send("User is not valid");
    }
  } else {
    res.status(400).send("Please complete all fields");
  }
});

function validUser(user) {
  let valid = true;
  return valid;
}

module.exports = router;
