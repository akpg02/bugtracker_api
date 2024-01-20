const route = require("express").Router();
const userModel = require("../../Model/userModel");

route.post("/user", (req, res) => {
  userModel
    .create(req.body)
    .then((user) => {
      if (!user) return res.status(400).send("Error while creating user");
      res.send("User successfully created");
    })
    .catch((err) => res.status(400).send(err));
});

route.put("/user", (req, res) => {
  const { _id, name, password, role } = req.body;
  userModel
    .findByIdAndUpdate(_id, { name, password, role })
    .then((user) => {
      if (!user) return res.status(400).send("No User found");
      res.send("User updated");
    })
    .catch((err) => res.status(400).send(err));
});

route.post("/", (req, res) => {
  userModel
    .findOne(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(400)
          .send("Incorrect email and or password combination");
      res.cookie("user", user);
      res.send(true);
    })
    .catch((err) => {
      if (res) res.status(400).send(err);
    });
});

route.get("/", (req, res) => {
  userModel
    .find()
    .then((user) => {
      if (!user) return res.status(400).send("No users found");
      res.send(user);
    })
    .catch((err) => {
      if (err) res.status(400).send(err);
    });
});

module.exports = route;
