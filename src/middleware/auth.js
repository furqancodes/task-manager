const jwt = require("jsonwebtoken");
const users = require("../models/users");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const verified = jwt.verify(token, "stringforsigning");
    const user = await users.findOne({
      _id: verified._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication Error" });
  }
};
module.exports = auth;
