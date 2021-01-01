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
    res.status(400).send({ error: "USer not found" });
  }
});
//-------------logout--------------------
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ Error: "Error Occured" });
  }
});
router.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send({ Error: "Error Occured" });
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
//-------------------------read PROFILE---------
router.get("/users/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.send({ Error: "some error OCccured" });
  }
});
//---------------------------update---------
router.patch("/users/me", auth, async (req, res) => {
  const userUpdates = Object.keys(req.body);
  const allowedUserUpdates = ["name", "age", "email", "password"];
  const isUpdateValid = userUpdates.every((userUpdate) =>
    allowedUserUpdates.includes(userUpdate)
  );

  if (!isUpdateValid) {
    return res.status(400).send("ERROR ! Invalid Update");
  }
  try {
    userUpdates.forEach((user) => {
      req.user[user] = req.body[user];
    });
    await req.user.save();
    userUpdate
      ? res.status(200).send(req.user)
      : res.status(404).send("user not found");
  } catch (updateUserError) {
    res.status(400).send(updateUserError);
  }
});
//-------------delete--------------------
router.delete("/users/me", auth, async (req, res) => {
  try {
    // const deleteUser = await users.findByIdAndDelete(req.params.userid);
    // deleteUser ? res.send(deleteUser) : res.status(404).send("notfound");
    await req.user.remove();
    res.send(req.user);
  } catch (userDeleteError) {
    res.status(500).send(userDeleteError);
  }
});

module.exports = router;
