const express = require("express");
const users = require("../models/users");
const router = new express.Router();

//-------------users crud---------------
//-------------------------create---------
router.post("/users", async (req, res) => {
  const createUser = new users(req.body);
  try {
    await createUser.save();
    res.status(201).send(createUser);
  } catch (createUserError) {
    res.status(400).send(createUserError);
  }
});
//-------------------------read all---------
router.get("/users", async (req, res) => {
  try {
    const readAllUsers = await users.find({});
    readAllUsers
      ? res.status(200).send(readAllUsers)
      : res.status(404).send("user not found");
  } catch (readAllUserError) {
    res.status(500).send(readAllUserError);
  }
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
    const updateUser = await users.findOneAndUpdate(
      req.params.userid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    updateUser
      ? res.status(200).send(updateUser)
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
