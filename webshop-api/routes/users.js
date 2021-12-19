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
  let users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf8")
  );
  let updatedUsers = users.filter((user) => user.id != req.params.id);
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "../data/users.json"),
      JSON.stringify(updatedUsers)
    );
    res.send(`User with id:${req.params.id} deleted`);
  } catch (err) {
    console.error(err);
    res.send("Error");
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
    if (validUser(userToAdd)) {
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

router.put("/:id", function (req, res) {
  let users = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data/users.json"), "utf8")
  );
  let index = users.findIndex((item) => item.id === Number(req.params.id));
  console.log(index);
  let user = users.find((user) => user.id == req.params.id);
  if (
    req.body.username &&
    req.body.name &&
    req.body.email &&
    req.body.password &&
    user
  ) {
    let userToUpdate = {
      id: user.id,
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
    if (validUser(userToUpdate)) {
      users[index] = userToUpdate;
      fs.writeFileSync(
        path.resolve(__dirname, "../data/users.json"),
        JSON.stringify(users)
      );
      res.json(userToUpdate);
    } else {
      res.status(400).send("User is not valid");
    }
  } else {
    res.status(400).send("Please complete all fields");
  }
});

function validUser(user) {
  const letters = /^[A-Za-z]+$/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const minLengthPassword = 8;
  const minLengthName = 3;
  const minLengthUsername = 3;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  let valid = false;

  if (
    user.name.match(letters) &&
    user.name.length >= minLengthName &&
    user.username.length >= minLengthUsername &&
    user.password.match(lowerCaseLetters) &&
    user.password.match(upperCaseLetters) &&
    user.password.match(numbers) &&
    user.password.length >= minLengthPassword &&
    emailRegex.test(user.email)
  ) {
    valid = true;
  }

  return valid;
}

module.exports = router;
