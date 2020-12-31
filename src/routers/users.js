const express = require("express");
const users = require("../models/users");
const auth = require("../middleware/auth");
const router = new express.Router();

//----------------login----------------
router.post("/users/login", async (req, res) => {
  try {
    const verifiedUser = await users.loginValidation(
      req.body.email,
      req.body.password
    );
    const token = await verifiedUser.generateToken();
    res.send({ verifiedUser, token });
  } catch (error) {
    res.status(400).send();
  }
});
//-------------users crud---------------
//-------------------------create---------
router.post("/users", async (req, res) => {
  const createUser = new users(req.body);
  try {
    await createUser.save();
    const token = await createUser.generateToken();
    res.status(201).send({ createUser, token });
  } catch (createUserError) {
    res.status(400).send(createUserError);
  }
});
//-------------------------read all---------
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
//--------------------------read one-------
router.get("/users/:userid", async (req, res) => {
  try {
    const readUser = await users.findById({ _id: req.params.userid });
    readUser
      ? res.status(200).send(readUser)
      : res.status(404).send("user not found");
  } catch (readUserError) {
    res.status(500).send(readUserError);
  }
});
//---------------------------update---------
router.patch("/users/:userid", async (req, res) => {
  const userUpdates = Object.keys(req.body);
  const allowedUserUpdates = ["name", "age", "email", "password"];
  const isUpdateValid = userUpdates.every((userUpdate) =>
    allowedUserUpdates.includes(userUpdate)
  );

  if (!isUpdateValid) {
    return res.status(400).send("ERROR ! Invalid Update");
  }
  try {
    const userUpdate = await users.findById(req.params.userid);
    userUpdates.forEach((user) => {
      userUpdate[user] = req.body[user];
    });
    await userUpdate.save();
    userUpdate
      ? res.status(200).send(userUpdate)
      : res.status(404).send("user not found");
  } catch (updateUserError) {
    res.status(400).send(updateUserError);
  }
});
//-------------delete--------------------
router.delete("/users/:userid", async (req, res) => {
  try {
    const deleteUser = await users.findByIdAndDelete(req.params.userid);
    deleteUser ? res.send(deleteUser) : res.status(404).send("notfound");
  } catch (userDeleteError) {
    res.status(500).send(userDeleteError);
  }
});

module.exports = router;
